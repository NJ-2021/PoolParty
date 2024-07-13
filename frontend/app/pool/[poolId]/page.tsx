'use client';

import { NextPage } from "next";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Safe } from "~~/components/safe";
import { usePool } from "~~/hooks/usePool";


const PoolPage: NextPage = () => {

    const { poolId } = useParams();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { pool, balances, provideLiquidty } = usePool(poolId as string | undefined);

    const { name } = pool || {};

    const handleProvideLiquidty = async () => {
        setLoading(true);
        await provideLiquidty();
        setLoading(false);
    }

    return <div className="flex justify-center items-center p-8 w-full h-full">
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
            <div className="flex justify-start">
                <div className="p-2 text-gray-300 text-sm" onClick={router.back}>&lt; back</div>
            </div>

            <div className="flex justify-center">
                {name}
            </div>
            <div className="flex justify-center">
                {balances && JSON.stringify(balances)}
            </div>
            <div className="flex justify-center">
                <button className={`${loading ? "animate-pulse bg-gray-500" : "bg-blue-700"} text-white rounded p-2`} onClick={loading ? undefined : handleProvideLiquidty}>Provide Liquidity</button>
            </div>

            <div className="flex justify-center">
                <Safe />
            </div>
        </div>
    </div>
}

export default PoolPage;