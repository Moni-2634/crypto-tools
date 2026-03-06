"use client";

import { useState, useMemo } from "react";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

function base64UrlDecode(str: string): string {
  // Replace base64url chars with standard base64
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  // Pad with = to make length a multiple of 4
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  try {
    return decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch {
    return atob(base64);
  }
}

function formatTimestamp(ts: number): string {
  try {
    const date = new Date(ts * 1000);
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const absDiff = Math.abs(diff);
    const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));

    let relative = "";
    if (days > 0) relative = `${days}d ${hours}h`;
    else if (hours > 0) relative = `${hours}h ${minutes}m`;
    else relative = `${minutes}m`;

    if (diff < 0) relative = `${relative} ago`;
    else relative = `in ${relative}`;

    return `${date.toISOString()} (${relative})`;
  } catch {
    return "Invalid timestamp";
  }
}

const CLAIM_LABELS: Record<string, string> = {
  iss: "Issuer",
  sub: "Subject",
  aud: "Audience",
  exp: "Expiration Time",
  nbf: "Not Before",
  iat: "Issued At",
  jti: "JWT ID",
};

const EXAMPLES = [
  {
    label: "Standard JWT (HS256)",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    note: "Basic token with name claim",
  },
  {
    label: "JWT with admin role",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIFVzZXIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTE2MjM5MDIyfQ.leaXSMhTLjGBaSBn8vN6V-w0WWFuV1PSnBqloHMdP-k",
    note: "Token with admin: true",
  },
  {
    label: "JWT with RS256 algorithm",
    token:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbmUgRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A29DNSl0EiXLdwJ6xC6AfgZWF1bOsS_TuYI3OG85AmiExREkrS6tDfTQ2B3WXlrr-wp5AokiRbz3_oB4OxG-W9KcEEbDRcZc0nH3L7LzYptiy1PtAylQGxHTWZXtGz4ht0bAecBgmpdgXMguEIcoqPJ1n3pIWk_dUZegpqx0Lka21H6XxUTxiy8OcaarA8zdnPUnV6AmNP3ecFawIFYdvJB_cm-GvpCSbr8G8y_Mllj8f4x9nBH8pQux89_6gUY618iYv7tuPWBFfEbLxtF2pZS6YC1aSfLQxaOoaBSTQ",
    note: "RSA signed token",
  },
];

export default function JwtDecoderTool() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const decoded = useMemo(() => {
    setError("");
    if (!input.trim()) return null;

    const token = input.trim();
    const parts = token.split(".");

    if (parts.length !== 3) {
      setError(
        `Invalid JWT structure: expected 3 parts separated by dots, got ${parts.length}.`
      );
      return null;
    }

    // Validate that each part is valid base64url
    const base64urlRegex = /^[A-Za-z0-9_-]*$/;
    for (let i = 0; i < 3; i++) {
      if (!base64urlRegex.test(parts[i])) {
        const partNames = ["Header", "Payload", "Signature"];
        setError(
          `Invalid base64url encoding in ${partNames[i]}. Contains illegal characters.`
        );
        return null;
      }
    }

    try {
      const headerJson = base64UrlDecode(parts[0]);
      const payloadJson = base64UrlDecode(parts[1]);

      let header: Record<string, unknown>;
      let payload: Record<string, unknown>;

      try {
        header = JSON.parse(headerJson);
      } catch {
        setError("Failed to parse JWT header as JSON.");
        return null;
      }

      try {
        payload = JSON.parse(payloadJson);
      } catch {
        setError("Failed to parse JWT payload as JSON.");
        return null;
      }

      // Check expiration
      let isExpired: boolean | null = null;
      if (typeof payload.exp === "number") {
        isExpired = payload.exp * 1000 < Date.now();
      }

      return {
        header,
        payload,
        signature: parts[2],
        headerJson: JSON.stringify(header, null, 2),
        payloadJson: JSON.stringify(payload, null, 2),
        isExpired,
      };
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Failed to decode JWT token."
      );
      return null;
    }
  }, [input]);

  return (
    <div className="space-y-6">
      <InputField
        label="JWT Token"
        value={input}
        onChange={setInput}
        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0..."
        multiline
        rows={4}
      />

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {decoded && (
        <>
          <OutputField label="Header" value={decoded.headerJson} rows={4} />
          <OutputField label="Payload" value={decoded.payloadJson} rows={8} />
          <OutputField label="Signature (base64url)" value={decoded.signature} rows={2} />

          {/* Claims summary */}
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Claims Summary
            </h3>
            <div className="space-y-2">
              {/* Algorithm */}
              {decoded.header.alg != null && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Algorithm</span>
                  <code className="font-mono text-blue-600 dark:text-blue-400">
                    {String(decoded.header.alg)}
                  </code>
                </div>
              )}

              {/* Type */}
              {decoded.header.typ != null && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Type</span>
                  <code className="font-mono text-blue-600 dark:text-blue-400">
                    {String(decoded.header.typ)}
                  </code>
                </div>
              )}

              {/* Standard claims */}
              {Object.entries(CLAIM_LABELS).map(([key, label]) => {
                const value = decoded.payload[key];
                if (value === undefined) return null;

                const isTimestamp = ["exp", "nbf", "iat"].includes(key);

                return (
                  <div key={key} className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      {label} ({key})
                    </span>
                    <code className="font-mono text-blue-600 dark:text-blue-400 text-right max-w-[60%] truncate">
                      {isTimestamp && typeof value === "number"
                        ? formatTimestamp(value)
                        : String(value)}
                    </code>
                  </div>
                );
              })}

              {/* Expiration status */}
              {decoded.isExpired !== null && (
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      decoded.isExpired
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    }`}
                  >
                    {decoded.isExpired ? "Expired" : "Valid (not expired)"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Examples */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Example JWTs
        </h3>
        <div className="space-y-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              onClick={() => setInput(ex.token)}
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

      {/* Info section */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About JWT Tokens
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            A JSON Web Token (JWT) is a compact, URL-safe token format used for securely
            transmitting information between parties. JWTs consist of three Base64url-encoded
            parts separated by dots: <strong>Header</strong>, <strong>Payload</strong>, and{" "}
            <strong>Signature</strong>.
          </p>
          <p>
            The <strong>header</strong> contains the signing algorithm (e.g., HS256, RS256)
            and token type. The <strong>payload</strong> contains claims -- statements about
            the user and metadata like expiration time (<code>exp</code>), issuer (
            <code>iss</code>), and subject (<code>sub</code>).
          </p>
          <p>
            This tool decodes the token client-side and does not verify the signature, as
            that requires the secret key or public key. Always verify signatures server-side
            before trusting token claims.
          </p>
        </div>
      </div>
    </div>
  );
}
