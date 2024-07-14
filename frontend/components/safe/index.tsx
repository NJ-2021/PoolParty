'use client';
import { useState } from "react";
import { useSafe } from "~~/hooks/useSafe";
import { useSafeAssets } from "~~/hooks/useSafeAssets";
import { getBlockScoutAccountUrl, getBlockScoutTxUrl, getTransactionOnSepoliaByHash, TransactionDetails } from "~~/lib/blockscout";
import { transferERC20 } from "~~/lib/evm/actions";
import { truncate } from "~~/lib/utils";
import { notification } from "~~/utils/scaffold-eth";
import { Balances } from "../Balances";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useRouter } from "next/navigation";
import { TxToast } from "../TxToast";
import { SafeTransactionList } from "../SafeTransactionsList";



const sepoliaUSDCAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

export const Safe = () => {
    const { safeAddress, safeAccount } = useSafe();
    const { balances, mintTokens } = useSafeAssets();
    const { handleLogOut, isAuthenticated, } = useDynamicContext();
    const [txOpened, setTxOpened] = useState(false);
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handleMintTokens = async () => {
        if (!safeAccount) {
            notification.error("Safe account not found")
            return;
        }

        setLoading(true)
        try {
            const result = await mintTokens();
            notification.success(<TxToast message="Tokens minted!" txhash={result} />);
            console.log("mint result", result);
        } catch (e) {
            console.error("mint error", e);
            notification.error("Mint error")

        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        handleLogOut();
        router.push('/');
    }

    return (

        <div className="flex flex-col justify-center items-center gap-1 bg-gray-700 mt-4 p-1 w-full text-slate-100">
            {txOpened ? <SafeTransactionList onClose={() => setTxOpened(false)} /> :
                <>
                    <div className="bg-slate-700 p-1 rounded text-xs" onClick={() => setTxOpened(true)}>View transfers</div>
                    <div className="flex gap-2">

                        {
                            balances && <Balances balances={balances} />
                        }
                        <button className={`${!safeAccount || loading ? "bg-gray-400 animate-pulse" : "bg-blue-700"} px-2 py-1 rounded-lg text-xs`} onClick={!safeAccount || loading ? undefined : handleMintTokens}>Mint!</button>
                    </div>

                    <div className="flex items-center gap-2">
                        {safeAddress && <div className="text-xs"> <a target="_blank" className="underlined" href={getBlockScoutAccountUrl(safeAddress)}>Wallet: {safeAddress}</a></div>}
                        {isAuthenticated && <button className="bg-orange-700 px-1 py-1 rounded-lg text-xs" onClick={logout}>Logout</button>}
                    </div>
                </>}
        </div>

    )
}