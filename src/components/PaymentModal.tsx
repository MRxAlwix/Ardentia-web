import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Loader, CheckCircle, AlertCircle, Copy, ExternalLink } from 'lucide-react';
import { createPayment, getPaymentMethods, PaymentData } from '../api/payment';

interface PaymentModalProps {
  item: any;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ item, onClose }) => {
  const [playerName, setPlayerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [paymentData, setPaymentData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await getPaymentMethods();
        if (response.success && response.data) {
          setPaymentMethods(response.data.filter((method: any) => method.active));
        }
      } catch (error) {
        console.error('Failed to fetch payment methods:', error);
      }
    };

    fetchPaymentMethods();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const calculateTotal = () => {
    const selectedPayment = paymentMethods.find(method => method.code === selectedMethod);
    const fee = selectedPayment ? (selectedPayment.fee?.flat || 0) : 0;
    return item.price + fee;
  };

  const validateForm = () => {
    if (!playerName.trim()) {
      setErrorMessage('Nama player Minecraft wajib diisi');
      return false;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Email yang valid wajib diisi');
      return false;
    }
    if (!selectedMethod) {
      setErrorMessage('Pilih metode pembayaran');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setPaymentStatus('processing');
    setErrorMessage('');

    try {
      const paymentRequestData: PaymentData = {
        amount: calculateTotal(),
        method: selectedMethod,
        order_items: [
          {
            sku: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            product_url: window.location.href,
            image_url: '/ardentia-logo.png'
          }
        ],
        customer_name: playerName.trim(),
        customer_email: email.trim(),
        customer_phone: phone.trim() || '08123456789',
        callback_url: `${window.location.origin}/payment-callback`,
        return_url: `${window.location.origin}/payment-success`,
        expired_time: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
      };

      const response = await createPayment(paymentRequestData);

      if (response.success && response.data) {
        setPaymentData(response.data);
        setPaymentStatus('success');
        
        // Open payment page in new tab
        if (response.data.checkout_url) {
          window.open(response.data.checkout_url, '_blank');
        }
      } else {
        throw new Error(response.message || 'Payment creation failed');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      setErrorMessage(error.message || 'Terjadi kesalahan saat membuat pembayaran');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-700"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Checkout</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {paymentStatus === 'idle' && (
            <>
              {/* Item Details */}
              <div className="bg-gray-700/50 rounded-lg p-4 mb-6 border border-gray-600">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{item.name}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">{formatPrice(item.price)}</span>
                </div>
              </div>

              {/* Player Info */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nama Player Minecraft *
                  </label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Masukkan nama player Minecraft"
                    maxLength={16}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nomor HP (Opsional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="08123456789"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Metode Pembayaran *
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.code}
                      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedMethod === method.code
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment-method"
                          value={method.code}
                          checked={selectedMethod === method.code}
                          onChange={(e) => setSelectedMethod(e.target.value)}
                          className="text-orange-500"
                        />
                        <span className="text-white font-medium">{method.name}</span>
                      </div>
                      <span className="text-gray-400 text-sm">
                        +{formatPrice(method.fee?.flat || 0)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="bg-gray-700/50 rounded-lg p-4 mb-6 border border-gray-600">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Harga Item:</span>
                  <span className="text-white">{formatPrice(item.price)}</span>
                </div>
                {selectedMethod && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Biaya Admin:</span>
                    <span className="text-white">
                      {formatPrice(paymentMethods.find(m => m.code === selectedMethod)?.fee?.flat || 0)}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-600 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">Total:</span>
                    <span className="text-2xl font-bold text-orange-400">
                      {selectedMethod ? formatPrice(calculateTotal()) : formatPrice(item.price)}
                    </span>
                  </div>
                </div>
              </div>

              {errorMessage && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4 flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                  <span className="text-red-400 text-sm">{errorMessage}</span>
                </div>
              )}

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={isLoading || !playerName || !email || !selectedMethod}
                className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    <span>Bayar Sekarang</span>
                  </>
                )}
              </button>
            </>
          )}

          {paymentStatus === 'processing' && (
            <div className="text-center py-8">
              <Loader className="h-12 w-12 animate-spin text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Memproses Pembayaran...</h3>
              <p className="text-gray-400">Mohon tunggu sebentar</p>
            </div>
          )}

          {paymentStatus === 'success' && paymentData && (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Pembayaran Dibuat!</h3>
              <p className="text-gray-400 mb-4">
                Silakan lanjutkan pembayaran di tab yang baru dibuka atau gunakan informasi di bawah
              </p>
              
              {paymentData.pay_code && (
                <div className="bg-gray-700/50 rounded-lg p-4 mb-4 border border-gray-600">
                  <p className="text-gray-300 text-sm mb-2">Kode Pembayaran:</p>
                  <div className="flex items-center justify-center space-x-2">
                    <code className="text-orange-400 font-mono text-lg">{paymentData.pay_code}</code>
                    <button
                      onClick={() => copyToClipboard(paymentData.pay_code)}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                {paymentData.checkout_url && (
                  <a
                    href={paymentData.checkout_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Buka Pembayaran</span>
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}

          {paymentStatus === 'error' && (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Pembayaran Gagal</h3>
              <p className="text-gray-400 mb-4">{errorMessage}</p>
              <button
                onClick={() => {
                  setPaymentStatus('idle');
                  setErrorMessage('');
                }}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal;