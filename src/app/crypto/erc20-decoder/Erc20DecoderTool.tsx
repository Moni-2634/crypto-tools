"use client";

import { useState } from "react";
import { Interface } from "ethers";
import InputField from "@/components/tools/InputField";

type Tab = "function" | "event";

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
];

const FUNCTION_EXAMPLES = [
  {
    label: "transfer(address,uint256)",
    calldata:
      "0xa9059cbb000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa960450000000000000000000000000000000000000000000000000de0b6b3a7640000",
  },
  {
    label: "approve(address,uint256)",
    calldata:
      "0x095ea7b3000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa9604500000000000000000000000000000000000000000000000000000000000f4240",
  },
  {
    label: "transferFrom(address,address,uint256)",
    calldata:
      "0x23b872dd000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa960450000000000000000000000001234567890abcdef1234567890abcdef123456780000000000000000000000000000000000000000000000000de0b6b3a7640000",
  },
  {
    label: "balanceOf(address)",
    calldata:
      "0x70a08231000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045",
  },
];

const EVENT_EXAMPLES = [
  {
    label: "Transfer event",
    topics: [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
      "0x000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045",
      "0x0000000000000000000000001234567890abcdef1234567890abcdef12345678",
    ].join("\n"),
    data: "0x0000000000000000000000000000000000000000000000000de0b6b3a7640000",
  },
  {
    label: "Approval event",
    topics: [
      "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
      "0x000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045",
      "0x0000000000000000000000001234567890abcdef1234567890abcdef12345678",
    ].join("\n"),
    data: "0x00000000000000000000000000000000000000000000000000000000000f4240",
  },
];

interface DecodedParam {
  index: number;
  name: string;
  type: string;
  value: string;
  indexed?: boolean;
}

