import { useBalance } from "wagmi";
import { useSafe } from "./useSafe";
import { Address } from "viem";



export function useAssetBalance(token?: Address) {
    const { safeAddress } = useSafe();

    const { data: balance } = useBalance({ address: safeAddress, token: token });

    return balance;
}