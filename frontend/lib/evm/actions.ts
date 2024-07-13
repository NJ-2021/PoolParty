import { Address, encodeFunctionData, Hex } from "viem";
import { ERC20_ABI } from "../ABI";

interface BigInt {
    /** Convert to BigInt to string form in JSON.stringify */
    toJSON: () => string;
}
BigInt.prototype.toJSON = function () {
    return this.toString();
};

export const prepareApproveERC20Tx = (tokenAddress: string, amount: bigint, spender: string): { to: Address; value: bigint; data: Hex } => {
    return {
        to: tokenAddress as Address,
        data: encodeFunctionData({
            abi: ERC20_ABI,
            functionName: "approve",
            args: [spender, amount.toString()],
        }),
        value: 0n,
    }
};

export const transferERC20 = async (
    smartAccountClient: any,
    tokenAddress: string,
    amount: bigint,
    toAddress: string,
) => {
    return await smartAccountClient.writeContract({
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: "transfer",
        args: [toAddress, amount.toString()],
    });
};

export const prepareMintERC20 = (tokenAddress: string): { to: Address; value: bigint; data: Hex } => {
    return {
        to: tokenAddress as Address,
        data: encodeFunctionData({
            abi: [{
                "inputs": [],
                "name": "mint",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }],
            functionName: "mint",
            args: [],
        }),
        value: 0n,
    }
}

