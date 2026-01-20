import { NextRequest, NextResponse } from 'next/server';
import { getPaymentStatus } from '@/lib/mercadopago';
import { supabase } from '@/lib/supabase';

// Mercado Pago sends webhook notifications for payment events
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Log webhook for debugging
        console.log('Mercado Pago Webhook received:', JSON.stringify(body, null, 2));

        // Handle different notification types
        const { type, data } = body;

        if (type === 'payment') {
            const paymentId = data?.id;

            if (!paymentId) {
                return NextResponse.json({ success: false, error: 'No payment ID' }, { status: 400 });
            }

            // Get payment details from Mercado Pago
            const paymentInfo = await getPaymentStatus(paymentId.toString());

            if (!paymentInfo.success) {
                console.error('Failed to get payment status:', paymentInfo.error);
                return NextResponse.json({ success: false, error: paymentInfo.error }, { status: 500 });
            }

            const orderId = paymentInfo.externalReference;
            const paymentStatus = paymentInfo.status;

            // Map Mercado Pago status to our status
            let orderPaymentStatus = 'pending';
            let orderStatus = 'pending';

            switch (paymentStatus) {
                case 'approved':
                    orderPaymentStatus = 'approved';
                    orderStatus = 'confirmed'; // Order confirmed after payment
                    break;
                case 'pending':
                case 'in_process':
                    orderPaymentStatus = 'pending';
                    break;
                case 'rejected':
                case 'cancelled':
                    orderPaymentStatus = 'rejected';
                    orderStatus = 'cancelled';
                    break;
            }

            // Update order in database
            try {
                const { error } = await supabase
                    .from('orders')
                    .update({
                        payment_status: orderPaymentStatus,
                        status: orderStatus,
                        payment_id: paymentId.toString(),
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', orderId);

                if (error) {
                    console.error('Failed to update order:', error);
                }

                // If payment approved, add loyalty points
                if (paymentStatus === 'approved' && paymentInfo.transactionAmount) {
                    const pointsEarned = Math.floor(paymentInfo.transactionAmount / 10);

                    // This would be expanded to find/create customer and add points
                    console.log(`Order ${orderId} approved. Would add ${pointsEarned} points.`);
                }
            } catch (dbError) {
                console.log('Database update skipped (mock mode)');
            }

            console.log(`Payment ${paymentId} for order ${orderId}: ${paymentStatus}`);
        }

        // Mercado Pago expects a 200 response
        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Webhook Error:', error);
        // Still return 200 to prevent retries for parsing errors
        return NextResponse.json({ success: false, error: 'Webhook processing error' });
    }
}

// Mercado Pago may also send GET requests to verify endpoint
export async function GET() {
    return NextResponse.json({ status: 'Webhook endpoint active' });
}
