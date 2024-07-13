import { Balance } from "~~/hooks/useSafeAssets";



export function Balances({ balances }: { balances: Balance[] }) {
    return (
        <div>
            <h2 className="text-gray-200 text-sm">Tokens</h2>
            <ul className="text-sm">
                {balances.map((b, i) => {
                    return (
                        <li key={i}>
                            {b.symbol}: {b.balance}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}