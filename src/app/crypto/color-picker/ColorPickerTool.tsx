"use client";

import { useState, useMemo, useCallback } from "react";
import CopyButton from "@/components/tools/CopyButton";

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

function hexToRgb(hex: string): RGB | null {
  const clean = hex.replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(hsl: HSL): RGB {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  if (s === 0) {
    const v = Math.round(l * 255);
    return { r: v, g: v, b: v };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  };
}

function getLuminance(rgb: RGB): number {
  const a = [rgb.r, rgb.g, rgb.b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function getContrastRatio(rgb1: RGB, rgb2: RGB): number {
  const l1 = getLuminance(rgb1);
  const l2 = getLuminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function generateShades(hex: string, count: number): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [];
  const hsl = rgbToHsl(rgb);
  const shades: string[] = [];
  for (let i = 0; i < count; i++) {
    const l = Math.round((100 / (count + 1)) * (count - i));
    shades.push(rgbToHex(hslToRgb({ ...hsl, l })));
  }
  return shades;
}

const PRESET_COLORS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4",
  "#000000", "#6b7280", "#ffffff", "#1e293b",
];

export default function ColorPickerTool() {
  const [hex, setHex] = useState("#3b82f6");
  const [hexInput, setHexInput] = useState("#3b82f6");

  const rgb = useMemo(() => hexToRgb(hex), [hex]);
  const hsl = useMemo(() => (rgb ? rgbToHsl(rgb) : null), [rgb]);
  const shades = useMemo(() => generateShades(hex, 9), [hex]);

  const contrastWhite = useMemo(
    () => (rgb ? getContrastRatio(rgb, { r: 255, g: 255, b: 255 }) : 0),
    [rgb]
  );
  const contrastBlack = useMemo(
    () => (rgb ? getContrastRatio(rgb, { r: 0, g: 0, b: 0 }) : 0),
    [rgb]
  );

  const hexString = hex.toUpperCase();
  const rgbString = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "";
  const hslString = hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "";

  const updateFromHex = useCallback((value: string) => {
    setHexInput(value);
    const clean = value.startsWith("#") ? value : `#${value}`;
    if (/^#[0-9a-fA-F]{6}$/.test(clean)) {
      setHex(clean.toLowerCase());
    }
  }, []);

  const updateFromRgb = useCallback(
    (component: "r" | "g" | "b", value: number) => {
      if (!rgb) return;
      const newRgb = { ...rgb, [component]: Math.max(0, Math.min(255, value)) };
      const newHex = rgbToHex(newRgb);
      setHex(newHex);
      setHexInput(newHex);
    },
    [rgb]
  );

  const updateFromHsl = useCallback(
    (component: "h" | "s" | "l", value: number) => {
      if (!hsl) return;
      const maxVal = component === "h" ? 360 : 100;
      const newHsl = {
        ...hsl,
        [component]: Math.max(0, Math.min(maxVal, value)),
      };
      const newRgb = hslToRgb(newHsl);
      const newHex = rgbToHex(newRgb);
      setHex(newHex);
      setHexInput(newHex);
    },
    [hsl]
  );

  const handleColorPicker = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHex(value);
    setHexInput(value);
  }, []);

  return (
    <div className="space-y-6">
      {/* Color preview and picker */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-4">
          <div
            className="h-48 rounded-lg border border-gray-200 dark:border-gray-700 relative overflow-hidden"
            style={{ backgroundColor: hex }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-lg font-mono font-bold px-3 py-1 rounded"
                style={{
                  color: contrastWhite > contrastBlack ? "#ffffff" : "#000000",
                }}
              >
                {hexString}
              </span>
            </div>
            <input
              type="color"
              value={hex}
              onChange={handleColorPicker}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title="Click to open color picker"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Click the preview to open the native color picker
          </p>
        </div>

        {/* Color values */}
        <div className="space-y-3">
          {/* HEX */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                HEX
              </label>
              <CopyButton text={hexString} />
            </div>
            <input
              type="text"
              value={hexInput}
              onChange={(e) => updateFromHex(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-mono text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="#3b82f6"
            />
          </div>

          {/* RGB */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                RGB
              </label>
              <CopyButton text={rgbString} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {rgb &&
                (["r", "g", "b"] as const).map((c) => (
                  <div key={c} className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 uppercase">
                      {c}
                    </span>
                    <input
                      type="number"
                      min={0}
                      max={255}
                      value={rgb[c]}
                      onChange={(e) =>
                        updateFromRgb(c, parseInt(e.target.value) || 0)
                      }
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 pl-8 pr-2 py-2.5 text-sm font-mono text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* HSL */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                HSL
              </label>
              <CopyButton text={hslString} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {hsl &&
                (["h", "s", "l"] as const).map((c) => (
                  <div key={c} className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 uppercase">
                      {c}
                    </span>
                    <input
                      type="number"
                      min={0}
                      max={c === "h" ? 360 : 100}
                      value={hsl[c]}
                      onChange={(e) =>
                        updateFromHsl(c, parseInt(e.target.value) || 0)
                      }
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 pl-8 pr-2 py-2.5 text-sm font-mono text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contrast ratios */}
      {rgb && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Contrast Ratios (WCAG)
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg p-4 text-center" style={{ backgroundColor: hex }}>
              <p
                className="text-sm font-medium"
                style={{ color: "#ffffff" }}
              >
                White Text
              </p>
              <p
                className="text-lg font-bold font-mono"
                style={{ color: "#ffffff" }}
              >
                {contrastWhite.toFixed(2)}:1
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "#ffffff" }}
              >
                {contrastWhite >= 7
                  ? "AAA Pass"
                  : contrastWhite >= 4.5
                  ? "AA Pass"
                  : contrastWhite >= 3
                  ? "AA Large Only"
                  : "Fail"}
              </p>
            </div>
            <div className="rounded-lg p-4 text-center" style={{ backgroundColor: hex }}>
              <p
                className="text-sm font-medium"
                style={{ color: "#000000" }}
              >
                Black Text
              </p>
              <p
                className="text-lg font-bold font-mono"
                style={{ color: "#000000" }}
              >
                {contrastBlack.toFixed(2)}:1
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "#000000" }}
              >
                {contrastBlack >= 7
                  ? "AAA Pass"
                  : contrastBlack >= 4.5
                  ? "AA Pass"
                  : contrastBlack >= 3
                  ? "AA Large Only"
                  : "Fail"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Shades */}
      {shades.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Shades
          </h3>
          <div className="grid grid-cols-9 gap-1">
            {shades.map((shade, i) => (
              <button
                key={i}
                onClick={() => {
                  setHex(shade);
                  setHexInput(shade);
                }}
                className="group relative"
                title={shade.toUpperCase()}
              >
                <div
                  className="h-12 rounded border border-gray-200 dark:border-gray-700 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: shade }}
                />
                <span className="block mt-1 text-center text-[10px] font-mono text-gray-500 dark:text-gray-400">
                  {shade.toUpperCase().slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Preset colors */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Preset Colors
        </h3>
        <div className="grid grid-cols-6 gap-2 sm:grid-cols-12">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => {
                setHex(color);
                setHexInput(color);
              }}
              className="h-10 rounded-lg border border-gray-200 dark:border-gray-700 transition-transform hover:scale-110"
              style={{ backgroundColor: color }}
              title={color.toUpperCase()}
            />
          ))}
        </div>
      </div>

      {/* CSS output */}
      {rgb && hsl && (
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            CSS Values
          </h3>
          <div className="space-y-2">
            {[
              { label: "HEX", value: hexString },
              { label: "RGB", value: rgbString },
              { label: "HSL", value: hslString },
              {
                label: "CSS Variable",
                value: `--color-primary: ${hexString};`,
              },
              {
                label: "Tailwind (arbitrary)",
                value: `bg-[${hexString}] text-[${hexString}]`,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded border border-gray-200 dark:border-gray-700 px-4 py-2"
              >
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {item.label}
                  </span>
                  <p className="font-mono text-sm text-gray-700 dark:text-gray-300">
                    {item.value}
                  </p>
                </div>
                <CopyButton text={item.value} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About Color Picker
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            This color picker lets you convert between HEX, RGB, and HSL color formats.
            It calculates WCAG contrast ratios against black and white backgrounds,
            generates shade variations, and provides ready-to-use CSS values.
          </p>
          <p>
            All processing happens locally in your browser. No data is sent to any server.
          </p>
        </div>
      </div>
    </div>
  );
}
