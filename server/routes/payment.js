import express from 'express';
import { phonepeClient } from '../config/phonepe.js';

const router = express.Router();

// POST /api/payment/initiate - Legacy endpoint for backward compatibility
router.post('/initiate', async (req, res) => {
  try {
    const { amount, merchantTransactionId, userId } = req.body;

    // Strict validation
    if (amount === undefined || amount === null || isNaN(Number(amount))) {
      return res.status(400).json({ success: false, message: 'Invalid or missing amount' });
    }
    if (!merchantTransactionId || typeof merchantTransactionId !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid or missing merchantTransactionId' });
    }

    // Use SDK client for payment initiation
    const response = await phonepeClient.pay({
      merchantTransactionId,
      merchantOrderId: merchantTransactionId, // ensure orderId present for SDK
      merchantUserId: userId || 'guest_user',
      amount: Math.round(Number(amount) * 100), // Convert to paise
      redirectUrl: undefined,
      callbackUrl: process.env.PHONEPE_WEBHOOK_URL,
      paymentInstrument: { type: 'PAY_PAGE' },
    });
    console.log('📦 PhonePe SDK pay() response:', response);

    // Use SDK-provided redirectUrl directly
    return res.json({
      success: true,
      orderId: response.orderId,
      state: response.state,
      expireAt: response.expireAt,
      redirectUrl: response.redirectUrl,
    });
  } catch (err) {
    console.error('❌ PhonePe initiate error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Payment initiation failed',
      error: err.message,
    });
  }
});

// GET /api/payment/status/:txnId - Legacy endpoint for backward compatibility
router.get('/status/:txnId', async (req, res) => {
  try {
    const { txnId } = req.params;
    const response = await phonepeClient.getOrderStatus(txnId);
    return res.json(response);
  } catch (err) {
    console.error('❌ PhonePe status error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Status check failed',
      error: err.message,
    });
  }
});

// POST /api/payment/webhook - Legacy endpoint for backward compatibility
router.post('/webhook', async (req, res) => {
  try {
    console.log('📬 PhonePe Webhook:', req.body);
    res.status(200).send('OK');
  } catch (err) {
    console.error('❌ Webhook error:', err.message);
    res.status(500).send('ERROR');
  }
});

export default router;
