"use client";

import { useState, useMemo } from "react";
import InputField from "@/components/tools/InputField";

const COMMON_GAS_LIMITS: { label: string; value: string }[] = [
  { label: "ETH Transfer", value: "21000" },
  { label: "ERC-20 Transfer", value: "65000" },
  { label: "ERC-20 Approve", value: "46000" },
  { label: "Uniswap Swap", value: "150000" },
  { label: "NFT Mint", value: "250000" },
  { label: "Contract Deploy", value: "1000000" },
];

export default function GasCalculatorTool() {
  const [gasLimit, setGasLimit] = useState("21000");
  const [gasPrice, setGasPrice] = useState("20");
  const [ethPrice, setEthPrice] = useState("");

  const result = useMemo(() => {
    const limit = parseFloat(gasLimit);
    const price = parseFloat(gasPrice);

    if (isNaN(limit) || isNaN(price) || limit <= 0 || price <= 0) {
      return null;
    }

    const costGwei = limit * price;
    const costEth = costGwei / 1e9;
    const ethPriceNum = parseFloat(ethPrice);
    const costUsd =
      !isNaN(ethPriceNum) && ethPriceNum > 0 ? costEth * ethPriceNum : null;

    return { costGwei, costEth, costUsd };
  }, [gasLimit, gasPrice, ethPrice]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Gas Limit"
          value={gasLimit}
          onChange={setGasLimit}
          placeholder="e.g. 21000"
          type="number"
        />
        <InputField
          label="Gas Price (Gwei)"
          value={gasPrice}
          onChange={setGasPrice}
          placeholder="e.g. 20"
          type="number"
        />
      </div>

      <InputField
        label="ETH Price (USD) — optional"
        value={ethPrice}
        onChange={setEthPrice}
        placeholder="e.g. 3500"
        type="number"
      />

      {result && (
        <div className="rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-5 space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Transaction Cost
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-gray-500">Cost in Gwei</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {result.costGwei.toLocaleString()} Gwei
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Cost in ETH</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {result.costEth.toFixed(8)} ETH
              </p>
            </div>
            {result.costUsd !== null && (
              <div className="sm:col-span-2">
                <p className="text-xs text-gray-500">Cost in USD</p>
                <p className="text-lg font-medium text-green-600 dark:text-green-400">
                  ${result.costUsd.toFixed(2)}
                </p>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500">
            Formula: {gasLimit} (gas) x {gasPrice} Gwei = {result.costGwei.toLocaleString()} Gwei ={" "}
            {result.costEth.toFixed(8)} ETH
          </p>
        </div>
      )}

      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Common Gas Limits
        </h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {COMMON_GAS_LIMITS.map((item) => (
            <button
              key={item.label}
              onClick={() => setGasLimit(item.value)}
              className="rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 text-left transition-colors hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800/50"
            >
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</p>
              <p className="text-xs text-gray-500">
                {parseInt(item.value).toLocaleString()} gas
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
