'use client'

import { useAccount, useReadContract } from 'wagmi';
import { NFTAddress, MarketplaceAddress, DAOAddress, NFTABI, MarketplaceABI, DAOABI } from "../constants";
import { writeContract } from "wagmi/actions";
import { config } from "../AppComponent";
import { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";





export default function page () {
    
    const account: any = useAccount();
    const address = account.address;
    const [tokenBalance, setTokenBalance] = useState(0);

const mint = async () => {
  await writeContract(config, {
    address: NFTAddress,
    abi: NFTABI,
    functionName: 'mint',
    args: [],
    account,
  });
}

const { data: balance, isLoading, error } = useReadContract({
  abi: NFTABI,
  address: NFTAddress,
  functionName: 'balanceOf',
  args: [address],
});

useEffect(() => {
  if (balance) {
    const balanceValue = typeof balance === 'number' ? balance : Number(balance);
    setTokenBalance(balanceValue);
  }
}, [balance]);
  return (
    <div>
        {/* <div className="flex float-end mt-3 mr-3">
        <ConnectButton />
      </div> */}
    <div className='flex flex-col justify-center items-center h-screen'>
 <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl">
    {Number(balance) > 0 ? (
      <div className="text-2xl">
        You own {Number(balance)} tokens.
      </div>
    ) : (
      <div className="text-2xl">
        Please mint tokens.
      </div>
    )}
    <button className="p-[3px] relative mt-11 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" onClick={mint}>
      <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
        Mint Token!
      </div>
    </button>
 </div>
</div>


</div>

  )
}

