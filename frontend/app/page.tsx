"use client";

import { useState } from "react";
import Link from "next/link";
import { DynamicWidget, useDynamicContext, useSwitchNetwork } from "@dynamic-labs/sdk-react-core";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { sendTransaction, signMessage } from "~~/lib/dynamic";
import { useAccount } from "wagmi";
import { Safe } from "~~/components/safe";
import { Pools } from "~~/components/pool";

const Home: NextPage = () => {
  const { primaryWallet, networkConfigurations } = useDynamicContext();
  const { address, chain, isConnected } = useAccount();
  const switchNetwork = useSwitchNetwork();
  const connectedAddress = primaryWallet?.address;

  // const handleSendTransaction = async () => {
  //   try {
  //     const isTestnet = await primaryWallet?.connector?.isTestnet();
  //     if (!isTestnet) {
  //       alert("You're not on a testnet, proceed with caution.");
  //     }
  //     const hash = await sendTransaction(connectedAddress, "0.0001", primaryWallet, networkConfigurations);
  //     setTransactionSignature(hash);

  //     setTimeout(() => {
  //       setTransactionSignature("");
  //     }, 10000);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <div className="flex justify-center items-center p-8 w-full h-full">
      <div className="flex flex-col gap-2 bg-slate-500 p-2 rounded w-1/2 min-w-[400px]">
        <div className="flex justify-center">
          <h1 className="font-semibold text-slate-100">Pool Party</h1>
        </div>
        <div className="flex justify-center">
          <Pools />
        </div>
        <div className="flex justify-center">
          <Safe />
        </div>
        <div className="flex justify-center">
          <DynamicWidget />
        </div>

      </div>
    </div>
  );
};

export default Home;
