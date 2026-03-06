"use client";

import { useState, useMemo } from "react";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

/* ------------------------------------------------------------------ */
/*  Pure JavaScript MD5 implementation (RFC 1321)                     */
/* ------------------------------------------------------------------ */

function md5(input: string): string {
  // Convert string to UTF-8 byte array
  const encoder = new TextEncoder();
  const message = encoder.encode(input);

  // Helper functions
  function add(a: number, b: number): number {
    return (a + b) | 0;
  }

  function F(x: number, y: number, z: number) {
    return (x & y) | (~x & z);
  }
  function G(x: number, y: number, z: number) {
    return (x & z) | (y & ~z);
  }
  function H(x: number, y: number, z: number) {
    return x ^ y ^ z;
  }
  function I(x: number, y: number, z: number) {
    return y ^ (x | ~z);
  }

  function rotateLeft(x: number, n: number) {
    return (x << n) | (x >>> (32 - n));
  }

  // Pre-computed T table (floor(2^32 * abs(sin(i+1))))
  const T = new Uint32Array(64);
  for (let i = 0; i < 64; i++) {
    T[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 0x100000000) >>> 0;
  }

  // Shift amounts per round
  const S = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14,
    20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16,
    23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10,
    15, 21, 6, 10, 15, 21,
  ];

  // Padding: append bit '1', then zeros, then 64-bit length (little-endian)
  // Total padded length must be a multiple of 64 bytes
  const bitLen = message.length * 8;
  // After appending 0x80, we need room for at least 8 bytes of length
  // Total must be multiple of 64
  const totalWithout8 = message.length + 1; // message + 0x80 byte
  const remainder = totalWithout8 % 64;
  const paddingZeros = remainder <= 56 ? 56 - remainder : 120 - remainder;
  const totalLen = totalWithout8 + paddingZeros + 8;
  const padded = new Uint8Array(totalLen);
  padded.set(message);
  padded[message.length] = 0x80;
  // Zeros are already filled by Uint8Array default

  // Append original length in bits as 64-bit little-endian
  const lenView = new DataView(padded.buffer, padded.length - 8, 8);
  lenView.setUint32(0, bitLen >>> 0, true);
  lenView.setUint32(4, Math.floor(bitLen / 0x100000000), true);

  // Initialize hash state
  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  // Process each 64-byte (512-bit) block
  const view = new DataView(padded.buffer);
  for (let offset = 0; offset < padded.length; offset += 64) {
    // Read 16 32-bit words (little-endian)
    const M = new Uint32Array(16);
    for (let j = 0; j < 16; j++) {
      M[j] = view.getUint32(offset + j * 4, true);
    }

    let a = a0;
    let b = b0;
    let c = c0;
    let d = d0;

    for (let i = 0; i < 64; i++) {
      let f: number;
      let g: number;

      if (i < 16) {
        f = F(b, c, d);
        g = i;
      } else if (i < 32) {
        f = G(b, c, d);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        f = H(b, c, d);
        g = (3 * i + 5) % 16;
      } else {
        f = I(b, c, d);
        g = (7 * i) % 16;
      }

      const temp = d;
      d = c;
      c = b;
      b = add(b, rotateLeft(add(add(a, f), add(T[i], M[g])), S[i]));
      a = temp;
    }

    a0 = add(a0, a);
    b0 = add(b0, b);
    c0 = add(c0, c);
    d0 = add(d0, d);
  }

  // Convert to hex string (little-endian)
  function toHex(n: number): string {
    const bytes = new Uint8Array(4);
    bytes[0] = n & 0xff;
    bytes[1] = (n >>> 8) & 0xff;
    bytes[2] = (n >>> 16) & 0xff;
    bytes[3] = (n >>> 24) & 0xff;
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  return toHex(a0) + toHex(b0) + toHex(c0) + toHex(d0);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const EXAMPLES = [
  {
    label: "Empty string",
    input: "",
    note: "d41d8cd98f00b204e9800998ecf8427e",
  },
  {
    label: "hello",
    input: "hello",
    note: "5d41402abc4b2a76b9719d911017c592",
  },
  {
    label: "Hello, World!",
    input: "Hello, World!",
    note: "65a8e27d8879283831b664bd8b7f0ad4",
  },
  {
    label: "The quick brown fox jumps over the lazy dog",
    input: "The quick brown fox jumps over the lazy dog",
    note: "9e107d9d372bb6826bd81d3542a419d6",
  },
  {
    label: "md5",
    input: "md5",
    note: "1bc29b36f623ba82aaf6724fd3b16718",
  },
];

export default function Md5HashTool() {
  const [input, setInput] = useState("");

  const hash = useMemo(() => {
    return md5(input);
  }, [input]);

  const loadExample = (ex: (typeof EXAMPLES)[number]) => {
    setInput(ex.input);
  };

  return (
    <div className="space-y-6">
      {/* Security warning */}
      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 px-4 py-3">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 text-amber-600 dark:text-amber-400 text-sm font-bold">
            Warning:
          </span>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            MD5 is <strong>not cryptographically secure</strong>. It is
            vulnerable to collision attacks and should not be used for password
            hashing, digital signatures, or security-critical applications. Use
            SHA-256 or Keccak-256 instead. MD5 is still useful for checksums,
            data fingerprinting, and legacy system compatibility.
          </p>
        </div>
      </div>

      <InputField
        label="Text Input"
        value={input}
        onChange={setInput}
        placeholder="Enter text to generate MD5 hash..."
        multiline
        rows={4}
      />

      <OutputField label="MD5 Hash (hex)" value={hash} rows={2} />

      {/* Hash details */}
      {hash && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2">
            <span className="block text-xs text-gray-500">Hash Length</span>
            <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
              128 bits
            </span>
          </div>
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2">
            <span className="block text-xs text-gray-500">Hex Characters</span>
            <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
              32
            </span>
          </div>
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2">
            <span className="block text-xs text-gray-500">Input Length</span>
            <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
              {new TextEncoder().encode(input).length} bytes
            </span>
          </div>
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2">
            <span className="block text-xs text-gray-500">Input Chars</span>
            <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
              {input.length}
            </span>
          </div>
        </div>
      )}

      {/* Examples */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Test Vectors
        </h3>
        <div className="space-y-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              onClick={() => loadExample(ex)}
              className="flex w-full items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2.5 text-left transition-colors hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800/50"
            >
              <code className="text-sm text-gray-700 dark:text-gray-300">
                {ex.label}
              </code>
              <span className="hidden sm:inline text-xs font-mono text-gray-500">
                {ex.note}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Info section */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About MD5
        </h3>
        <ul className="space-y-1 text-sm text-gray-500">
          <li>
            MD5 (Message-Digest Algorithm 5) produces a 128-bit (16-byte) hash
            value, displayed as a 32-character hex string
          </li>
          <li>
            Designed by Ronald Rivest in 1991 as defined in RFC 1321
          </li>
          <li>
            Collision attacks were demonstrated in 2004 by Xiaoyun Wang, making
            MD5 unsuitable for cryptographic security
          </li>
          <li>
            Still widely used for file integrity checksums (e.g., verifying
            downloads), cache keys, and non-security hash operations
          </li>
          <li>
            This tool runs entirely in your browser. No data is sent to any
            server
          </li>
        </ul>
      </div>
    </div>
  );
}
