"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Transaction } from "../../../types";
import { Logger } from "@/services";
import { IWalletCard } from "./WalletCard";
import { useTranslation } from "react-i18next";

// this props section is not used in the component, but it is a good practice to define it for future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function WalletCard(_props: IWalletCard.IProps) {
  const { t } = useTranslation("common");

  const [walletInfo, setWalletInfo] = useState<{
    account: string | null;
    balance: string | null;
  }>({ account: null, balance: null });

  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const loadWalletInfo = async () => {
    const context = "WalletCard/loadWalletInfo";

    if (typeof window.ethereum === "undefined") {
      setError(t("appNotInstalled"));
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);

      setWalletInfo({ account: address, balance: ethers.formatEther(balance) });

      await fetchTransactions(address);
    } catch (error) {
      Logger.error(t("infoErr", { error }), { context });
      setError(t("infoErrNoWallet"));
    }
  };

  const connectWallet = async () => {
    const context = "WalletCard/connectWallet";

    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        await loadWalletInfo();
      } catch (err: unknown) {
        Logger.error(t("conectErr", { error: err }), { context });
        setError(t("connectFailed"));
      }
    } else {
      setError(t("installMask"));
    }
  };

  const initializeWallet = async () => {
    const context = "WalletCard/connectWallet";

    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = (await window.ethereum.request({
          method: "eth_accounts",
        })) as string[];

        if (accounts.length > 0) {
          await loadWalletInfo();
        }
      } catch (error) {
        Logger.error(t("walletConnection", { error }), { context });
        setError(t("failedToLoadAcc"));
      }
    } else {
      setError(t("appNotInstalled"));
    }
  };

  const fetchTransactions = async (address: string) => {
    const context = "WalletCard/fetchTransactions";

    const etherscanAPIUrl = process.env.NEXT_PUBLIC_ETHERSCAN_API_URL;
    const etherscanAPIKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;

    if (!etherscanAPIUrl || !etherscanAPIKey) {
      setError(t("missingEnvVars"));
      return;
    }

    const etherscanURL = `${etherscanAPIUrl}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${etherscanAPIKey}`;

    try {
      const response = await fetch(etherscanURL);
      const data = await response.json();

      if (data.status === "1") {
        setTransactions(data.result);
      } else {
        setError(t("errorFetchingTransactions"));
        Logger.error(data.message, { context });
      }
    } catch (error) {
      Logger.error("Error fetching transactions:" + error, { context });
      setError(t("errorFetchingTransactionsGeneric"));
    }
  };

  useEffect(() => {
    initializeWallet();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r flex flex-col items-center justify-center py-12 px-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full sm:w-160">
        <h1 className="text-2xl font-semibold text-center text-neutral-600 mb-8">
          {t("metaMaskConnection")}
        </h1>

        <button
          onClick={connectWallet}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-md focus:outline-none transition duration-200"
        >
          {walletInfo.account
            ? t("welcome") + " " + t("walletConnected")
            : t("connectWallet")}
        </button>

        {walletInfo.account && (
          <div className="mt-8 space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <p className="text-lg font-semibold text-gray-700">
                <strong>{t("address")}:</strong>
                <span className="block break-words">{walletInfo.account}</span>
              </p>
              <p className="text-lg font-semibold text-gray-700 mt-3">
                <strong>{t("balance")}:</strong> {walletInfo.balance} ETH
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-700">
                {t("transactionHistory")}
              </h3>
              {transactions.length > 0 ? (
                <div className="space-y-3">
                  {transactions.map((txn, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-4 rounded-lg shadow-md"
                    >
                      <p>
                        <strong>{t("txHash")}:</strong>{" "}
                        <a
                          href={`https://etherscan.io/tx/${txn.hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-600"
                        >
                          {txn?.hash?.substring(0, 15)}...
                        </a>
                      </p>
                      <p>
                        <strong>{t("amount")}:</strong>{" "}
                        {ethers.formatEther(txn.value)} ETH
                      </p>
                      <p>
                        <strong>{t("timestamp")}:</strong>{" "}
                        {new Date(txn.timeStamp * 1000).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">{t("noTransactions")}</p>
              )}
            </div>
          </div>
        )}

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}
