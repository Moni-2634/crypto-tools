"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import InputField from "@/components/tools/InputField";

// ===== Minimal QR Code generator (pure JS, no dependencies) =====
// Supports up to version 10 (57x57), byte mode, error correction level L

const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);
(function initGF() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x = (x << 1) ^ (x & 128 ? 0x11d : 0);
  }
  for (let i = 255; i < 512; i++) GF_EXP[i] = GF_EXP[i - 255];
})();

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return GF_EXP[GF_LOG[a] + GF_LOG[b]];
}

function rsGenPoly(nsym: number): Uint8Array {
  let g = new Uint8Array([1]);
  for (let i = 0; i < nsym; i++) {
    const ng = new Uint8Array(g.length + 1);
    for (let j = 0; j < g.length; j++) {
      ng[j] ^= g[j];
      ng[j + 1] ^= gfMul(g[j], GF_EXP[i]);
    }
    g = ng;
  }
  return g;
}

function rsEncode(data: Uint8Array, nsym: number): Uint8Array {
  const gen = rsGenPoly(nsym);
  const out = new Uint8Array(data.length + nsym);
  out.set(data);
  for (let i = 0; i < data.length; i++) {
    const coef = out[i];
    if (coef !== 0) {
      for (let j = 0; j < gen.length; j++) {
        out[i + j] ^= gfMul(gen[j], coef);
      }
    }
  }
  return out.slice(data.length);
}

// QR version capacities (byte mode, EC level L)
const VERSION_CAPS = [
  0, 17, 32, 53, 78, 106, 134, 154, 192, 230, 271,
];

// Total codewords per version
const TOTAL_CODEWORDS = [
  0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346,
];

// EC codewords per block for level L
const EC_CODEWORDS_PER_BLOCK = [
  0, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18,
];

// Number of EC blocks for level L
const NUM_EC_BLOCKS = [
  0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4,
];

function getVersion(dataLen: number): number {
  for (let v = 1; v <= 10; v++) {
    if (dataLen <= VERSION_CAPS[v]) return v;
  }
  return -1;
}

function getSize(version: number): number {
  return 17 + version * 4;
}

// Alignment pattern positions
const ALIGNMENT_POSITIONS: number[][] = [
  [],      // v0 placeholder
  [],      // v1
  [6, 18], // v2
  [6, 22], // v3
  [6, 26], // v4
  [6, 30], // v5
  [6, 34], // v6
  [6, 22, 38], // v7
  [6, 24, 42], // v8
  [6, 26, 46], // v9
  [6, 28, 50], // v10
];

function createMatrix(size: number): number[][] {
  return Array.from({ length: size }, () => Array(size).fill(-1));
}

function placeFinderPattern(matrix: number[][], row: number, col: number) {
  for (let r = -1; r <= 7; r++) {
    for (let c = -1; c <= 7; c++) {
      const rr = row + r, cc = col + c;
      if (rr < 0 || rr >= matrix.length || cc < 0 || cc >= matrix.length) continue;
      if (
        (r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
        (c >= 0 && c <= 6 && (r === 0 || r === 6)) ||
        (r >= 2 && r <= 4 && c >= 2 && c <= 4)
      ) {
        matrix[rr][cc] = 1;
      } else {
        matrix[rr][cc] = 0;
      }
    }
  }
}

function placeAlignmentPattern(matrix: number[][], row: number, col: number) {
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      if (matrix[row + r][col + c] !== -1) return;
    }
  }
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      if (Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0)) {
        matrix[row + r][col + c] = 1;
      } else {
        matrix[row + r][col + c] = 0;
      }
    }
  }
}

function placeTimingPatterns(matrix: number[][]) {
  const size = matrix.length;
  for (let i = 8; i < size - 8; i++) {
    if (matrix[6][i] === -1) matrix[6][i] = i % 2 === 0 ? 1 : 0;
    if (matrix[i][6] === -1) matrix[i][6] = i % 2 === 0 ? 1 : 0;
  }
}

function reserveFormatAreas(matrix: number[][]) {
  const size = matrix.length;
  // Around top-left finder
  for (let i = 0; i < 9; i++) {
    if (matrix[8][i] === -1) matrix[8][i] = 0;
    if (matrix[i][8] === -1) matrix[i][8] = 0;
  }
  // Around top-right finder
  for (let i = 0; i < 8; i++) {
    if (matrix[8][size - 1 - i] === -1) matrix[8][size - 1 - i] = 0;
  }
  // Around bottom-left finder
  for (let i = 0; i < 7; i++) {
    if (matrix[size - 1 - i][8] === -1) matrix[size - 1 - i][8] = 0;
  }
  // Dark module
  matrix[size - 8][8] = 1;
}

