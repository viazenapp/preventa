import { useState, useEffect } from 'react';

export interface SimpleWeb3State {
  account: string | null;
  isConnected: boolean;
  chainId: number | null;
  isLoading: boolean;
  error: string | null;
}

// Simple Web3 hook that works without external dependencies
export const useSimpleWeb3 = () => {
  const [state, setState] = useState<SimpleWeb3State>({
    account: null,
    isConnected: false,
    chainId: null,
    isLoading: false,
    error: null,
  });

  // Check if wallet is already connected
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        try {
          const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            const chainId = await (window as any).ethereum.request({ method: 'eth_chainId' });
            setState(prev => ({
              ...prev,
              account: accounts[0],
              isConnected: true,
              chainId: parseInt(chainId, 16),
            }));
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
        }
      }
    };

    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if ((window as any).ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setState(prev => ({
            ...prev,
            account: null,
            isConnected: false,
            chainId: null,
          }));
        } else {
          setState(prev => ({
            ...prev,
            account: accounts[0],
            isConnected: true,
          }));
        }
      };

      const handleChainChanged = (chainId: string) => {
        setState(prev => ({
          ...prev,
          chainId: parseInt(chainId, 16),
        }));
      };

      (window as any).ethereum.on('accountsChanged', handleAccountsChanged);
      (window as any).ethereum.on('chainChanged', handleChainChanged);

      return () => {
        (window as any).ethereum.removeListener('accountsChanged', handleAccountsChanged);
        (window as any).ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      setState(prev => ({
        ...prev,
        error: 'MetaMask is not installed. Please install MetaMask and try again.',
      }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const accounts = await (window as any).ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        const chainId = await (window as any).ethereum.request({ method: 'eth_chainId' });
        setState(prev => ({
          ...prev,
          account: accounts[0],
          isConnected: true,
          chainId: parseInt(chainId, 16),
          isLoading: false,
        }));

        // If not on Polygon Mumbai, ask to switch
        if (parseInt(chainId, 16) !== 80001) {
          await switchToPolygonMumbai();
        }
      }
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to connect wallet',
        isLoading: false,
      }));
    }
  };

  const disconnectWallet = () => {
    setState({
      account: null,
      isConnected: false,
      chainId: null,
      isLoading: false,
      error: null,
    });
  };

  const switchToPolygonMumbai = async () => {
    if (!(window as any).ethereum) return;

    const POLYGON_MUMBAI = {
      chainId: '0x13881', // 80001 in hex
      chainName: 'Polygon Mumbai Testnet',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
      blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    };

    try {
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: POLYGON_MUMBAI.chainId }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await (window as any).ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [POLYGON_MUMBAI],
          });
        } catch (addError: any) {
          setState(prev => ({
            ...prev,
            error: 'Failed to add Polygon Mumbai network',
          }));
        }
      } else {
        setState(prev => ({
          ...prev,
          error: 'Failed to switch to Polygon Mumbai network',
        }));
      }
    }
  };

  // Demo token purchase function
  const demoTokenPurchase = async (amountInMatic: string): Promise<{
    hash: string;
    tokensReceived: string;
    cost: string;
  }> => {
    // Simulate transaction delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const cost = parseFloat(amountInMatic);
    const tokensReceived = (cost / 0.001).toFixed(4); // 1 MATIC = 1000 VIAZ

    return {
      hash: `0x${Math.random().toString(16).substr(2, 64)}`, // Demo transaction hash
      tokensReceived,
      cost: amountInMatic,
    };
  };

  return {
    ...state,
    connectWallet,
    disconnectWallet,
    switchToPolygonMumbai,
    demoTokenPurchase,
  };
};