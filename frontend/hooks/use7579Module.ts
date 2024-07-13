import useSWR from "swr";
import { useSafe } from "./useSafe";
import { Address } from "viem";

export function use7579Module(moduleAddress?: string, modulePayload: string = '0x') {
    const { safeAccount } = useSafe()

    const { data: isModuleInstalled, isLoading } = useSWR(moduleAddress && safeAccount && `module-installed/${moduleAddress}`, async () => {

        return safeAccount!.isModuleInstalled({
            type: 'executor',
            address: moduleAddress as Address,
            context: modulePayload as Address
        })
            .catch(() => false)
    });

    const installModule = async () => {
        if (!safeAccount || !moduleAddress) return;
        return await safeAccount.installModule({
            type: 'executor',
            address: moduleAddress as Address,
            context: modulePayload as Address
        });
    }

    return {
        isLoading: isLoading,
        isModuleInstalled,
        installModule
    }
}