function encodeData(text: string, version: number): Uint8Array {
  const totalCodewords = TOTAL_CODEWORDS[version];
  const ecPerBlock = EC_CODEWORDS_PER_BLOCK[version];
  const numBlocks = NUM_EC_BLOCKS[version];
  const totalEC = ecPerBlock * numBlocks;
  const dataCodewords = totalCodewords - totalEC;

  const bytes = new TextEncoder().encode(text);
  const bits: number[] = [];

  // Mode indicator: byte mode = 0100
  bits.push(0, 1, 0, 0);

  // Character count (8 bits for v1-9, 16 bits for v10+)
  const countBits = version <= 9 ? 8 : 16;
  for (let i = countBits - 1; i >= 0; i--) {
    bits.push((bytes.length >> i) & 1);
  }

  // Data
  for (const b of bytes) {
    for (let i = 7; i >= 0; i--) {
      bits.push((b >> i) & 1);
    }
  }

  // Terminator
  const maxBits = dataCodewords * 8;
  for (let i = 0; i < 4 && bits.length < maxBits; i++) {
    bits.push(0);
  }

  // Pad to byte boundary
  while (bits.length % 8 !== 0) bits.push(0);

  // Pad codewords
  const padBytes = [0xec, 0x11];
  let padIdx = 0;
  while (bits.length < maxBits) {
    for (let i = 7; i >= 0; i--) {
      bits.push((padBytes[padIdx] >> i) & 1);
    }
    padIdx = (padIdx + 1) % 2;
  }

  // Convert to bytes
  const dataBytes = new Uint8Array(dataCodewords);
  for (let i = 0; i < dataCodewords; i++) {
    let val = 0;
    for (let j = 0; j < 8; j++) {
      val = (val << 1) | (bits[i * 8 + j] || 0);
    }
    dataBytes[i] = val;
  }

  // Split into blocks and add EC
  const dataPerBlock = Math.floor(dataCodewords / numBlocks);
  const extraBlocks = dataCodewords - dataPerBlock * numBlocks;
  const blocks: Uint8Array[] = [];
  const ecBlocks: Uint8Array[] = [];
  let offset = 0;

  for (let b = 0; b < numBlocks; b++) {
    const blockLen = dataPerBlock + (b >= numBlocks - extraBlocks ? 1 : 0);
    const block = dataBytes.slice(offset, offset + blockLen);
    offset += blockLen;
    blocks.push(block);
    ecBlocks.push(rsEncode(block, ecPerBlock));
  }

  // Interleave
  const result: number[] = [];
  const maxDataLen = Math.max(...blocks.map((b) => b.length));
  for (let i = 0; i < maxDataLen; i++) {
    for (const block of blocks) {
      if (i < block.length) result.push(block[i]);
    }
  }
  for (let i = 0; i < ecPerBlock; i++) {
    for (const block of ecBlocks) {
      if (i < block.length) result.push(block[i]);
    }
  }

  return new Uint8Array(result);
}

function placeData(matrix: number[][], data: Uint8Array) {
  const size = matrix.length;
  const bits: number[] = [];
  for (const b of data) {
    for (let i = 7; i >= 0; i--) {
      bits.push((b >> i) & 1);
    }
  }

  let bitIdx = 0;
  let upward = true;

  for (let col = size - 1; col >= 1; col -= 2) {
    if (col === 6) col = 5; // Skip timing column
    const rows = upward
      ? Array.from({ length: size }, (_, i) => size - 1 - i)
      : Array.from({ length: size }, (_, i) => i);

    for (const row of rows) {
      for (const c of [col, col - 1]) {
        if (matrix[row][c] === -1) {
          matrix[row][c] = bitIdx < bits.length ? bits[bitIdx++] : 0;
        }
      }
    }
    upward = !upward;
  }
}

// Format info for EC level L (00) with mask patterns 0-7
const FORMAT_STRINGS = [
  0x77c4, 0x72f3, 0x7daa, 0x789d, 0x662f, 0x6318, 0x6c41, 0x6976,
];

