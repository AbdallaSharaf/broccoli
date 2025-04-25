"use client"
import { useTranslations } from '@/hooks/useTranslate';
import React from 'react'

const OrderPrimary = (order) => {
    const t = useTranslations("common");
  return (
    <div className="">
      <div className="shoping-cart-total mt-50">
        <h4 className="title-2">{t("Cart Totals")}</h4>
        <table className="table">
          <tbody>
            {order?.items?.map((product, idx) => (
              <CheckoutProduct key={idx} product={product} />
            ))}

            {order.shipping && (
              <tr>
                <td>{t("Shipping and Handling")}</td>
                <td>${modifyAmount(order.shipping)}</td>
              </tr>
            )}

            <tr>
              <td>
                <strong>{t("Order Total")}</strong>
              </td>
              <td>
                <strong>${order.totalPrice}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
  )
}

export default OrderPrimary