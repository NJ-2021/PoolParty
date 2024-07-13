import { getBlockScoutTxUrl, getUserOpUrl } from "~~/lib/blockscout";


export function TxToast({ opHash, txhash, message }: { message: string, txhash?: string, opHash?: string }) {
    return <div className="text-sm">
        <div className="font-semibold">{message}</div>
        {opHash && <a target="_blank" className="hover:underline" href={getUserOpUrl(opHash)}>View User op: {opHash}</a>}
        {txhash && <a target="_blank" className="hover:underline" href={getBlockScoutTxUrl(txhash)}>View Tx: {txhash}</a>}
    </div>
}