function applyMask(matrix: number[][], mask: number): number[][] {
  const size = matrix.length;
  const masked = matrix.map((row) => [...row]);

  const maskFn = (r: number, c: number): boolean => {
    switch (mask) {
      case 0: return (r + c) % 2 === 0;
      case 1: return r % 2 === 0;
      case 2: return c % 3 === 0;
      case 3: return (r + c) % 3 === 0;
      case 4: return (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0;
      case 5: return ((r * c) % 2) + ((r * c) % 3) === 0;
      case 6: return (((r * c) % 2) + ((r * c) % 3)) % 2 === 0;
      case 7: return (((r + c) % 2) + ((r * c) % 3)) % 2 === 0;
      default: return false;
    }
  };

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Only mask data/ec modules (not function patterns)
      if (isDataModule(r, c, size, matrix)) {
        if (maskFn(r, c)) {
          masked[r][c] ^= 1;
        }
      }
    }
  }

  return masked;
}

function isDataModule(r: number, c: number, size: number, _matrix: number[][]): boolean {
  // Finder patterns + separators
  if (r <= 8 && c <= 8) return false;
  if (r <= 8 && c >= size - 8) return false;
  if (r >= size - 8 && c <= 8) return false;
  // Timing patterns
  if (r === 6 || c === 6) return false;
  // Dark module
  if (r === size - 8 && c === 8) return false;
  return true;
}

function placeFormatInfo(matrix: number[][], mask: number) {
  const size = matrix.length;
  const formatBits = FORMAT_STRINGS[mask];

  // Around top-left
  const positions1 = [
    [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [7, 8], [8, 8],
    [8, 7], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0],
  ];
  for (let i = 0; i < 15; i++) {
    const [r, c] = positions1[i];
    matrix[r][c] = (formatBits >> (14 - i)) & 1;
  }

  // Around top-right and bottom-left
  const positions2 = [
    [8, size - 1], [8, size - 2], [8, size - 3], [8, size - 4],
    [8, size - 5], [8, size - 6], [8, size - 7], [8, size - 8],
    [size - 7, 8], [size - 6, 8], [size - 5, 8], [size - 4, 8],
    [size - 3, 8], [size - 2, 8], [size - 1, 8],
  ];
  for (let i = 0; i < 15; i++) {
    const [r, c] = positions2[i];
    matrix[r][c] = (formatBits >> (14 - i)) & 1;
  }
}

function scoreMask(matrix: number[][]): number {
  const size = matrix.length;
  let penalty = 0;

  // Rule 1: consecutive same-color modules in rows and columns
  for (let r = 0; r < size; r++) {
    let count = 1;
    for (let c = 1; c < size; c++) {
      if (matrix[r][c] === matrix[r][c - 1]) {
        count++;
        if (count === 5) penalty += 3;
        else if (count > 5) penalty += 1;
      } else {
        count = 1;
      }
    }
  }
  for (let c = 0; c < size; c++) {
    let count = 1;
    for (let r = 1; r < size; r++) {
      if (matrix[r][c] === matrix[r - 1][c]) {
        count++;
        if (count === 5) penalty += 3;
        else if (count > 5) penalty += 1;
      } else {
        count = 1;
      }
    }
  }

  // Rule 4: proportion of dark modules
  let dark = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (matrix[r][c] === 1) dark++;
    }
  }
  const total = size * size;
  const pct = (dark / total) * 100;
  const prev5 = Math.floor(pct / 5) * 5;
  const next5 = prev5 + 5;
  penalty +=
    Math.min(Math.abs(prev5 - 50) / 5, Math.abs(next5 - 50) / 5) * 10;

  return penalty;
}

