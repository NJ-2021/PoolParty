import { Address, erc20Abi } from "viem"

export const prepareBalanceOfQuery = (tokenAddress: string, owner: string) => {
    return {
        abi: erc20Abi,
        functionName: 'balanceOf',
        address: tokenAddress as Address,
        args: [
            owner
        ]
    }
}
