import axios from 'axios';

// Tripay configuration
const TRIPAY_API_KEY = import.meta.env.VITE_TRIPAY_API_KEY || 'your-tripay-api-key';
const TRIPAY_PRIVATE_KEY = import.meta.env.VITE_TRIPAY_PRIVATE_KEY || 'your-tripay-private-key';
const TRIPAY_MERCHANT_CODE = import.meta.env.VITE_TRIPAY_MERCHANT_CODE || 'your-merchant-code';
const TRIPAY_BASE_URL = import.meta.env.VITE_APP_ENV === 'production' 
  ? 'https://tripay.co.id/api' 
  : 'https://tripay.co.id/api-sandbox';

// Discord webhook configuration
const DISCORD_WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL || 'your-discord-webhook-url';

// Create payment signature
const createSignature = (merchantRef: string, amount: number): string => {
  try {
    // For browser environment, we'll need to handle this server-side
    // This is a placeholder - actual signature should be generated server-side
    const string = TRIPAY_MERCHANT_CODE + merchantRef + amount;
    return btoa(string); // Simple base64 encoding as placeholder
  } catch (error) {
    console.error('Error creating signature:', error);
    return '';
  }
};

export interface PaymentData {
  amount: number;
  method: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  order_items: Array<{
    sku: string;
    name: string;
    price: number;
    quantity: number;
    product_url?: string;
    image_url?: string;
  }>;
  callback_url?: string;
  return_url?: string;
  expired_time?: number;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  data?: {
    reference: string;
    merchant_ref: string;
    payment_method: string;
    payment_name: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    callback_url: string;
    return_url: string;
    amount: number;
    fee_merchant: number;
    fee_customer: number;
    total_fee: number;
    amount_received: number;
    pay_code: string;
    pay_url: string;
    checkout_url: string;
    status: string;
    expired_time: number;
    order_items: Array<any>;
    instructions: Array<{
      title: string;
      steps: string[];
    }>;
    qr_code?: string;
    qr_string?: string;
  };
}

