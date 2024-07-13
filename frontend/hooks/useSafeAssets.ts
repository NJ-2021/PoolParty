import { useSafe } from "./useSafe";
import { formatUnits } from "viem";
import { prepareMintERC20 } from "~~/lib/evm/actions";
import useSWR from "swr";
import { readContracts } from "wagmi/actions";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { prepareBalanceOfQuery } from "~~/lib/evm/queries";

export const tokenList = [
    {
        name: "mUSDC",
        token: "0x2AFc1b35CA3102111099f02851CA1C20eA208dDc",
        symbol: "mUSDC",
        decimals: 18,
    },
    {
        name: "mUNI",
        token: "0x2a238CbF7A05B45Fb101d9Fde6A1025719Da50fF",
        symbol: "mUNI",
        decimals: 18,
    }
]

type Token = typeof tokenList[0];


export type Balance = Token & {
    intBalance: bigint,
    balance: string
}

export function useSafeAssets() {

    const { safeAddress, safeAccount } = useSafe();

    const { data: balances, error, mutate } = useSWR(["asset-balances", safeAddress], async () => {
        const result = await readContracts(wagmiConfig, {
            contracts: tokenList.map(tk => prepareBalanceOfQuery(tk.token, safeAddress!))
        });

        const parsedResults = result.map((r, i) => {
            const token = tokenList[i];
            if (!r || r.status !== "success") return { ...token, intBalance: 0, balance: "0" };
            return {
                ...token, intBalance: r.result, balance: formatUnits(BigInt(r.result), token.decimals)
            }
        });
        return parsedResults as Balance[];
    });

    const mintTokens = async () => {
        const txes = tokenList.map(tk => prepareMintERC20(tk.token));

        const result = await safeAccount?.sendTransactions({
            transactions: txes
        });
        mutate();
        return result;
    }

    return {
        balances,
        mintTokens
    }
}

