import { formatUnits } from "viem";
import { useTransactions } from "~~/hooks/useTransactions";
import { getBlockScoutTxUrl } from "~~/lib/blockscout";


export function SafeTransactionList({ onClose }: { onClose: () => void }) {
    const { transactions } = useTransactions();

    return (
        <div className="flex flex-col w-full text-sm">
            <div className="flex justify-between">
                <h2 className="text-gray-200">Transactions</h2>
                <button className="self-end" onClick={onClose}>Close</button>
            </div>
            <ul className="">
                {transactions ? transactions.map((t, i) => {
                    return (
                        <li key={i}>
                            {parseFloat(formatUnits(t.total.value, t.total.decimals)).toFixed(2)} {t.token.symbol} -&gt; {t.to.name} | <a className="text-blue-500" href={getBlockScoutTxUrl(t.tx_hash)}>Tx</a>
                        </li>
                    )
                }) : "No transfers"}
            </ul>
        </div>
    )
}