// Create payment transaction
export const createPayment = async (paymentData: PaymentData): Promise<PaymentResponse> => {
  try {
    const merchantRef = 'ARD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    const signature = createSignature(merchantRef, paymentData.amount);

    const requestData = {
      method: paymentData.method,
      merchant_ref: merchantRef,
      amount: paymentData.amount,
      customer_name: paymentData.customer_name,
      customer_email: paymentData.customer_email,
      customer_phone: paymentData.customer_phone || '08123456789',
      order_items: paymentData.order_items,
      callback_url: paymentData.callback_url || `${window.location.origin}/payment-callback`,
      return_url: paymentData.return_url || `${window.location.origin}/payment-success`,
      expired_time: paymentData.expired_time || Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
      signature: signature
    };

    const response = await axios.post(`${TRIPAY_BASE_URL}/transaction/create`, requestData, {
      headers: {
        'Authorization': `Bearer ${TRIPAY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    if (response.data && response.data.success) {
      return {
        success: true,
        message: 'Payment created successfully',
        data: response.data.data
      };
    } else {
      throw new Error(response.data?.message || 'Payment creation failed');
    }
  } catch (error: any) {
    console.error('Error creating payment:', error);
    
    if (error.response) {
      return {
        success: false,
        message: error.response.data?.message || 'Server error occurred'
      };
    } else if (error.request) {
      return {
        success: false,
        message: 'Network error - please check your connection'
      };
    } else {
      return {
        success: false,
        message: error.message || 'An unexpected error occurred'
      };
    }
  }
};

// Handle payment callback
export const handlePaymentCallback = async (callbackData: any) => {
  try {
    // Verify callback signature
    const receivedSignature = callbackData.signature;
    const calculatedSignature = createSignature(callbackData.merchant_ref, callbackData.total_amount);
    
    if (receivedSignature !== calculatedSignature) {
      throw new Error('Invalid signature');
    }

    // Check payment status
    if (callbackData.status === 'PAID') {
      // Payment successful, send Discord notification
      await sendDiscordNotification({
        merchantRef: callbackData.merchant_ref,
        amount: callbackData.total_amount,
        customerName: callbackData.customer_name,
        customerEmail: callbackData.customer_email,
        paymentMethod: callbackData.payment_method,
        paidAt: callbackData.paid_at
      });

      // Here you would typically:
      // 1. Update your database
      // 2. Grant the purchased items to the player
      // 3. Send confirmation email
      
      return { success: true, message: 'Payment processed successfully' };
    }

    return { success: false, message: 'Payment not completed' };
  } catch (error) {
    console.error('Error handling payment callback:', error);
    throw error;
  }
};

// Send Discord notification
const sendDiscordNotification = async (paymentInfo: {
  merchantRef: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  paymentMethod: string;
  paidAt: number;
}) => {
  try {
    if (!DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL === 'your-discord-webhook-url') {
      console.warn('Discord webhook URL not configured');
      return;
    }

    const embed = {
      title: '💰 Pembayaran Berhasil!',
      color: 0x00ff00, // Green color
      fields: [
        {
          name: '🆔 Reference',
          value: paymentInfo.merchantRef,
          inline: true
        },
        {
          name: '💵 Amount',
          value: `Rp ${paymentInfo.amount.toLocaleString('id-ID')}`,
          inline: true
        },
        {
          name: '👤 Customer',
          value: paymentInfo.customerName,
          inline: true
        },
        {
          name: '📧 Email',
          value: paymentInfo.customerEmail,
          inline: true
        },
        {
          name: '💳 Payment Method',
          value: paymentInfo.paymentMethod,
          inline: true
        },
        {
          name: '⏰ Paid At',
          value: new Date(paymentInfo.paidAt * 1000).toLocaleString('id-ID'),
          inline: true
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'Ardentia Network Store',
        icon_url: `${window.location.origin}/ardentia-logo.png`
      },
      thumbnail: {
        url: `${window.location.origin}/ardentia-logo.png`
      }
    };

    await axios.post(DISCORD_WEBHOOK_URL, {
      embeds: [embed]
    }, {
      timeout: 10000
    });

    console.log('Discord notification sent successfully');
  } catch (error) {
    console.error('Error sending Discord notification:', error);
  }
};

// Get payment methods
export const getPaymentMethods = async () => {
  try {
    const response = await axios.get(`${TRIPAY_BASE_URL}/merchant/payment-channel`, {
      headers: {
        'Authorization': `Bearer ${TRIPAY_API_KEY}`
      },
      timeout: 15000
    });

    if (response.data && response.data.success) {
      return response.data;
    } else {
      throw new Error('Failed to fetch payment methods');
    }
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    
    // Return fallback payment methods
    return {
      success: true,
      data: [
        { code: 'DANA', name: 'DANA', fee: { flat: 2500 }, active: true },
        { code: 'OVO', name: 'OVO', fee: { flat: 2500 }, active: true },
        { code: 'GOPAY', name: 'GoPay', fee: { flat: 2500 }, active: true },
        { code: 'QRIS', name: 'QRIS', fee: { flat: 1000 }, active: true },
        { code: 'BRIVA', name: 'BRI Virtual Account', fee: { flat: 4000 }, active: true },
        { code: 'BNIVA', name: 'BNI Virtual Account', fee: { flat: 4000 }, active: true },
        { code: 'MANDIRIVA', name: 'Mandiri Virtual Account', fee: { flat: 4000 }, active: true },
      ]
    };
  }
};

// Check payment status
export const checkPaymentStatus = async (reference: string) => {
  try {
    const response = await axios.get(`${TRIPAY_BASE_URL}/transaction/detail`, {
      params: { reference },
      headers: {
        'Authorization': `Bearer ${TRIPAY_API_KEY}`
      },
      timeout: 15000
    });

    return response.data;
  } catch (error) {
    console.error('Error checking payment status:', error);
    throw error;
  }
};