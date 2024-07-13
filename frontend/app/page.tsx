"use client";

import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Safe } from "~~/components/safe";
import { Pools } from "~~/components/pools";

const Home: NextPage = () => {
  const { isConnected } = useAccount();
  const { loadingNetwork, sdkHasLoaded, isAuthenticated } = useDynamicContext();

  return (
    <div className="flex justify-center items-center p-8 w-full h-full">
      <div className="flex flex-col gap-2 bg-slate-500 p-2 rounded w-1/2 min-w-[400px]">
        <div className="flex justify-center">
          <h1 className="font-semibold text-slate-100">Pool Party</h1>
        </div>
        <div className="flex justify-center">
          <Pools />
        </div>
        {isAuthenticated && isConnected &&
          <div className="flex justify-center">
            <Safe />
          </div>
        }
        <div className="flex justify-center">
          {loadingNetwork || !sdkHasLoaded ? <div>Loading...</div> : <DynamicWidget />}
        </div>
      </div>
    </div>
  );
};

export default Home;
