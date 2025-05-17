"use client"
import OrderCheckoutProduct from '@/components/shared/checkout/OrderCheckoutProduct';
import { useTranslations } from '@/hooks/useTranslate';
import modifyAmount from '@/libs/modifyAmount';
import React from 'react'

const OrderPrimary = (orderObject) => {
    const t = useTranslations("common");
    const order = orderObject.order;
    return (
      <div className='container'>
        <div className="row">
          {/* Billing Address Column */}
          <div className="col-lg-6 order-lg-1 order-2">
            <div className="shoping-cart-total mt-50 mx-auto mb-50" style={{ float: "none" }}>
              <h4 className="title-2">{t("Billing Address")}</h4>
              <table className="table">
                <tbody>
                  <tr>
                    <td><strong>{t("Invoice")}</strong></td>
                    <td>{order?.invoiceId || "N/A"}</td>
                  </tr>
                  <tr>
                    <td><strong>{t("Name")}</strong></td>
                    <td>{order?.shippingAddress?.name || "N/A"}</td>
                  </tr>
                  <tr>
                    <td><strong>{t("Email")}</strong></td>
                    <td>{order?.shippingAddress?.email || "N/A"}</td>
                  </tr>
                  <tr>
                    <td><strong>{t("Phone")}</strong></td>
                    <td>{order?.shippingAddress?.phone || "N/A"}</td>
                  </tr>
                  <tr>
                    <td><strong>{t("Street")}</strong></td>
                    <td>{order?.shippingAddress?.street || "N/A"}</td>
                  </tr>
                  <tr>
                    <td><strong>{t("City")}</strong></td>
                    <td>{order?.shippingAddress?.city || "N/A"}</td>
                  </tr>
                  <tr>
                    <td><strong>{t("Country")}</strong></td>
                    <td>{order?.shippingAddress?.country || "N/A"}</td>
                  </tr>
                  <tr>
                    <td><strong>{t("Zip Code")}</strong></td>
                    <td>{order?.shippingAddress?.zipCode || "N/A"}</td>
                  </tr>
                  {order?.shippingAddress?.location && (
                    <tr>
                      <td><strong>{t("Location")}</strong></td>
                      <td>
                        <a href={order.shippingAddress.location} target="_blank" rel="noopener noreferrer">
                          {t("View on Map")}
                        </a>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cart Totals Column */}
          <div className="col-lg-6 order-lg-2 order-1">
            <div className="shoping-cart-total mt-50 mx-auto mb-50" style={{ float: "none" }}>
              <h4 className="title-2">{t("Cart Totals")}</h4>
              <table className="table">
                <tbody>
                  {order?.items?.map((product, idx) => (
                    <OrderCheckoutProduct key={idx} product={product} />
                  ))}
                  <tr>
                    <td>
                      <strong>{t("Order Subtotal")}</strong>
                    </td>
                    <td>
                      <strong>{order.subTotal} <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg></strong>
                    </td>
                  </tr>
                  {order.shippingFee > 0 && (
                  <tr>
                    <td><strong>{t("Shipping and Handling")}</strong></td>
                      <td><strong>{modifyAmount(order.shippingFee)} <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg></strong></td>
                  </tr>
                    )}
                  <tr>
                    <td>
                      <strong>{t("Order Total")}</strong>
                    </td>
                    <td>
                      <strong>{order.totalPrice} <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg></strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
}

export default OrderPrimary