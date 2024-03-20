'use client';

import { Account, WalletClient } from "viem";
import { useAccount, useReadContract } from 'wagmi';
import { waitForTransactionReceipt, readContract } from '@wagmi/core';
import { writeContract } from "wagmi/actions";
import { NFTAddress, MarketplaceAddress, DAOAddress, NFTABI, MarketplaceABI, DAOABI } from "../constants";
import { config } from "../AppComponent";
import { useState, useEffect } from "react";
import { formatEther } from "viem";

export default function page() {
  const [tokenBalance, setTokenBalance] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [NftTokenId, setNftTokenId] = useState("");

  interface ParsedP {
    proposalId: any;
    nftTokenId: string;
    deadline: Date;
    yayVotes: string;
    nayVotes: string;
    executed: boolean;
  }
  const [proposals, setProposals] = useState<ParsedP[]>([]);
  const [selectedTab, setSelectedTab] = useState("");

  const account: any = useAccount();
  const address = account.address;

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

  const DaoOwner = useReadContract({
    abi: DAOABI,
    address: DAOAddress,
    functionName: 'owner',
  });

  const daoBalance:any = useReadContract({
    abi: DAOABI,
    address: DAOAddress,
    functionName: 'balanceOf',
    args: [address]
  });

  const numOfProposalsInDAO = useReadContract({
    abi: DAOABI,
    address: DAOAddress,
    functionName: "numProposals",
  });

  async function createProposal() {
    setLoading(true);

    try {
      const tx = await writeContract(config, {
        address: DAOAddress,
        abi: DAOABI,
        functionName: "createProposal",
        args: [NftTokenId],
        account,
      });

      const txHash = {
        hash: tx,
      };

      await waitForTransactionReceipt(config, txHash);
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
    setLoading(false);
  }

  async function fetchProposalById(id: any) {
    try {
      const proposal = await readContract(config, {
        address: DAOAddress,
        abi: DAOABI,
        functionName: "proposals",
        args: [id],
      }) as [string, string, any, any, boolean];

      const [nftTokenId, deadline, yayVotes, nayVotes, executed] = proposal;

      interface ParsedP {
        proposalId: any;
        nftTokenId: string;
        deadline: Date;
        yayVotes: string;
        nayVotes: string;
        executed: boolean;
      }

      const parsedProposal: ParsedP = {
        proposalId: id,
        nftTokenId: nftTokenId.toString(),
        deadline: new Date(parseInt(deadline.toString()) * 1000),
        yayVotes: yayVotes.toString(),
        nayVotes: nayVotes.toString(),
        executed: Boolean(executed),
      };

      return parsedProposal;

    } catch (error) {
      console.error(error);
      window.alert(error);
    }
  }

  async function fetchAllProposals() {
    try {
      const proposals: any = [];

      for (let i = 0; i < Number(numOfProposalsInDAO.data); i++) {
        const proposal = await fetchProposalById(i);
        proposals.push(proposal);
      }

      setProposals(proposals);
      return proposals;
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
  }

  async function voteForProposal(proposalId: any, vote: any) {
    setLoading(true);
    try {
      const tx = await writeContract(config, {
        address: DAOAddress,
        abi: DAOABI,
        functionName: "voteOnProposal",
        args: [proposalId, vote === "YAY" ? 0 : 1],
      });

      const txHash = {
        hash: tx,
      };

      await waitForTransactionReceipt(config, txHash);
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
    setLoading(false);
  }

  async function executeProposal(proposalId: any) {
    setLoading(true);
    try {
      const tx = await writeContract(config, {
        address: DAOAddress,
        abi: DAOABI,
        functionName: "executeProposal",
        args: [proposalId],
      });

      const txHash = {
        hash: tx,
      };

      await waitForTransactionReceipt(config, txHash);
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
    setLoading(false);
  }

  async function withdrawDAOEther() {
    setLoading(true);
    try {
      const tx = await writeContract(config, {
        address: DAOAddress,
        abi: DAOABI,
        functionName: "withdrawEther",
        args: [],
      });

      const txHash = {
        hash: tx,
      };

      await waitForTransactionReceipt(config, txHash);
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
    setLoading(false);
  }

  function renderTabs() {
    if (selectedTab === "Create Proposal") {
      return renderCreateProposalTab();
    } else if (selectedTab === "View Proposals") {
      return renderViewProposalsTab();
    }
    return null;
  }

//   function renderCreateProposalTab() {
//     if (loading) {
//       return (
//         <div>Loading... Waiting for transaction...</div>
//       );
//     } else if (Number(balance) === 0) {
//       return (
//         <div>
//           You do not own any NFTs. <br />
//           <b>You cannot create or vote on proposals</b>
//         </div>
//       );
//     } else {
//       return (
//         <div>
//           <label> NFT Token ID to Purchase: </label>
//           <input
//             placeholder="0"
//             type="number"
//             onChange={(e) => setNftTokenId(e.target.value)}
//           />
//           <button onClick={createProposal}>
//             Create
//           </button>
//         </div>
//       );
//     }
//   }

function renderCreateProposalTab() {
    if (loading) {
       return (
         <div className="bg-gray-800 text-gray p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl">
           Loading... Waiting for transaction...
         </div>
       );
    } else if (Number(balance) === 0) {
       return (
         <div className="bg-gray-800 text-gray p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl mt-4">
           You do not own any NFTs. <br />
           <b>You cannot create or vote on proposals</b>
         </div>
       );
    } else {
       return (
         <div className="bg-gray-800 text-gray p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl mt-4">
           <label> NFT Token ID to Purchase: </label>
           <input
             placeholder="0"
             type="number"
             onChange={(e) => setNftTokenId(e.target.value)}
           />
           

           <button className="p-[3px] relative mt-11 ml-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" onClick={createProposal}>
      <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
        Create
      </div>
    </button>
         </div>
       );
    }
   }
   

   function renderViewProposalsTab() {
    if (loading) {
       return (
         <div className="bg-gray-800 text-gray p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl mt-4">
           Loading... Waiting for transaction...
         </div>
       );
    } else if (proposals.length === 0) {
       return (
         <div className="bg-gray-800 text-gray p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl mt-4">
           No proposals have been created
         </div>
       );
    } else {
       return (
         <div className="bg-gray-800 text-gray p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl mt-4">
           {proposals.map((p, index) => (
             <div key={index}>
               <p>Proposal ID: {p.proposalId}</p>
               <p> NFT to Purchase: {p.nftTokenId}</p>
               <p>Deadline: {p.deadline.toLocaleString()}</p>
               <p>Yes Votes: {p.yayVotes}</p>
               <p>No Votes: {p.nayVotes}</p>
               <p>Executed?: {p.executed.toString()}</p>
               {p.deadline.getTime() > Date.now() && !p.executed ? (
                 <div>
                   <button onClick={() => voteForProposal(p.proposalId, "YAY")}>
                    Vote Yes
                   </button>
                   <button onClick={() => voteForProposal(p.proposalId, "NAY")}>
                    Vote No
                   </button>
                 </div>
               ) : p.deadline.getTime() < Date.now() && !p.executed ? (
                 <div>
                   <button onClick={() => executeProposal(p.proposalId)}>
                    Execute Proposal {p.yayVotes > p.nayVotes ? "(YAY)" : "(NAY)"}
                   </button>
                 </div>
               ) : (
                 <div>Proposal Executed</div>
               )}
             </div>
           ))}
         </div>
       );
    }
   }
   


  useEffect(() => {
    if (selectedTab === "View Proposals") {
      fetchAllProposals();
    }
  }, [selectedTab]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

 
  return (
    <div>
      
<div className='flex flex-col justify-center items-center h-screen text-2xl text-slate-50 '>
<div className="bg-gray-800 text-gray p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl">
      <div >
        {daoBalance.data && (
          <>
            Treasury Balance:{" "}
            {formatEther(daoBalance.data.value).toString()} ETH
          </>
        )}
        <br />
        
        Total Number of Proposals: {numOfProposalsInDAO.data?.toString()}
      </div>
      <div className="flex gap-4">
       
                            <button className="p-[3px] relative mt-11 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" onClick={() => setSelectedTab("Create Proposal")}>
                        <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                            Create Proposal
                        </div>
                        </button>
        
                        <button className="p-[3px] relative mt-11 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" onClick={() => setSelectedTab("View Proposals")}>
                    <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                    View Proposals
                    </div>
                    </button>

                    </div>
        
      </div>
      {renderTabs()}
      </div>
    </div>
  );
}
