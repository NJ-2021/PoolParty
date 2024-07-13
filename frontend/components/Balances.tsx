import { Balance } from "~~/hooks/useSafeAssets";



export function Balances({ balances }: { balances: Balance[] }) {
    return (
        <div>
            <h2>Balances</h2>
            <ul>
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