"use client";

import { useState } from "react";
import Link from "next/link";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { sendTransaction, signMessage } from "~~/lib/dynamic";

const Home: NextPage = () => {
  const { primaryWallet, networkConfigurations } = useDynamicContext();
  const [messageSignature, setMessageSignature] = useState<string>("");
  const [transactionSignature, setTransactionSignature] = useState<string>("");
  const connectedAddress = primaryWallet?.address;

  const handleSignMesssage = async () => {
    try {
      const signature = await signMessage("Hello World", primaryWallet);
      setMessageSignature(signature);

      setTimeout(() => {
        setMessageSignature("");
      }, 10000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendTransaction = async () => {
    try {
      const isTestnet = await primaryWallet?.connector?.isTestnet();
      if (!isTestnet) {
        alert("You're not on a testnet, proceed with caution.");
      }
      const hash = await sendTransaction(connectedAddress, "0.0001", primaryWallet, networkConfigurations);
      setTransactionSignature(hash);

      setTimeout(() => {
        setTransactionSignature("");
      }, 10000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="flex flex-col flex-grow items-center pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block mb-2 text-2xl">Welcome to</span>
            <span className="block font-bold text-4xl">Scaffold-ETH 2</span>
          </h1>
          <div className="flex sm:flex-row flex-col justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          {primaryWallet && !transactionSignature && (
            <div className="flex sm:flex-row flex-col justify-center items-center space-x-2">
              <button onClick={() => handleSendTransaction()} className="btn btn-primary">
                Send 0.001 ETH to yourself
              </button>
              <button onClick={() => handleSignMesssage()} className="btn btn-primary">
                Sign Hello World
              </button>
            </div>
          )}
          {primaryWallet && messageSignature && (
            <p className="text-center-text-lg">Message signed! {messageSignature}</p>
          )}
          {primaryWallet && transactionSignature && (
            <p className="text-center-text-lg">Transaction processed! {transactionSignature}</p>
          )}
          <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="inline-block bg-base-300 max-w-full font-bold text-base break-all break-words italic">
              packages/nextjs/app/page.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="inline-block bg-base-300 max-w-full font-bold text-base break-all break-words italic">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="inline-block bg-base-300 max-w-full font-bold text-base break-all break-words italic">
              packages/hardhat/contracts
            </code>
          </p>
        </div>

        <div className="flex-grow bg-base-300 mt-16 px-8 py-12 w-full">
          <div className="flex sm:flex-row flex-col justify-center items-center gap-12">
            <div className="flex flex-col items-center bg-base-100 px-10 py-10 rounded-3xl max-w-xs text-center">
              <BugAntIcon className="w-8 h-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col items-center bg-base-100 px-10 py-10 rounded-3xl max-w-xs text-center">
              <MagnifyingGlassIcon className="w-8 h-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
