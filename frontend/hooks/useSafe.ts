import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { createWalletClientFromWallet } from "@dynamic-labs/viem-utils";
import { SafeSmartAccount } from "permissionless/accounts";
import { useEffect, useMemo, useState } from "react";
import { HttpTransport, WalletClient } from "viem";
import { useAccount } from "wagmi";
import { getPimlicoSmartAccountClient, getSafeAccount, SafeSmartAccountClient } from "~~/lib/permissionless";
import { notification } from "~~/utils/scaffold-eth/notification";



export function useSafe() {
    const { address, chain, isConnected } = useAccount();
    const { primaryWallet, isAuthenticated } = useDynamicContext();
    const [safeWallet, setSafeWallet] = useState<SafeSmartAccount<"0x0000000071727De22E5E9d8BAf0edAc6f37da032", HttpTransport, undefined> | null>(null);
    const [safeAccount, setSafeAccount] = useState<SafeSmartAccountClient | null>(null);

    useEffect(() => {
        if (!isConnected || !chain || !primaryWallet) return;

        if (!isAuthenticated) {
            setSafeWallet(null)
        }

        const initSafe = async () => {
            const walletClient = await createWalletClientFromWallet(primaryWallet);
            const sWallet = await getSafeAccount(chain, walletClient);
            setSafeWallet(sWallet);
        }

        initSafe();
    }, [chain, primaryWallet, isConnected, isAuthenticated]);

    useEffect(() => {
        if (!isConnected || !chain || !primaryWallet) return;

        if (!isAuthenticated) {
            setSafeWallet(null)
        }

        const initSafeAccount = async () => {
            if (!isConnected || !safeWallet) return;
            if (!primaryWallet || !chain) return;

            if (!process.env.NEXT_PUBLIC_PIMLICO_API_KEY) {
                notification.error("Please set NEXT_PUBLIC_PIMLICO_API_KEY in .env file and restart");
                return;
            }
            const client = await getPimlicoSmartAccountClient(safeWallet, chain);
            setSafeAccount(client);
        }

        initSafeAccount();
    }, [chain, safeWallet, isAuthenticated]);


    return {
        safeAddress: safeWallet?.address,
        safeWallet: safeWallet,
        safeAccount: safeAccount,
    }
}