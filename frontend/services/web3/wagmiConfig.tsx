import { getOrMapViemChain } from "@dynamic-labs/viem-utils";
import { Chain, createClient, http } from "viem";
import {
  hardhat,
  sepolia,
} from "viem/chains";
import { createConfig } from "wagmi";
import { customEvmNetworks } from "~~/lib/networks";
import scaffoldConfig from "~~/scaffold.config";

export const wagmiConfig = createConfig({
  chains: [
    sepolia,
    // arbitrum,
    // arbitrumSepolia,
    // base,
    // baseSepolia,
    // mainnet,
    // polygon,
    // polygonAmoy,
    // scroll,
    // scrollSepolia,
    // hardhat,
    ...customEvmNetworks.map(getOrMapViemChain),
  ],
  ssr: true,
  client({ chain }) {
    return createClient({
      chain,
      transport: http(process.env.NEXT_PUBLIC_JSON_RPC ?? "https://rpc.ankr.com/eth_sepolia"),
      ...(chain.id !== (hardhat as Chain).id
        ? {
          pollingInterval: scaffoldConfig.pollingInterval,
        }
        : {}),
    });
  },
});
