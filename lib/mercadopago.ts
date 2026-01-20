import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

// ============================================
// MERCADO PAGO CONFIGURATION
// ============================================

const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;

if (!ACCESS_TOKEN) {
    console.warn('⚠️ MERCADOPAGO_ACCESS_TOKEN not configured. Payments will fail.');
}

// Initialize Mercado Pago client
export const mercadopago = new MercadoPagoConfig({
    accessToken: ACCESS_TOKEN || 'TEST-ACCESS-TOKEN',
});

// ============================================
// TYPES
// ============================================

export interface CheckoutItem {
    id: string;
    title: string;
    description?: string;
    quantity: number;
    unit_price: number;
    picture_url?: string;
}

export interface CreatePreferenceParams {
    items: CheckoutItem[];
    customerInfo: {
        name: string;
        email: string;
        phone?: string;
    };
    orderId: string;
    pickupMethod: 'local' | 'delivery';
    deliveryFee?: number;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function createPaymentPreference(params: CreatePreferenceParams) {
    const { items, customerInfo, orderId, pickupMethod, deliveryFee = 0 } = params;

    // Build items array for Mercado Pago
    const mpItems = items.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description || '',
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: 'UYU', // Uruguayan Peso
        picture_url: item.picture_url,
    }));

    // Add delivery fee if applicable
    if (pickupMethod === 'delivery' && deliveryFee > 0) {
        mpItems.push({
            id: 'delivery',
            title: 'Envío a domicilio',
            description: 'Delivery Punta del Este',
            quantity: 1,
            unit_price: deliveryFee,
            currency_id: 'UYU',
            picture_url: undefined,
        });
    }

    try {
        const preference = new Preference(mercadopago);

        const response = await preference.create({
            body: {
                items: mpItems,
                payer: {
                    name: customerInfo.name,
                    email: customerInfo.email,
                    phone: customerInfo.phone ? {
                        number: customerInfo.phone,
                    } : undefined,
                },
                back_urls: {
                    success: `${APP_URL}/checkout/success?order=${orderId}`,
                    failure: `${APP_URL}/checkout/failure?order=${orderId}`,
                    pending: `${APP_URL}/checkout/success?order=${orderId}&status=pending`,
                },
                auto_return: 'approved',
                external_reference: orderId,
                statement_descriptor: 'LA NUEVA BRASIL',
                notification_url: `${APP_URL}/api/webhooks/mercadopago`,
                expires: true,
                expiration_date_from: new Date().toISOString(),
                expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
            },
        });

        return {
            success: true,
            preferenceId: response.id,
            initPoint: response.init_point, // Redirect URL for Checkout Pro
            sandboxInitPoint: response.sandbox_init_point, // For testing
        };
    } catch (error) {
        console.error('Error creating Mercado Pago preference:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error creating payment preference',
        };
    }
}

export async function getPaymentStatus(paymentId: string) {
    try {
        const payment = new Payment(mercadopago);
        const response = await payment.get({ id: paymentId });

        return {
            success: true,
            status: response.status,
            statusDetail: response.status_detail,
            externalReference: response.external_reference,
            transactionAmount: response.transaction_amount,
            dateApproved: response.date_approved,
        };
    } catch (error) {
        console.error('Error getting payment status:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error getting payment status',
        };
    }
}
