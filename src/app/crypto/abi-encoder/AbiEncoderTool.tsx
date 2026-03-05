"use client";

import { useState } from "react";
import { AbiCoder, Interface, ParamType } from "ethers";
import InputField from "@/components/tools/InputField";
import OutputField from "@/components/tools/OutputField";

type Tab = "encode" | "decode";

export default function AbiEncoderTool() {
  const [tab, setTab] = useState<Tab>("encode");

  return (
    <div className="space-y-6">
      <div className="flex gap-1 rounded-lg bg-gray-800 p-1">
        <button
          onClick={() => setTab("encode")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "encode"
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => setTab("decode")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "decode"
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Decode
        </button>
      </div>

      {tab === "encode" ? <EncodePanel /> : <DecodePanel />}
    </div>
  );
}

function EncodePanel() {
  const [signature, setSignature] = useState("");
  const [params, setParams] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleEncode = () => {
    setError("");
    setOutput("");

    try {
      const sig = signature.trim();
      if (!sig) {
        setError("Please enter a function signature.");
        return;
      }

      // Parse the function signature to extract parameter types
      const iface = new Interface([`function ${sig}`]);
      const func = iface.getFunction(sig.split("(")[0]);
      if (!func) {
        setError("Could not parse function signature.");
        return;
      }

      // Parse parameter values
      const paramValues = parseParamValues(params.trim(), func.inputs);

      // Encode the full calldata (selector + encoded params)
      const calldata = iface.encodeFunctionData(func, paramValues);
      setOutput(calldata);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Encoding failed.");
    }
  };

  return (
    <div className="space-y-4">
      <InputField
        label="Function Signature"
        value={signature}
        onChange={setSignature}
        placeholder='e.g. transfer(address,uint256)'
      />
      <InputField
        label="Parameters (one per line, or comma-separated)"
        value={params}
        onChange={setParams}
        placeholder={`e.g.\n0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045\n1000000000000000000`}
        multiline
        rows={4}
      />
      <button
        onClick={handleEncode}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Encode
      </button>
      {error && (
        <p className="rounded-lg border border-red-800 bg-red-900/30 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}
      <OutputField label="Encoded Calldata" value={output} rows={4} />
    </div>
  );
}

function DecodePanel() {
  const [calldata, setCalldata] = useState("");
  const [abi, setAbi] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleDecode = () => {
    setError("");
    setOutput("");

    try {
      const data = calldata.trim();
      const abiText = abi.trim();

      if (!data) {
        setError("Please enter calldata to decode.");
        return;
      }
      if (!abiText) {
        setError("Please enter the ABI (function signature or JSON ABI).");
        return;
      }

      let iface: Interface;

      // Try parsing as JSON ABI first, then as human-readable signature
      try {
        const parsed = JSON.parse(abiText);
        iface = new Interface(Array.isArray(parsed) ? parsed : [parsed]);
      } catch {
        // Treat as human-readable signature
        const sig = abiText.startsWith("function ")
          ? abiText
          : `function ${abiText}`;
        iface = new Interface([sig]);
      }

      const decoded = iface.parseTransaction({ data });
      if (!decoded) {
        setError("Could not decode calldata with the provided ABI.");
        return;
      }

      const lines: string[] = [];
      lines.push(`Function: ${decoded.name}`);
      lines.push(`Selector: ${decoded.selector}`);
      lines.push("");
      lines.push("Parameters:");
      decoded.fragment.inputs.forEach((input, i) => {
        const value = decoded.args[i];
        const name = input.name || `param${i}`;
        lines.push(`  [${i}] ${input.type} ${name} = ${formatValue(value)}`);
      });

      setOutput(lines.join("\n"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Decoding failed.");
    }
  };

  return (
    <div className="space-y-4">
      <InputField
        label="Calldata (hex)"
        value={calldata}
        onChange={setCalldata}
        placeholder="0xa9059cbb000000000000000000000000..."
        multiline
        rows={3}
      />
      <InputField
        label="ABI (function signature or JSON)"
        value={abi}
        onChange={setAbi}
        placeholder='e.g. transfer(address,uint256) or [{"type":"function",...}]'
        multiline
        rows={3}
      />
      <button
        onClick={handleDecode}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Decode
      </button>
      {error && (
        <p className="rounded-lg border border-red-800 bg-red-900/30 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}
      <OutputField label="Decoded Result" value={output} rows={8} />
    </div>
  );
}

function parseParamValues(
  raw: string,
  inputs: readonly ParamType[]
): unknown[] {
  if (!raw) return [];

  // Split by newlines first, then fall back to comma-separated
  let parts: string[];
  if (raw.includes("\n")) {
    parts = raw
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  } else {
    parts = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  if (parts.length !== inputs.length) {
    throw new Error(
      `Expected ${inputs.length} parameter(s), got ${parts.length}.`
    );
  }

  return parts.map((val, i) => {
    const type = inputs[i].type;

    // Handle tuple/array types - try JSON parse
    if (type.includes("tuple") || type.includes("[")) {
      try {
        return JSON.parse(val);
      } catch {
        return val;
      }
    }

    // Handle bool (case-insensitive)
    if (type === "bool") {
      const lower = val.toLowerCase();
      return lower === "true" || lower === "1";
    }

    return val;
  });
}

function formatValue(value: unknown): string {
  if (typeof value === "bigint") {
    return value.toString();
  }
  if (Array.isArray(value)) {
    return `[${value.map(formatValue).join(", ")}]`;
  }
  return String(value);
}
