import { Address, encodeFunctionData, Hex } from "viem";
import { ERC20_ABI } from "../ABI";
import { SEPOLIA_POOL_ROUTER_CONTRACT } from "../pool";

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

export const prepareAddLiquidity = (): { to: Address; value: bigint; data: Hex } => {
    return {
        to: SEPOLIA_POOL_ROUTER_CONTRACT as Address,
        data: "0x5a6bcfda0000000000000000000000002a238cbf7a05b45fb101d9fde6a1025719da50ff0000000000000000000000002afc1b35ca3102111099f02851ca1c20ea208ddc0000000000000000000000000000000000000000000000000000000000000fa0000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000358400000000000000000000000000000000000000000000000000000000000035e80000000000000000000000000000000000000000000000008ac7230489e80000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000000",
        value: 0n,
    }
}


