"use client";

import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Safe } from "~~/components/safe";
import { Pools } from "~~/components/pools";
import { Welcome } from "~~/components/welcome";

const Home: NextPage = () => {
  const { isConnected } = useAccount();
  const { loadingNetwork, sdkHasLoaded, isAuthenticated, } = useDynamicContext();

  const isLoading = loadingNetwork || !sdkHasLoaded;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8 w-full h-full">
        <div className="flex flex-col items-center gap-2 bg-slate-500 p-2 rounded w-1/2 min-w-[400px] animate-pulse">
          <div>Loading...</div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center p-8 w-full h-full">
      {!isAuthenticated ? <Welcome /> :

        <div className="flex flex-col gap-2 bg-slate-900 rounded-lg w-1/2 min-w-[400px] overflow-hidden">
          <div
            className="relative z-10 flex flex-col justify-center items-center space-y-4 bg-cover bg-no-repeat bg-center p-8 w-full"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(2,0,36,0.7833727240896359) 0%, rgba(2,0,36,0.3744091386554622) 51%, rgba(2,0,36,0.7917760854341737) 100%), url('/bg.png')`,
            }}
          >
            <div className="flex flex-col items-center space-y-2 [text-shadow:_0_2px_2px_rgb(0_0_0_/_40%)] text-3xl">
              <span>Pool Party</span>
            </div>
          </div>

          <div className="flex justify-center">
            <Pools />
          </div>
          {isConnected &&
            <div className="flex justify-center">
              <Safe />
            </div>
          }
        </div>
      }
    </div>
  );
};

export default Home;
