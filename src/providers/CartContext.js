'use client';
import useSweetAlert from '@/hooks/useSweetAlert';
import addItemsToLocalstorage from '@/libs/addItemsToLocalstorage';
import { createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from './UserContext';
import { getGuestCart, getUserCart } from '@/libs/cartApi';
import { useTranslations } from '@/hooks/useTranslate';
import axiosInstance from '../libs/axiosInstance.js';
import { tiktokEvents } from '@/libs/tiktokPixel';

const cartContext = createContext(null);
const CartContextProvider = ({ children }) => {
  const { user } = useUserContext();
  const [cartStatus, setCartStatus] = useState(null);
  const [cartProducts, setCartProducts] = useState({ _id: '', items: [] });
  const [cartLoading, setCartLoading] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const creteAlert = useSweetAlert();
  const t = useTranslations('common');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setCartLoading(true);

        if (user) {
          const token = localStorage.getItem('token');
          const userCart = await getUserCart(token);

          if (userCart && userCart.items) {
            setCartProducts(userCart);
            setCartTotal(userCart.totalPrice);
          }
        } else {
          const guestId = localStorage.getItem('guest');
          if (guestId) {
            const guestCart = await getGuestCart(guestId);
            if (guestCart && guestCart.items) {
              setCartProducts(guestCart);
              setCartTotal(guestCart.totalPrice);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      } finally {
        setCartLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  // NEW: Update product quantity function
  const updateProductQuantity = async (productId, newQuantity) => {
    try {
      if (newQuantity < 1 || newQuantity > 999) return;

      // Optimistic update: update local state immediately
      const updatedCartProducts = {
        ...cartProducts,
        items: cartProducts.items.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        ),
      };

      setCartProducts(updatedCartProducts);

      // Calculate new total (optional - you might want to recalculate)
      const newTotal = updatedCartProducts.items.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0);
      setCartTotal(newTotal);

      // Send update to backend
      const token = localStorage.getItem('token');
      const guestId = localStorage.getItem('guest');

      const headers = {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(!token && guestId && { tempId: guestId }),
      };

      const body = {
        items: updatedCartProducts.items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
      };

      const { data } = await axiosInstance.post('/cart', JSON.stringify(body), {
        headers,
      });

      if (data.message === 'Success' && data.cart) {
        const { cart } = data;

        if (cart?.guest && !guestId) {
          localStorage.setItem('guest', cart.guest);
        }

        // Update with server response
        setCartProducts(cart);
        setCartTotal(cart.totalPrice);
        addItemsToLocalstorage('cart', cart);

        return { success: true, message: t('Quantity updated successfully') };
      } else {
        // Revert optimistic update on error
        setCartProducts(cartProducts);
        setCartTotal(cartTotal);

        return {
          success: false,
          message: data.message || t('Failed to update quantity'),
        };
      }
    } catch (error) {
      console.error('Update quantity error:', error);
      // Revert optimistic update on error
      setCartProducts(cartProducts);
      setCartTotal(cartTotal);

      return {
        success: false,
        message: t('An error occurred while updating quantity'),
      };
    }
  };

  const addProductToCart = async (
    currentProduct,
    isDecreament,
    isTotalQuantity
  ) => {
    try {
      setCartStatus('loading');

      const { _id: currentId, quantity: addedQuantity } = currentProduct;

      // FACEBOOK
      fbq('track', 'AddToCart', {
        content_name: currentProduct.name.ar,
        content_ids: [currentId],
        content_type: 'product',
        value: currentProduct.price,
        currency: 'SAR',
      });

      // SNAPCHAT
      snaptr('track', 'ADD_CART', {
        price: currentProduct.price,
        currency: 'SAR',
        item_ids: [currentId],
        number_items: addedQuantity,
      });

      // TIKTOK - Simple implementation like FB/Snapchat
      tiktokEvents.trackAddToCart(currentProduct, addedQuantity);

      const token = localStorage.getItem('token');
      const guestId = localStorage.getItem('guest');

      const existingItem = cartProducts?.items?.find(
        (item) => item.product._id === currentId
      );

      const currentQuantity = existingItem
        ? existingItem.quantity + addedQuantity
        : addedQuantity;

      const headers = {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(!token && guestId && { tempId: guestId }),
      };

      const body = {
        items: [
          {
            product: currentId,
            quantity: currentQuantity,
          },
        ],
      };

      const { data } = await axiosInstance.post('/cart', body, { headers });

      if (data.message === 'Success' && data.cart) {
        const { cart } = data;

        if (cart?.guest && !guestId) {
          localStorage.setItem('guest', cart.guest);
        }

        setCartProducts(cart);
        setCartTotal(cart.totalPrice);
        addItemsToLocalstorage('cart', cart);

        if (isTotalQuantity) {
          setCartStatus('updated');
        } else if (isDecreament) {
          setCartStatus('decreased');
        } else if (!existingItem) {
          setCartStatus('added');
        } else {
          setCartStatus('increased');
        }

        creteAlert('success', t('Success! Cart updated.'));
      } else {
        setCartStatus('error');
        creteAlert('error', data.message || t('Failed to update cart.'));
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      setCartStatus('error');
      creteAlert('error', `An error occurred: ${error}`);
    }
  };

  // Add this function to track checkout initiation
  const trackCheckoutInitiation = (cartItems) => {
    try {
      const totalAmount = cartItems.reduce((total, item) => {
        return total + item.quantity * item.product.price;
      }, 0);

      // TIKTOK InitiateCheckout
      tiktokEvents.trackInitiateCheckout(cartItems, totalAmount);

      // FACEBOOK InitiateCheckout (if you want consistency)
      if (window.fbq) {
        const contentIds = cartItems.map((item) => item.product._id);
        window.fbq('track', 'InitiateCheckout', {
          value: totalAmount,
          currency: 'SAR',
          content_ids: contentIds,
          content_type: 'product',
          num_items: cartItems.length,
        });
      }

      // SNAPCHAT (optional)
      if (window.snaptr) {
        window.snaptr('track', 'START_CHECKOUT', {
          price: totalAmount,
          currency: 'SAR',
          item_ids: cartItems.map((item) => item.product._id),
          number_items: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        });
      }

      console.log('Checkout initiated tracked for:', cartItems.length, 'items');
    } catch (error) {
      console.error('Error tracking checkout initiation:', error);
    }
  };

  const updateCart = async (cart) => {
    try {
      const token = localStorage.getItem('token');
      const guestId = localStorage.getItem('guest');

      const headers = {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(!token && guestId && { tempId: guestId }),
      };

      const body = JSON.stringify({
        items: cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
      });

      const { data } = await axiosInstance.post('/cart', body, { headers });

      if (data.message === 'Success' && data.cart) {
        const { cart } = data;

        if (cart?.guest && !guestId) {
          localStorage.setItem('guest', cart.guest);
        }

        setCartProducts(cart);
        setCartTotal(cart.totalPrice);
        creteAlert('success', t('Success! Cart updated.'));
      } else {
        creteAlert('error', data.message || t('Failed to update cart.'));
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      creteAlert('error', `An error occurred: ${error}`);
    }
  };

  const applyCoupon = async (coupon) => {
    try {
      const token = localStorage.getItem('token');
      const guestId = localStorage.getItem('guest');

      const headers = {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(!token && guestId && { tempId: guestId }),
      };

      const body = JSON.stringify({
        code: coupon,
      });

      const { data } = await axiosInstance.post('/cart/coupon', body, {
        headers,
      });

      if (data.message === 'Success' && data.cart) {
        const { cart } = data;

        if (cart?.guest && !guestId) {
          localStorage.setItem('guest', cart.guest);
        }

        setCartProducts(cart);
        setCartTotal(cart.totalPrice);
        return { success: true, message: t('Success! Coupon applied.') };
      } else {
        const errorMessage = data.error;

        if (
          errorMessage.startsWith(
            'You need to add more products to use this coupon'
          )
        ) {
          const match = errorMessage.match(/(\d+)\s+is remaining/);
          const remaining = match ? match[1] : 'X';

          return {
            success: false,
            message: t(
              'You need to add more products to use this coupon {x} is remaining',
              { x: remaining }
            ),
          };
        } else {
          return {
            success: false,
            message: t(errorMessage) || t('Failed to apply coupon'),
          };
        }
      }
    } catch (error) {
      console.error('Apply coupon error:', error);
      return {
        success: false,
        message:
          t('An error occurred while applying the coupon.') +
          ' ' +
          t(error?.response?.data?.error),
      };
    }
  };

  const deleteProductFromCart = async (currentId, currentTitle) => {
    try {
      const isGuest = !user;
      const token = localStorage.getItem('token');
      const guest = localStorage.getItem('guest');

      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(!token && guest && { tempId: guest }),
      };

      if (isGuest && !guest) return;

      const { data } = await axiosInstance.delete(
        `https://fruits-heaven-api.onrender.com/api/v1/cart/${currentId}`,
        {
          headers,
        }
      );

      if (data.message === 'Success') {
        let newCartProducts;

        if (data.cart) {
          newCartProducts = data.cart;
        } else {
          const updatedCartItems = cartProducts?.items?.filter(
            ({ product }) => product._id !== currentId
          );

          newCartProducts =
            updatedCartItems.length === 0
              ? { _id: '', items: [] }
              : { ...cartProducts, items: updatedCartItems };
        }

        setCartProducts(newCartProducts);
        setCartTotal(data.cart.totalPrice);
        addItemsToLocalstorage('cart', newCartProducts);

        creteAlert('success', t('Item successfully deleted from cart.'));
        setCartStatus('deleted');
      } else {
        creteAlert('error', t('Failed to delete item from cart.'));
      }
    } catch (error) {
      creteAlert('error', `An error occurred: ${error}`);
      console.error(error);
    }
  };

  return (
    <cartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProductToCart,
        deleteProductFromCart,
        cartStatus,
        updateCart,
        cartLoading,
        applyCoupon,
        cartTotal,
        updateProductQuantity, // Add the new function
        trackCheckoutInitiation,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
export const useCartContext = () => {
  const value = useContext(cartContext);
  return value;
};
export default CartContextProvider;