function generateQR(text: string): number[][] | null {
  if (!text) return null;

  const version = getVersion(new TextEncoder().encode(text).length);
  if (version === -1) return null;

  const size = getSize(version);
  const matrix = createMatrix(size);

  // Place function patterns
  placeFinderPattern(matrix, 0, 0);
  placeFinderPattern(matrix, 0, size - 7);
  placeFinderPattern(matrix, size - 7, 0);

  // Alignment patterns
  if (version >= 2) {
    const positions = ALIGNMENT_POSITIONS[version];
    for (const r of positions) {
      for (const c of positions) {
        placeAlignmentPattern(matrix, r, c);
      }
    }
  }

  placeTimingPatterns(matrix);
  reserveFormatAreas(matrix);

  // Encode and place data
  const data = encodeData(text, version);
  placeData(matrix, data);

  // Try all masks and pick the best
  let bestMask = 0;
  let bestScore = Infinity;
  let bestMatrix = matrix;

  for (let m = 0; m < 8; m++) {
    const masked = applyMask(matrix, m);
    placeFormatInfo(masked, m);
    const score = scoreMask(masked);
    if (score < bestScore) {
      bestScore = score;
      bestMask = m;
      bestMatrix = masked;
    }
  }

  // Apply best mask to original
  const finalMatrix = applyMask(matrix, bestMask);
  placeFormatInfo(finalMatrix, bestMask);

  return finalMatrix.length > 0 ? finalMatrix : bestMatrix;
}

// ===== Component =====

const EXAMPLES = [
  { label: "URL", input: "https://evmtools.dev", note: "Website URL" },
  { label: "Email", input: "mailto:hello@example.com", note: "Email link" },
  { label: "Text", input: "Hello, World!", note: "Plain text" },
  { label: "Wi-Fi", input: "WIFI:T:WPA;S:MyNetwork;P:MyPassword;;", note: "Wi-Fi config" },
];

export default function QrCodeGeneratorTool() {
  const [input, setInput] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  const [moduleSize, setModuleSize] = useState(8);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState("");

  const drawQR = useCallback(() => {
    if (!input.trim()) {
      setError("");
      return;
    }

    const qrMatrix = generateQR(input);
    if (!qrMatrix) {
      setError("Input is too long. Maximum ~271 characters supported.");
      return;
    }

    setError("");
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = qrMatrix.length;
    const quietZone = 4;
    const totalSize = (size + quietZone * 2) * moduleSize;
    canvas.width = totalSize;
    canvas.height = totalSize;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, totalSize, totalSize);

    // Modules
    ctx.fillStyle = fgColor;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (qrMatrix[r][c] === 1) {
          ctx.fillRect(
            (c + quietZone) * moduleSize,
            (r + quietZone) * moduleSize,
            moduleSize,
            moduleSize
          );
        }
      }
    }
  }, [input, bgColor, fgColor, moduleSize]);

  useEffect(() => {
    drawQR();
  }, [drawQR]);

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  const handleCopyImage = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
      }
    } catch {
      // Clipboard API not available
    }
  }, []);

  return (
    <div className="space-y-6">
      <InputField
        label="Text or URL"
        value={input}
        onChange={setInput}
        placeholder="Enter text, URL, email, or Wi-Fi config..."
        multiline
        rows={3}
      />

      {/* Options */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">Module Size:</label>
          <select
            value={moduleSize}
            onChange={(e) => setModuleSize(Number(e.target.value))}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            {[4, 6, 8, 10, 12].map((s) => (
              <option key={s} value={s}>{s}px</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">Foreground:</label>
          <input
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
            className="h-8 w-8 cursor-pointer rounded border border-gray-300 dark:border-gray-700"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">Background:</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="h-8 w-8 cursor-pointer rounded border border-gray-300 dark:border-gray-700"
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleDownload}
          disabled={!input.trim() || !!error}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download PNG
        </button>
        <button
          onClick={handleCopyImage}
          disabled={!input.trim() || !!error}
          className="rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Copy Image
        </button>
      </div>

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {/* QR Code canvas */}
      {input.trim() && !error && (
        <div className="flex justify-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
          <canvas ref={canvasRef} className="max-w-full" />
        </div>
      )}

      {/* Examples */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Examples
        </h3>
        <div className="space-y-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              onClick={() => setInput(ex.input)}
              className="flex w-full items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2.5 text-left transition-colors hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800/50"
            >
              <code className="text-sm text-gray-700 dark:text-gray-300">
                {ex.label}
              </code>
              <span className="text-xs text-gray-500">{ex.note}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About QR Code Generator
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            QR (Quick Response) codes are two-dimensional barcodes that can store URLs, text,
            email addresses, Wi-Fi credentials, and more. They are widely used for sharing links,
            payments, and authentication.
          </p>
          <p>
            This tool generates QR codes entirely in your browser using a pure JavaScript
            implementation. No data is sent to any server. You can customize colors and
            download the result as a PNG image.
          </p>
        </div>
      </div>
    </div>
  );
}
