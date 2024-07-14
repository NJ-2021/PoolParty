import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { createWalletClientFromWallet } from "@dynamic-labs/viem-utils";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getPimlicoSmartAccountClient, getSafeAccount, SafeSmartAccountClient } from "~~/lib/permissionless";
import { notification } from "~~/utils/scaffold-eth/notification";



export function useSafe() {
    const { address, chain, isConnected } = useAccount();
    const { primaryWallet, isAuthenticated, } = useDynamicContext();
    const [safeAccount, setSafeAccount] = useState<SafeSmartAccountClient | null>(null);

    useEffect(() => {
        if (!isConnected || !chain || !primaryWallet) return;

        if (!isAuthenticated) {
            setSafeAccount(null)
        }

        const initSafeAccount = async () => {
            if (!isConnected) return;
            if (!primaryWallet || !chain) return;

            if (!process.env.NEXT_PUBLIC_PIMLICO_API_KEY) {
                notification.error("Please set NEXT_PUBLIC_PIMLICO_API_KEY in .env file and restart");
                return;
            }
            const walletClient = await createWalletClientFromWallet(primaryWallet);
            const sWallet = await getSafeAccount(chain, walletClient);
            const client = await getPimlicoSmartAccountClient(sWallet, chain);
            setSafeAccount(client);
        }

        initSafeAccount();
    }, [chain, isAuthenticated]);


    return {
        safeAddress: safeAccount?.account.address,
        safeAccount: safeAccount,
    }
}