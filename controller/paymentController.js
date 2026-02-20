import handleAsyncError from "../middleware/handleAsyncError.js";
import { instance } from "../index.js";
import crypto from "crypto";
import HandleError from "../utils/handleError.js";
export const processPayment = handleAsyncError(async (req, res, next) => {
  if (process.env.RAZORPAY_API_KEY === 'your-api-key' || process.env.RAZORPAY_API_SECRET === 'your-api-secret') {
    return next(new HandleError("Razorpay API Keys are not configured. Please update config.env with valid keys.", 500));
  }

  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  res.status(200).json({
    success: true,
    order,
  });
});

//Send API Key
export const sendAPIKey = handleAsyncError(async (req, res, next) => {
  if (process.env.RAZORPAY_API_KEY === 'your-api-key' || !process.env.RAZORPAY_API_KEY) {
    return next(new HandleError("Razorpay API Key is not configured.", 500));
  }
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY,
  });
});

//Payment Verification
export const paymentVerification = handleAsyncError(async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");
  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      reference: razorpay_payment_id,
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "Payment verification failed",
    });
  }
});
