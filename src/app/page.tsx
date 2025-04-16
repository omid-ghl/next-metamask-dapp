import { WalletCard } from "@/components";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>MetaMask DApp</title>
      </Head>
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-neutral-800 from-neutral-800">
        <div className="p-8 rounded-2xl shadow-lg w-full sm:w-140">
          <WalletCard />
        </div>
      </main>
    </>
  );
}
