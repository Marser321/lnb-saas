import { NextRequest, NextResponse } from 'next/server';
import { createPaymentPreference } from '@/lib/mercadopago';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { items, customerInfo, pickupMethod, deliveryFee, discountCode, discountAmount } = body;

        // Validate required fields
        if (!items || items.length === 0) {
            return NextResponse.json({ success: false, error: 'No items in cart' }, { status: 400 });
        }

        if (!customerInfo?.name || !customerInfo?.email) {
            return NextResponse.json({ success: false, error: 'Missing customer info' }, { status: 400 });
        }

        // Calculate totals
        const subtotal = items.reduce((sum: number, item: any) => sum + (item.unit_price * item.quantity), 0);
        const total = subtotal - (discountAmount || 0) + (deliveryFee || 0);

        // Generate order number
        const orderNumber = `LNB-${Date.now().toString(36).toUpperCase()}`;

        // Try to save order to database (will use mock if Supabase not configured)
        let orderId = orderNumber;
        try {
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .insert({
                    order_number: orderNumber,
                    customer_name: customerInfo.name,
                    customer_email: customerInfo.email,
                    customer_phone: customerInfo.phone || null,
                    items: items,
                    subtotal: subtotal,
                    discount: discountAmount || 0,
                    total: total,
                    status: 'pending',
                    payment_status: 'pending',
                    pickup_method: pickupMethod,
                    notes: discountCode ? `Código: ${discountCode}` : null,
                })
                .select('id')
                .single();

            if (orderData) {
                orderId = orderData.id;
            }
        } catch (dbError) {
            console.log('Database not available, continuing with mock order ID');
        }

        // Create Mercado Pago preference
        const mpResult = await createPaymentPreference({
            items: items,
            customerInfo: {
                name: customerInfo.name,
                email: customerInfo.email,
                phone: customerInfo.phone,
            },
            orderId: orderId,
            pickupMethod: pickupMethod,
            deliveryFee: deliveryFee,
        });

        if (!mpResult.success) {
            return NextResponse.json({
                success: false,
                error: mpResult.error || 'Error creating payment preference',
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            orderId: orderId,
            orderNumber: orderNumber,
            preferenceId: mpResult.preferenceId,
            initPoint: mpResult.initPoint,
            sandboxInitPoint: mpResult.sandboxInitPoint,
        });

    } catch (error) {
        console.error('Checkout API Error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Internal server error',
        }, { status: 500 });
    }
}
