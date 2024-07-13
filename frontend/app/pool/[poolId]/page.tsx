"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { NextPage } from "next";
import { Safe } from "~~/components/safe";
import { use7579Module } from "~~/hooks/use7579Module";
import { usePool } from "~~/hooks/usePool";
import { notification } from "~~/utils/scaffold-eth";
import { getBlockScoutTxUrl } from "~~/lib/blockscout";
import { encodePacked } from "viem";
import { TxToast } from "~~/components/TxToast";

const PoolPage: NextPage = () => {
    const { poolId } = useParams();
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const { pool, balances, provideLiquidty } = usePool(poolId as string | undefined);

    const { name, availableModules } = pool || {};

    const firstModule = availableModules?.[0];

    // hardcoding module payload for now
    const modulePayload = "0x0000000151800001000065f81e9400000000000000000000000094a9d9ac8a22534e3faca9f4e7f2e2cf85d5e4c8000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000044a9059cbb000000000000000000000000865f1eb534a48ddbc8457c63ead1e898c7dfd70e00000000000000000000000000000000000000000000000000000000000f424000000000000000000000000000000000000000000000000000000000";

    const { isLoading: isModuleLoading, isModuleInstalled, installModule } = use7579Module(firstModule?.module, modulePayload);

    const handleProvideLiquidty = async () => {
        setLoading(true);
        try {
            const hash = await provideLiquidty();
            if (hash) {
                notification.success(<TxToast message="Provide liquidity successful!" txhash={hash} />);
            }
        } catch (error) {
            console.log("error", error);
            notification.error("Error: " + error);
        } finally {
            setLoading(false);
        }
    };

    const handleEnableAutocompound = async () => {
        setLoading(true);
        try {
            const hash = await installModule();
            if (hash) {
                notification.success(<TxToast message="Module enabled!" txhash={hash} />);
            }
        } catch (error) {
            console.log("error", error);
            notification.error("Error: " + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center p-8 w-full h-full">
            <div className="flex flex-col gap-2 bg-slate-900 rounded-lg w-1/2 min-w-[400px] overflow-hidden">
                <div
                    className="relative z-10 flex flex-col justify-center items-center space-y-4 bg-cover bg-no-repeat bg-center p-8 w-full"
                    style={{
                        backgroundImage: `linear-gradient(90deg, rgba(2,0,36,0.7833727240896359) 0%, rgba(2,0,36,0.3744091386554622) 51%, rgba(2,0,36,0.7917760854341737) 100%), url('/bg.png')`,
                    }}
                >
                    <div
                        className="flex flex-col items-center space-y-2 [text-shadow:_0_2px_2px_rgb(0_0_0_/_40%)] text-3xl"
                        onClick={() => router.push("/")}
                    >
                        <span>Pool Party</span>
                    </div>
                </div>
                <div className="flex justify-start">
                    <div className="p-2 text-gray-300 text-sm" onClick={() => router.push("/")}>
                        &lt; back
                    </div>
                </div>

                <div className="flex justify-center">{name}</div>

                <div className="flex justify-center">
                    <button
                        className={`${loading ? "animate-pulse bg-gray-500" : "bg-blue-700"} text-white rounded p-2`}
                        onClick={loading ? undefined : handleProvideLiquidty}
                    >
                        Provide Liquidity
                    </button>
                </div>

                <div className="flex justify-center">
                    {isModuleInstalled ? (
                        "Auto-compounding enabled"
                    ) : (
                        <button
                            className={`${loading || isModuleLoading ? "animate-pulse bg-gray-500" : "bg-blue-700"} text-white rounded p-2`}
                            onClick={loading || isModuleLoading ? undefined : handleEnableAutocompound}
                        >
                            Install Auto-compounder
                        </button>
                    )}
                </div>

                <div className="flex justify-center">
                    <Safe />
                </div>
            </div>
        </div>
    );
};

export default PoolPage;
