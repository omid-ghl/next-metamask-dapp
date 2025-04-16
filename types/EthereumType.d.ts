import { Transaction as trType } from "ethers";

export interface EthereumProvider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (
    event: string,
    handler: (...args: unknown[]) => void
  ) => void;
}

export interface Window {
  ethereum?: EthereumProvider;
}

export type Transaction = trType & { timeStamp: number };
