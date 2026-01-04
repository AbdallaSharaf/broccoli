/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslate';
import { useCartContext } from '@/providers/CartContext';
import { useProductContext } from '@/providers/ProductContext';
import { useWishlistContext } from '@/providers/WshlistContext';
import getTranslatedName from '@/libs/getTranslatedName';
import sliceText from '@/libs/sliceText';

const CartProduct = ({ product, isWishlist }) => {
  const { product: productData, quantity: quantity1 = 1, price } = product;
  const { _id, name, imgCover, priceAfterDiscount, priceAfterExpiresAt } =
    productData;

  const updateTimeoutRef = useRef(null);

  const {
    deleteProductFromCart,
    addProductToCart,
    updateProductQuantity,
    cartProducts,
  } = useCartContext();
  const { deleteProductFromWishlist } = useWishlistContext();
  const [quantity, setQuantity] = useState(Number(quantity1) ?? 1);
  const [isUpdating, setIsUpdating] = useState(false);
  const { setCurrentProduct } = useProductContext();
  const t = useTranslations('common');

  // Handle quantity change with debounce
  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > 999) return;

    // Optimistic UI update
    setQuantity(newQuantity);
    
    // Clear any existing timeout
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    
    // Set new timeout for API call
    updateTimeoutRef.current = setTimeout(async () => {
      try {
        setIsUpdating(true);
        const result = await updateProductQuantity(_id, newQuantity);
        if (!result.success) {
          // If API call fails, revert to original quantity
          const currentProduct = cartProducts?.items?.find(
            (item) => item.product._id === _id
          );
          setQuantity(currentProduct?.quantity || quantity1);
        }
      } catch (error) {
        console.error('Failed to update quantity:', error);
        // Revert on error
        const currentProduct = cartProducts?.items?.find(
          (item) => item.product._id === _id
        );
        setQuantity(currentProduct?.quantity || quantity1);
      } finally {
        setIsUpdating(false);
      }
    }, 500); // 500ms debounce
  };

  // Handle increment
  const handleIncrement = () => {
    if (isUpdating) return;
    handleQuantityChange(quantity + 1);
  };

  // Handle decrement
  const handleDecrement = () => {
    if (isUpdating) return;
    const newVal = quantity > 1 ? quantity - 1 : 1;
    handleQuantityChange(newVal);
  };

  // Handle direct input changes
  const handleInputChange = (e) => {
    if (isUpdating) return;
    const val = parseInt(e.target.value);
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

  // Update local quantity when product prop changes
  useEffect(() => {
    setQuantity(Number(quantity1) ?? 1);
  }, [quantity1]);

  return (
    <tr
      onMouseEnter={() =>
        isWishlist
          ? setCurrentProduct({ ...productData, quantity: 1 })
          : setCurrentProduct(product)
      }
      // className={isUpdating ? 'updating' : ''}
    >
      <td
        className="cart-product-remove"
        onClick={() =>
          isWishlist
            ? deleteProductFromWishlist(_id)
            : deleteProductFromCart(_id)
        }
        // style={isUpdating ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
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
          <div className="cart-plus-minus">
            <div
              className="dec qtybutton"
              onClick={handleDecrement}
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
              onClick={handleIncrement}
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
