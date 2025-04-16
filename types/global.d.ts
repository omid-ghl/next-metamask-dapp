import { EthereumProvider } from "./EthereumType";

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
