'use client';
import { useState } from "react";
import { useSafe } from "~~/hooks/useSafe";
import { useSafeAssets } from "~~/hooks/useSafeAssets";
import { getBlockScoutAccountUrl, getBlockScoutTxUrl, getTransactionOnSepoliaByHash, TransactionDetails } from "~~/lib/blockscout";
import { transferERC20 } from "~~/lib/evm/actions";
import { truncate } from "~~/lib/utils";
import { notification } from "~~/utils/scaffold-eth";
import { Balances } from "../Balances";


const sepoliaUSDCAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

export const Safe = () => {
    const { safeAddress, safeAccount } = useSafe();
    const { balances, mintTokens } = useSafeAssets();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [transactions, setTransactions] = useState<string[]>([]);
    const [transactionDetails, setTransactionDetails] = useState<TransactionDetails[]>([]);

    const sendTokens = async () => {
        if (!safeAccount) {
            notification.error("Safe account not found")
            return;
        }

        setLoading(true)


        const txHash = await transferERC20(
            safeAccount,
            sepoliaUSDCAddress,
            BigInt(0.1 * 10 ** 6),
            "0x865f1EB534a48DDBC8457C63eAd1E898C7DfD70E",
        );

        notification.success(<div>
            Transfer initiated successfully:<a href={getBlockScoutTxUrl(txHash)}>txHash</a>
        </div>);
        console.log("txHash", txHash);
        const transactionDetail = await getTransactionOnSepoliaByHash(txHash);
        setTransactionDetails([...transactionDetails, transactionDetail]);

        setLoading(false)
        return txHash
    }

    const handleMintTokens = async () => {
        if (!safeAccount) {
            notification.error("Safe account not found")
            return;
        }

        setLoading(true)
        const result = await mintTokens();
        console.log("mint result", result);
        setLoading(false)
    }

    return (
        <div className="flex flex-col justify-center items-center gap-1 bg-gray-900 p-1 rounded-lg text-slate-100">
            {safeAddress && <div className="text-sm">Safe: <a target="_blank" href={getBlockScoutAccountUrl(safeAddress)}>{truncate(safeAddress)}</a></div>}
            {!safeAccount || loading ?
                <div>...</div>
                :
                <button className="bg-blue-700 px-2 py-1 rounded-lg text-xs" onClick={handleMintTokens}>Mint!</button>
            }
            {
                balances && <Balances balances={balances} />
            }
        </div>
    )
}