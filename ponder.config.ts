import { createConfig } from "@ponder/core";
import { http } from "viem";
import { erc721ABI } from "./abis/erc721ABI";
import { ITSEABI } from "./abis/ITSEABI";

export default createConfig({
  networks: {
    hardhat: {
      chainId: 31337,
      transport: http(process.env.PONDER_RPC_URL_HARDHAT),
    },
    arbitrum: {
      chainId: 42161,
      transport: http(process.env.PONDER_RPC_URL_42161),
    },
  },
  contracts: {
    ITSE: {
      network: "hardhat",
      abi: erc721ABI,
      address: `0x${process.env.HARDHAT_ITSE_ADDR?.substring(2,process.env.HARDHAT_ITSE_ADDR.length)}`,
      startBlock: 0
    },
  },
});
