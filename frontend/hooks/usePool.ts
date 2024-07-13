export const pools = [
    {
        name: "mUNI/mUSDC 0.1%",
        poolId: "0x1918646e95cc4b60942ba6a899b6b4d91ab19677f05b27dba32f5db52f26e790",
        assets: [
            { token: "0x2a238CbF7A05B45Fb101d9Fde6A1025719Da50fF", symbol: "mUNI" },
            { token: "0x2AFc1b35CA3102111099f02851CA1C20eA208dDc", symbol: "mUSDC" }
        ],
        platform: "UNISWAP",
        fallbackPlatform: "AAVE",
        availableModules: [
            { name: "Auto-compounder", module: "0x0288cA86E0a315A5c9DD0e6E45cA66d6b60dC617" }
        ]
    },
    {
        name: "WBNB/USDC 0.1%",
        poolId: "",
        assets: [
            { token: "", symbol: "WBNB" },
            { token: "0x2AFc1b35CA3102111099f02851CA1C20eA208dDc", symbol: "mUSDC" }
        ],
        platform: "PANCAKE",
        fallbackPlatform: "AAVE"
    }
]

export type Pool = typeof pools[0];

export function usePool(poolId?: string) {

    const pool = pools.find(p => p.poolId === poolId);

    return {
        pool,

    }
}