/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslate';
import { useCartContext } from '@/providers/CartContext';
import { useProductContext } from '@/providers/ProductContext';
import { useWishlistContext } from '@/providers/WshlistContext';
import getTranslatedName from '@/libs/getTranslatedName';
import sliceText from '@/libs/sliceText';

const CartProduct = ({
  product,
  setUpdateProducts,
  updateProducts,
  isWishlist,
}) => {
  const { product: productData, quantity: quantity1 = 1, price } = product;
  const { _id, name, imgCover, priceAfterDiscount, priceAfterExpiresAt } =
    productData;

  // dom reference
  const inputRef = useRef(null);
  // debounce timer reference
  const updateTimeoutRef = useRef(null);

  // hooks
  const { deleteProductFromCart, addProductToCart, updateCart } =
    useCartContext();
  const { deleteProductFromWishlist } = useWishlistContext();
  const [quantity, setQuantity] = useState(Number(quantity1) ?? 1);
  const [isUpdating, setIsUpdating] = useState(false);
  const { setCurrentProduct } = useProductContext();
  const t = useTranslations('common');

  // Function to update cart in the background (debounced)
  const debouncedUpdateCart = useCallback(
    async (newQuantity) => {
      if (!isWishlist) {
        // Clear any pending timeout
        if (updateTimeoutRef.current) {
          clearTimeout(updateTimeoutRef.current);
        } // Set debounced update (500ms delay)
        updateTimeoutRef.current = setTimeout(async () => {
          setIsUpdating(true);

          try {
            // Use the newQuantity parameter directly
            const updatedProducts = updateProducts.map((item) =>
              _id === item?.product?._id
                ? { ...item, quantity: newQuantity }
                : item
            );

            // Call updateCart API
            await updateCart(updatedProducts);

            console.log('Cart updated successfully in background');
          } catch (error) {
            console.error('Failed to update cart:', error);
            // On error, revert to the quantity from server
            // You might want to trigger a refetch or show an error
          } finally {
            setIsUpdating(false);
          }
        }, 500); // 300ms debounce delay
      }
    },
    [isWishlist, updateProducts, _id, updateCart]
  );

  // Handle immediate UI update and schedule background API call
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1 || newQuantity > 999) return;

    // Update local state immediately (optimistic update)
    setQuantity(newQuantity);

    // Update parent component state immediately
    const updatedProducts = updateProducts.map((item) =>
      _id === item?.product?._id ? { ...item, quantity: newQuantity } : item
    );
    setUpdateProducts(updatedProducts);
    // Schedule background API update
    debouncedUpdateCart(newQuantity);
  };

  useEffect(() => {
    if (!isWishlist) {
      const inputParent = inputRef.current;
      if (!inputParent) return;

      const input = inputParent.querySelector('input');
      const increament = inputParent.querySelector('.inc');
      const decreament = inputParent.querySelector('.dec');

      input.value = quantity;

      const handleInc = () => {
        if (isUpdating) return;
        const newVal = quantity + 1;
        input.value = newVal;
        handleQuantityChange(newVal);
      };

      const handleDec = () => {
        if (isUpdating) return;
        const newVal = quantity > 1 ? quantity - 1 : 1;
        input.value = newVal;
        handleQuantityChange(newVal);
      };

      increament?.addEventListener('click', handleInc);
      decreament?.addEventListener('click', handleDec);

      return () => {
        increament?.removeEventListener('click', handleInc);
        decreament?.removeEventListener('click', handleDec);
        // REMOVE THIS: Don't clear timeout here
        // if (updateTimeoutRef.current) {
        //   clearTimeout(updateTimeoutRef.current);
        // }
      };
    }
  }, [isWishlist, quantity, isUpdating]);

  // Handle direct input changes
  const handleInputChange = (e) => {
    if (isUpdating) return;
    const val = parseInt(e.target.value);

    // Check if it's a number and greater than 0
    if (!isNaN(val) && val > 0 && val <= 999) {
      handleQuantityChange(val);
    }
  };
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  return (
    <tr
      onMouseEnter={() =>
        isWishlist
          ? setCurrentProduct({ ...productData, quantity: 1 })
          : setCurrentProduct(product)
      }
      className={isUpdating ? 'updating' : ''}
    >
      <td
        className="cart-product-remove"
        onClick={() =>
          isWishlist
            ? deleteProductFromWishlist(_id)
            : deleteProductFromCart(_id)
        }
        style={isUpdating ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
      >
        x
      </td>
      <td className="cart-product-image">
        <Link href={`/products/${_id}`}>
          <Image
            src={imgCover || '/img/product/1.png'}
            alt="#"
            height={1000}
            width={1000}
          />
        </Link>
      </td>
      <td className="cart-product-info">
        <h4>
          <Link href={`/products/${_id}`}>
            {sliceText(getTranslatedName(name), 30)}
          </Link>
        </h4>
      </td>
      <td className="cart-product-price">
        <span>
          {Number(
            (priceAfterDiscount &&
            !isNaN(Number(priceAfterDiscount)) &&
            Number(priceAfterDiscount) > 0 &&
            (!priceAfterExpiresAt || new Date(priceAfterExpiresAt) > new Date())
              ? Number(priceAfterDiscount)
              : price) * quantity
          ).toFixed(2)}{' '}
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1124.14 1256.39"
            width="16"
            height="16"
          >
            <path
              fill="#231f20"
              d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"
            />
            <path
              fill="#231f20"
              d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"
            />
          </svg>
        </span>

        {priceAfterDiscount &&
          !isNaN(Number(priceAfterDiscount)) &&
          Number(priceAfterDiscount) > 0 &&
          Number(priceAfterDiscount) !== price &&
          (!priceAfterExpiresAt ||
            new Date(priceAfterExpiresAt) > new Date()) && (
            <del>
              {(price * quantity).toFixed(2)}{' '}
              <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1124.14 1256.39"
                width="16"
                height="16"
              >
                <path
                  fill="#231f20"
                  d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"
                />
                <path
                  fill="#231f20"
                  d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"
                />
              </svg>
            </del>
          )}
      </td>

      {isWishlist ? (
        <td className="cart-product-stock">{t('In Stock')}</td>
      ) : (
        <td className="cart-product-quantity">
          <div className="cart-plus-minus" ref={inputRef}>
            <div
              className="dec qtybutton"
              style={isUpdating ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
              -
            </div>
            <input
              value={quantity}
              type="text"
              name="qtybutton"
              className="cart-plus-minus-box"
              onChange={handleInputChange}
              disabled={isUpdating}
              style={isUpdating ? { backgroundColor: '#f9f9f9' } : {}}
            />
            <div
              className="inc qtybutton"
              style={isUpdating ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
              +
            </div>
          </div>
          {isUpdating && (
            <div style={{ fontSize: '11px', color: '#666', marginTop: '5px' }}>
              Syncing...
            </div>
          )}
        </td>
      )}

      {isWishlist ? (
        <td
          className="cart-product-add-cart"
          onClick={() => addProductToCart({ ...productData, quantity: 1 })}
        >
          <Link
            className="submit-button-1"
            href="#"
            title={t('addToCart')}
            data-bs-toggle="modal"
            data-bs-target="#add_to_cart_modal"
          >
            {t('addToCart')}
          </Link>
        </td>
      ) : (
        <td className="cart-product-subtotal">
          {Number(quantity * price).toFixed(2)}{' '}
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1124.14 1256.39"
            width="16"
            height="16"
          >
            <path
              fill="#231f20"
              d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"
            />
            <path
              fill="#231f20"
              d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"
            />
          </svg>{' '}
        </td>
      )}
    </tr>
  );
};

export default CartProduct;
