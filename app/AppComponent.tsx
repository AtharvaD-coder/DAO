'use client'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider, darkTheme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { sepolia } from "wagmi/chains";
import { FloatingNav } from './components/ui/floating-navbar';
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const config = getDefaultConfig({
  appName: 'Dao',
  projectId:process.env.NEXT_PUBLIC_PROJID_KEY!,
  chains: [sepolia],
});


const items = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Mint",
    link: "/mint",
  },
  {
    name: "proposals",
    link: "/proposals",
  },
]

const queryClient = new QueryClient();

  export const AppComponent = ({ children }: { children: React.ReactNode })=>{
    return(
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={darkTheme()}  >
              <div className=''>
                <main>
                <div>
              <FloatingNav navItems={items} className='bg-current mt-0'/>
              </div>
              <div className="flex float-end mt-3 mr-3">
        <ConnectButton />
      </div>
                  {children}
                  </main>
                </div>
            </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};
  