export default function Erc20DecoderTool() {
  const [tab, setTab] = useState<Tab>("function");

  return (
    <div className="space-y-6">
      <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
        <button
          onClick={() => setTab("function")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "function"
              ? "bg-blue-600 text-white"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          Decode Function
        </button>
        <button
          onClick={() => setTab("event")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "event"
              ? "bg-blue-600 text-white"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          Decode Event
        </button>
      </div>

      {tab === "function" ? <FunctionPanel /> : <EventPanel />}
    </div>
  );
}

function FunctionPanel() {
  const [calldata, setCalldata] = useState("");
  const [functionName, setFunctionName] = useState("");
  const [selector, setSelector] = useState("");
  const [params, setParams] = useState<DecodedParam[]>([]);
  const [error, setError] = useState("");

  const handleDecode = () => {
    setError("");
    setFunctionName("");
    setSelector("");
    setParams([]);

    try {
      const data = calldata.trim();
      if (!data) {
        setError("Please enter calldata to decode.");
        return;
      }

      const hex = data.startsWith("0x") ? data : `0x${data}`;

      if (!/^0x[0-9a-fA-F]*$/.test(hex)) {
        setError("Invalid hex string. Only characters 0-9, a-f are allowed.");
        return;
      }

      if (hex.length < 10) {
        setError(
          "Calldata must be at least 4 bytes (8 hex chars) to contain a function selector."
        );
        return;
      }

      const iface = new Interface(ERC20_ABI);
      const decoded = iface.parseTransaction({ data: hex });

      if (!decoded) {
        const fnSelector = hex.slice(0, 10);
        setSelector(fnSelector);
        setError(
          `Function selector ${fnSelector} does not match any known ERC-20 function.`
        );
        return;
      }

      setFunctionName(decoded.name);
      setSelector(decoded.selector);

      const decodedParams: DecodedParam[] = decoded.fragment.inputs.map(
        (input, i) => ({
          index: i,
          name: input.name || `param${i}`,
          type: input.type,
          value: formatValue(decoded.args[i]),
        })
      );
      setParams(decodedParams);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Decoding failed.");
    }
  };

  const loadExample = (ex: (typeof FUNCTION_EXAMPLES)[number]) => {
    setCalldata(ex.calldata);
    setError("");
    setFunctionName("");
    setSelector("");
    setParams([]);
  };

  return (
    <div className="space-y-4">
      <InputField
        label="ERC-20 Calldata (hex)"
        value={calldata}
        onChange={setCalldata}
        placeholder="0xa9059cbb000000000000000000000000..."
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
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {(functionName || selector) && !error && (
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Function:
                </span>
                <code className="text-sm font-medium text-gray-900 dark:text-white">
                  {functionName}
                </code>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Selector:
                </span>
                <code className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {selector}
                </code>
              </div>
            </div>
          </div>

          {params.length > 0 && (
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                    <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">
                      #
                    </th>
                    <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">
                      Name
                    </th>
                    <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">
                      Type
                    </th>
                    <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {params.map((p) => (
                    <tr
                      key={p.index}
                      className="border-b border-gray-200 dark:border-gray-800 last:border-b-0"
                    >
                      <td className="px-4 py-2.5 text-gray-500 dark:text-gray-500">
                        {p.index}
                      </td>
                      <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-white">
                        {p.name}
                      </td>
                      <td className="px-4 py-2.5 text-blue-600 dark:text-blue-400">
                        {p.type}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-gray-700 dark:text-gray-300 break-all">
                        {p.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          ERC-20 Function Examples
        </h3>
        <div className="space-y-2">
          {FUNCTION_EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              onClick={() => loadExample(ex)}
              className="flex w-full items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2.5 text-left transition-colors hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800/50"
            >
              <code className="text-sm text-gray-700 dark:text-gray-300">
                {ex.label}
              </code>
              <span className="text-xs text-gray-500">Click to load</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function EventPanel() {
  const [topics, setTopics] = useState("");
  const [data, setData] = useState("");
  const [eventName, setEventName] = useState("");
  const [params, setParams] = useState<DecodedParam[]>([]);
  const [error, setError] = useState("");

  const handleDecode = () => {
    setError("");
    setEventName("");
    setParams([]);

    try {
      const topicsRaw = topics.trim();
      const dataRaw = data.trim();

      if (!topicsRaw) {
        setError("Please enter at least one event topic.");
        return;
      }

      // Parse topics: one per line or comma-separated
      const topicList = topicsRaw
        .split(/[\n,]/)
        .map((t) => t.trim())
        .filter(Boolean);

      if (topicList.length === 0) {
        setError("Please enter at least one event topic.");
        return;
      }

      // Validate topics
      for (const topic of topicList) {
        const t = topic.startsWith("0x") ? topic : `0x${topic}`;
        if (!/^0x[0-9a-fA-F]{64}$/.test(t)) {
          setError(
            `Invalid topic: ${topic}. Each topic must be 32 bytes (64 hex chars).`
          );
          return;
        }
      }

      const normalizedTopics = topicList.map((t) =>
        t.startsWith("0x") ? t : `0x${t}`
      );

      const eventData = dataRaw
        ? dataRaw.startsWith("0x")
          ? dataRaw
          : `0x${dataRaw}`
        : "0x";

      const iface = new Interface(ERC20_ABI);
      const decoded = iface.parseLog({
        topics: normalizedTopics,
        data: eventData,
      });

      if (!decoded) {
        setError(
          "Could not decode event. Topic[0] does not match any known ERC-20 event signature."
        );
        return;
      }

      setEventName(decoded.name);

      const decodedParams: DecodedParam[] = decoded.fragment.inputs.map(
        (input, i) => ({
          index: i,
          name: input.name || `param${i}`,
          type: input.type,
          value: formatValue(decoded.args[i]),
          indexed: input.indexed ?? false,
        })
      );
      setParams(decodedParams);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Decoding failed.");
    }
  };

  const loadExample = (ex: (typeof EVENT_EXAMPLES)[number]) => {
    setTopics(ex.topics);
    setData(ex.data);
    setError("");
    setEventName("");
    setParams([]);
  };

  return (
    <div className="space-y-4">
      <InputField
        label="Event Topics (one per line)"
        value={topics}
        onChange={setTopics}
        placeholder={`Topic[0]: 0xddf252ad... (event signature hash)\nTopic[1]: 0x000...sender (indexed param)\nTopic[2]: 0x000...recipient (indexed param)`}
        multiline
        rows={4}
      />

      <InputField
        label="Event Data (hex)"
        value={data}
        onChange={setData}
        placeholder="0x0000000000000000000000000000000000000000000000000de0b6b3a7640000"
        multiline
        rows={2}
      />

      <button
        onClick={handleDecode}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Decode
      </button>

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {eventName && (
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Event:
              </span>
              <code className="text-sm font-medium text-gray-900 dark:text-white">
                {eventName}
              </code>
            </div>
          </div>

          {params.length > 0 && (
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                    <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">
                      #
                    </th>
                    <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">
                      Name
                    </th>
                    <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">
                      Type
                    </th>
                    <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">
                      Indexed
                    </th>
                    <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {params.map((p) => (
                    <tr
                      key={p.index}
                      className="border-b border-gray-200 dark:border-gray-800 last:border-b-0"
                    >
                      <td className="px-4 py-2.5 text-gray-500 dark:text-gray-500">
                        {p.index}
                      </td>
                      <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-white">
                        {p.name}
                      </td>
                      <td className="px-4 py-2.5 text-blue-600 dark:text-blue-400">
                        {p.type}
                      </td>
                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">
                        {p.indexed ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-gray-700 dark:text-gray-300 break-all">
                        {p.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          ERC-20 Event Examples
        </h3>
        <div className="space-y-2">
          {EVENT_EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              onClick={() => loadExample(ex)}
              className="flex w-full items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2.5 text-left transition-colors hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800/50"
            >
              <code className="text-sm text-gray-700 dark:text-gray-300">
                {ex.label}
              </code>
              <span className="text-xs text-gray-500">Click to load</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
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
