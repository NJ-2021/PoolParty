import { ERC20_ABI, POOL_MODIFY_LIQUIDITY_ABI } from "../ABI";
import { SEPOLIA_POOL_ROUTER_CONTRACT } from "../pool";
import { Address, Hex, encodeAbiParameters, encodeFunctionData } from "viem";

interface BigInt {
    /** Convert to BigInt to string form in JSON.stringify */
    toJSON: () => string;
}
BigInt.prototype.toJSON = function () {
    return this.toString();
};

export const prepareApproveERC20Tx = (
    tokenAddress: string,
    amount: bigint,
    spender: string,
): { to: Address; value: bigint; data: Hex } => {
    return {
        to: tokenAddress as Address,
        data: encodeFunctionData({
            abi: ERC20_ABI,
            functionName: "approve",
            args: [spender, amount.toString()],
        }),
        value: 0n,
    };
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
            abi: [
                {
                    inputs: [],
                    name: "mint",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
            ],
            functionName: "mint",
            args: [],
        }),
        value: 0n,
    };
};

export const prepareAddLiq = (tokenA: string, tokenB: string, tickLower: number, tickUpper: number, amount: bigint) => {
    console.log("prepareAddLiq", tokenA, tokenB, tickLower, tickUpper, amount);
    return {
        to: SEPOLIA_POOL_ROUTER_CONTRACT as Address,
        data: encodeFunctionData({
            abi: POOL_MODIFY_LIQUIDITY_ABI,
            functionName: "modifyLiquidity",
            args: [
                {
                    currency0: tokenA,
                    currency1: tokenB,
                    fee: 4000,
                    tickSpacing: 10,
                    hooks: "0x0000000000000000000000000000000000000000",
                },
                {
                    tickLower: tickLower,
                    tickUpper: tickUpper,
                    liquidityDelta: amount, // 10000000000000000000n,
                    salt: "0x0000000000000000000000000000000000000000000000000000000000000000",
                },
                "0x",
            ],
        }),
        value: 0n,
    };
};

export const prepareAddLiquidity = (): { to: Address; value: bigint; data: Hex } => {
    return {
        to: SEPOLIA_POOL_ROUTER_CONTRACT as Address,
        data: "0x5a6bcfda0000000000000000000000002a238cbf7a05b45fb101d9fde6a1025719da50ff0000000000000000000000002afc1b35ca3102111099f02851ca1c20ea208ddc0000000000000000000000000000000000000000000000000000000000000fa0000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000358400000000000000000000000000000000000000000000000000000000000035e80000000000000000000000000000000000000000000000008ac7230489e80000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000000",
        value: 0n,
    };
};
