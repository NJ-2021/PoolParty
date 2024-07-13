'use client';

import { NextPage } from "next";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Safe } from "~~/components/safe";
import { usePool } from "~~/hooks/usePool";


const PoolPage: NextPage = () => {

    const { poolId } = useParams();
    const [loading, setLoading] = useState(false);

    const { pool, balances, provideLiquidty } = usePool(poolId as string | undefined);

    const { name } = pool || {};

    const handleProvideLiquidty = async () => {
        setLoading(true);
        await provideLiquidty();
        setLoading(false);
    }

    return <div className="flex justify-center items-center p-8 w-full h-full">
        <div className="flex flex-col gap-2 bg-slate-500 p-2 rounded w-1/2 min-w-[400px]">
            <div className="flex justify-center">
                <h1 className="font-semibold text-slate-100">Pool Party</h1>
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