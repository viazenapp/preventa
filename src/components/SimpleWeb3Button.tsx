import React, { useState, useEffect } from 'react';
import { Wallet, ExternalLink, Loader, AlertCircle } from 'lucide-react';
import { useSimpleWeb3 } from '../hooks/useSimpleWeb3';

interface SimpleWeb3ButtonProps {
  className?: string;
  onSuccess?: (message: string) => void;
  onError?: (error: string) => void;
}

export const SimpleWeb3Button: React.FC<SimpleWeb3ButtonProps> = ({ 
  className = '', 
  onSuccess,
  onError 
}) => {
  const { 
    account, 
    isConnected, 
    chainId, 
    connectWallet, 
    disconnectWallet, 
    switchToPolygonMumbai, 
    demoTokenPurchase,
    isLoading, 
    error 
  } = useSimpleWeb3();
  
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseAmount, setPurchaseAmount] = useState('0.1');
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Show error when there's a Web3 error
  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  const handleConnect = async () => {
    try {
      await connectWallet();
      if (onSuccess) {
        onSuccess('Wallet connected successfully!');
      }
    } catch (error) {
      if (onError) {
        onError('Failed to connect wallet');
      }
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setShowPurchaseModal(false);
    if (onSuccess) {
      onSuccess('Wallet disconnected');
    }
  };

  const handlePurchase = async () => {
    if (!isConnected || chainId !== 80001) {
      if (onError) {
        onError('Please switch to Polygon Mumbai Testnet');
      }
      return;
    }

    setIsPurchasing(true);
    
    try {
      if (onSuccess) {
        onSuccess('Transaction started - confirm in your wallet');
      }
      
      const result = await demoTokenPurchase(purchaseAmount);
      
      if (onSuccess) {
        onSuccess(`Purchase successful! Received ${result.tokensReceived} VIAZ tokens`);
      }
      
      setShowPurchaseModal(false);
      setPurchaseAmount('0.1');
      
    } catch (error: any) {
      if (onError) {
        onError(error.message || 'Transaction failed');
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const getNetworkName = () => {
    switch (chainId) {
      case 80001:
        return 'Polygon Mumbai';
      case 1:
        return 'Ethereum Mainnet';
      case 137:
        return 'Polygon Mainnet';
      default:
        return `Chain ${chainId}`;
    }
  };

  if (!isConnected) {
    return (
      <button
        onClick={handleConnect}
        disabled={isLoading}
        className={`
          flex items-center space-x-2 px-4 py-2 
          bg-gradient-to-r from-purple-600 to-cyan-500 
          hover:from-purple-700 hover:to-cyan-600 
          text-white font-semibold rounded-lg 
          transition-all duration-200 
          disabled:opacity-50 disabled:cursor-not-allowed
          shadow-lg shadow-purple-500/30
          ${className}
        `}
      >
        {isLoading ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Wallet className="w-4 h-4" />
        )}
        <span className="hidden sm:inline">
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </span>
      </button>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        {/* Wallet Status */}
        <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-600/30">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-white font-medium hidden sm:inline">
            {formatAddress(account!)}
          </span>
          <span className="text-xs text-gray-400 hidden md:inline">
            {getNetworkName()}
          </span>
        </div>

        {/* Network Warning */}
        {chainId !== 80001 && (
          <button
            onClick={switchToPolygonMumbai}
            className="flex items-center space-x-1 px-2 py-1 bg-yellow-600/20 border border-yellow-500/30 rounded text-yellow-400 text-xs hover:bg-yellow-600/30 transition-colors"
          >
            <AlertCircle className="w-3 h-3" />
            <span className="hidden sm:inline">Wrong Network</span>
          </button>
        )}

        {/* Buy Tokens Button */}
        {chainId === 80001 && (
          <button
            onClick={() => setShowPurchaseModal(true)}
            className="px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold rounded-lg transition-all duration-200 text-sm"
          >
            Buy VIAZ
          </button>
        )}

        {/* Disconnect Button */}
        <button
          onClick={handleDisconnect}
          className="px-2 py-2 text-gray-400 hover:text-white transition-colors"
          title="Disconnect"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-600/50 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Buy VIAZ Tokens</h3>
            
            <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-400">Token Price:</div>
                <div className="text-white">0.001 MATIC</div>
                <div className="text-gray-400">Network:</div>
                <div className="text-white">Polygon Mumbai</div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Amount (MATIC)
              </label>
              <input
                type="number"
                step="0.001"
                min="0.001"
                max="10"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                placeholder="0.1"
              />
              <div className="text-xs text-gray-400 mt-1">
                ≈ {(parseFloat(purchaseAmount || '0') / 0.001).toFixed(0)} VIAZ tokens
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                disabled={isPurchasing}
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                disabled={isPurchasing || !purchaseAmount || parseFloat(purchaseAmount) < 0.001}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isPurchasing ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Purchasing...</span>
                  </>
                ) : (
                  <span>Buy Tokens</span>
                )}
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-400 text-center">
              This is a demo transaction on Polygon Mumbai testnet
            </div>
          </div>
        </div>
      )}
    </div>
  );
};