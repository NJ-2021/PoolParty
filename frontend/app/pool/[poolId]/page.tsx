'use client';

import { NextPage } from "next";
import { useParams } from "next/navigation";
import { Safe } from "~~/components/safe";
import { usePool } from "~~/hooks/usePool";


const PoolPage: NextPage = () => {

    const { poolId } = useParams();
    const { pool } = usePool(poolId as string | undefined);

    const { name } = pool || {};

    return <div className="flex justify-center items-center p-8 w-full h-full">
        <div className="flex flex-col gap-2 bg-slate-500 p-2 rounded w-1/2 min-w-[400px]">
            <div className="flex justify-center">
                <h1 className="font-semibold text-slate-100">Pool Party</h1>
            </div>

            <div className="flex justify-center">
                {name}
            </div>

            <div className="flex justify-center">
                <Safe />
            </div>
        </div>
    </div>
}

export default PoolPage;