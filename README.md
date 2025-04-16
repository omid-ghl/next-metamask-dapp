# 🦊 Web3 Wallet DApp (Next.js + MetaMask)

This is a decentralized application (DApp) built with **Next.js**, **TypeScript**, **TailwindCSS**, and **ethers.js** that allows users to connect their **MetaMask wallet**, fetch their **account balance**, and view their **transaction history** via **Etherscan API**.

---

## 🚀 Features

- 🔐 **MetaMask Integration**  
  Users can securely connect their Ethereum wallet using MetaMask.

- 💰 **Live ETH Balance**  
  Automatically retrieves and displays the connected account’s ETH balance.

- 📜 **Transaction History Viewer**  
  Fetches a complete list of transactions associated with the wallet address using the **Etherscan API**, including:

  - Transaction hash (with link to Etherscan)
  - Amount (in ETH)
  - Timestamp (readable format)

- 🌍 **i18n Multilingual Support**  
  Full support for multiple languages using `react-i18next`.

- 🎨 **Beautiful UI**  
  Styled with **TailwindCSS** for clean, responsive, and mobile-friendly design.

- ⚙️ **Environment-Based Configuration**  
  Uses `.env` file to configure API URLs and keys securely.

- 🧪 **Typed Development**  
  Strong TypeScript typing for wallet and transaction models.

- 🪝 **React Hooks**  
  Efficient state and lifecycle management using React hooks.

---

## 📦 Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [ethers.js](https://docs.ethers.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [react-i18next](https://react.i18next.com/)
- [MetaMask](https://metamask.io/)
- [Etherscan API](https://docs.etherscan.io/)

---

## 🧾 Transaction History (via Etherscan API)

The app fetches a full list of transactions for the connected wallet using the [Etherscan API](https://docs.etherscan.io/). This feature provides:

- Clickable transaction hashes that open the transaction in Etherscan.

### 🔑 API Key Requirement

> ⚠️ To use this feature, you **must provide an Etherscan API key**.

Sign up at [etherscan.io](https://etherscan.io/myapikey) and generate an API key. Then, create a `.env` file in the root directory:

````env
NEXT_PUBLIC_ETHERSCAN_API_KEY=your_api_key_here
NEXT_PUBLIC_ETHERSCAN_API_URL=https://api.etherscan.io/api




## 🛠️ Installation

```bash
# Clone the repo
git clone https://github.com/omid-ghl/next-metamask-dapp
cd next-metamask-dapp

#please put the env file in root of the project


# Install dependencies
yarn
npm install

# Run locally
yarn dev
npm run dev
````
