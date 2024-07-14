import { useSafe } from "./useSafe";
import { formatUnits } from "viem";
import { prepareMintERC20 } from "~~/lib/evm/actions";
import useSWR from "swr";
import { readContracts } from "wagmi/actions";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { prepareBalanceOfQuery } from "~~/lib/evm/queries";
import { getTokenTransfersOnEthSepolia, getTransactionsOnEthSepolia } from "~~/lib/blockscout";

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

export function useTransactions() {

    const { safeAddress, } = useSafe();

    const { data: transactions, mutate, isLoading, isValidating } = useSWR(safeAddress && "transactions", async () => {
        return getTokenTransfersOnEthSepolia(safeAddress!);
    });

    return {
        transactions,
        isLoading,
        mutate
    }
}

