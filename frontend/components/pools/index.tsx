import { useRouter } from "next/navigation";
import { pools, Pool } from "~~/hooks/usePool";

function PoolItem({ name, assets, platform, poolId, apy }: Pool) {
    const router = useRouter();

    return <div className="flex flex-col flex-grow justify-center items-center bg-green-800 hover:bg-green-600 p-2 rounded-lg" onClick={
        () => {
            router.push(`/pool/${poolId}`)
        }
    }>
        <h1>{platform} - {name}</h1>
        <div className="flex gap-1 text-xs">
            {apy}
        </div>
    </div>
}

export function Pools() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="font-semibold text-sm">Available Pools</div>
            <div className="flex flex-col gap-2">
                {pools.map(p => <PoolItem key={p.name} {...p}></PoolItem>)}
            </div>
        </div>
    )
}

