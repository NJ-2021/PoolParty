import { readContracts } from "wagmi/actions";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { useSafe } from "./useSafe";
import useSWR from "swr";
import { Address, erc20Abi, formatEther, parseEther } from "viem";
import { POOL_MODIFY_LIQUIDITY_ABI } from "~~/lib/ABI";
import { prepareApproveERC20Tx } from "~~/lib/evm/actions";
import { SEPOLIA_POOL_ROUTER_CONTRACT } from "~~/lib/pool";

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

    const { safeAddress, safeAccount } = useSafe();

    const pool = pools.find(p => p.poolId === poolId);


    const { data: balances, error } = useSWR(["asset-balances", safeAddress, pool?.assets], async () => {
        const result = await readContracts(wagmiConfig, {
            contracts: [
                {
                    abi: erc20Abi,
                    functionName: 'balanceOf',
                    address: pool?.assets[0].token as Address,
                    args: [
                        safeAddress!
                    ]
                },
                {
                    abi: erc20Abi,
                    functionName: 'balanceOf',
                    address: pool?.assets[1].token as Address,
                    args: [
                        safeAddress!
                    ]
                },
            ]
        });

        console.log("asset balances", result);
        const balance0 = result[0].status === "success" ? formatEther(result[0].result) : 0;
        const balance1 = result[1].status === "success" ? formatEther(result[1].result) : 0;
        return {
            balance0,
            balance1
        }
    });

    const provideLiquidty = async () => {

        if (balances && balances.balance0 !== 0 && balances.balance1 !== 0) {
            const txes = [
                prepareApproveERC20Tx(pool?.assets[0].token as Address, parseEther(balances.balance0.toString()), SEPOLIA_POOL_ROUTER_CONTRACT),
                prepareApproveERC20Tx(pool?.assets[1].token as Address, parseEther(balances.balance1.toString()), SEPOLIA_POOL_ROUTER_CONTRACT),
            ];
            console.log("approving allowances", txes);
            const result = safeAccount?.sendTransactions({
                transactions: txes
            }
            );
            console.log("approve result", result);

            return result;
        }
    }




    return {
        pool,
        balances,
        provideLiquidty
    }
}