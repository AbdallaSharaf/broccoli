// Simple TikTok tracking similar to your FB/Snapchat implementation
export const trackTikTokEvent = (eventName, eventData) => {
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.track(eventName, eventData);
  }
};

// Helper functions for specific events
export const tiktokEvents = {
  // Add to Cart
  trackAddToCart: (product, quantity = 1) => {
    trackTikTokEvent('AddToCart', {
      value: product.price * quantity,
      currency: 'SAR',
      contents: [
        {
          content_id: product._id || product.id,
          content_type: 'product',
          content_name: product.name?.ar || product.name,
          quantity: quantity,
          price: product.price,
        },
      ],
    });
  },

  // Initiate Checkout
  trackInitiateCheckout: (cartItems, totalAmount) => {
    const contents = cartItems.map((item) => ({
      content_id: item.product._id || item.product.id,
      content_type: 'product',
      content_name: item.product.name?.ar || item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    }));

    trackTikTokEvent('InitiateCheckout', {
      value: totalAmount,
      currency: 'SAR',
      contents: contents,
      num_items: cartItems.length,
    });
  },

  // Purchase
  trackPurchase: (orderData) => {
    const contents = orderData.items.map((item) => ({
      content_id: item.productId || item.product._id,
      content_type: 'product',
      content_name: item.product?.name?.ar || item.name,
      quantity: item.quantity || 1,
      price: item.price || item.product?.price,
    }));

    trackTikTokEvent('Purchase', {
      value: orderData.totalPrice || orderData.total,
      currency: 'SAR',
      contents: contents,
      order_id: orderData.invoiceId || orderData.orderId,
      num_items: orderData.totalQuantity || orderData.items.length,
    });
  },
};
