// app/api/verify-payment/route.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { updateUserSubscription } from '../../../utils/firebaseOperations';

export async function POST(request) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      userId 
    } = await request.json();

    // Verify payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment is verified, update user subscription in Firebase
      try {
        await updateUserSubscription(userId, {
          plan: 'pro',
          status: 'active',
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          amount: 649, // INR
          currency: 'INR'
        });

        return NextResponse.json({
          success: true,
          message: 'Payment verified and subscription activated'
        });
      } catch (dbError) {
        console.error('Error updating subscription in database:', dbError);
        return NextResponse.json(
          { 
            success: false, 
            error: 'Payment verified but failed to update subscription' 
          },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Payment verification failed' 
        },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
