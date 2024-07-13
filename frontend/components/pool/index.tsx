import { getBlockScoutAccountUrl } from "~~/lib/blockscout";

const pools = [
    {
        name: "WETH/USDC 0.1%",
        poolKey: "",
        assets: [
            { token: "", symbol: "WETH" },
            { token: "", symbol: "USDC" }
        ],
        platform: "UNISWAP",
        fallbackPlatform: "AAVE"
    },
    {
        name: "WBNB/USDC 0.1%",
        poolKey: "",
        assets: [
            { token: "", symbol: "WBNB" },
            { token: "", symbol: "USDC" }
        ],
        platform: "PANCAKE",
        fallbackPlatform: "AAVE"
    }
]

type PoolItem = typeof pools[0];

function PoolItem({ name, poolKey, assets, platform }: PoolItem) {

    return <div className="flex flex-col justify-center items-center bg-green-800 hover:bg-green-600 p-2 rounded-lg">
        <h1>{platform} - {name}</h1>
        <div className="flex gap-1 text-xs">
            {assets.map(a => <a target="_blank" href={getBlockScoutAccountUrl(a.token)}>{a.symbol}</a>)}
        </div>
    </div>
}

export function Pools() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="font-semibold text-sm">Available Pools</div>
            <div className="flex flex-col items-start gap-2">
                {pools.map(p => <PoolItem {...p}></PoolItem>)}
            </div>
        </div>
    )
}

