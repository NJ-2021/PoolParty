import { readContracts } from "wagmi/actions";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { useSafe } from "./useSafe";
import useSWR from "swr";
import { Address, erc20Abi, formatEther, parseEther, parseUnits } from "viem";
import { prepareAddLiq, prepareAddLiquidity, prepareApproveERC20Tx } from "~~/lib/evm/actions";

export const pools = [
    {
        name: "mUNI/mUSDC 0.1%",
        poolId: "0x1918646e95cc4b60942ba6a899b6b4d91ab19677f05b27dba32f5db52f26e790",
        assets: [
            { token: "0x2a238CbF7A05B45Fb101d9Fde6A1025719Da50fF", symbol: "mUNI" },
            { token: "0x2AFc1b35CA3102111099f02851CA1C20eA208dDc", symbol: "mUSDC" }
        ],
        apy: "Earn 4% - 23%",
        platform: "UNISWAP",
        fallbackPlatform: "AAVE",
        routerContract: "0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317",
        availableModules: [
            { name: "Auto-compounder", module: "0x95067d0d5ffcED37759a4E5C84863CC19FD70F14" }
        ]
    },
    {
        name: "WBNB/USDC 0.1%",
        poolId: "0x019328934",
        apy: "Earn 5% - 18%",
        assets: [
            { token: "0x2a238CbF7A05B45Fb101d9Fde6A1025719Da50fF", symbol: "mUNI" },
            { token: "0x2AFc1b35CA3102111099f02851CA1C20eA208dDc", symbol: "mUSDC" }
        ],
        routerContract: "0x97e09cD0E079CeeECBb799834959e3dC8e4ec31A",
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

    const provideLiquidty = async (lower: number, upper: number, amount: number) => {

        if (balances && balances.balance0 !== 0 && balances.balance1 !== 0) {
            const router = pool?.routerContract;
            if (!router) throw Error("Missing router");

            const txes = [
                prepareApproveERC20Tx(pool?.assets[0].token as Address, parseEther(balances.balance0.toString()), router),
                prepareApproveERC20Tx(pool?.assets[1].token as Address, parseEther(balances.balance1.toString()), router),
                prepareAddLiq(pool?.assets[0].token as Address, pool?.assets[1].token as Address, lower, upper, parseUnits(amount.toString(), 18))
            ];

            console.log("approving allowances", txes);
            console.log("old provide liquidity tx", prepareAddLiquidity());

            const result = await safeAccount?.sendTransactions({
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