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
                      <strong>{order.subTotal} {t("SAR")}</strong>
                    </td>
                  </tr>
                  {order.shippingFee && (
                    <tr>
                      <td><strong>{t("Shipping and Handling")}</strong></td>
                      <td><strong>{modifyAmount(order.shippingFee)} {t("SAR")}</strong></td>
                    </tr>
                  )}
                  <tr>
                    <td>
                      <strong>{t("Order Total")}</strong>
                    </td>
                    <td>
                      <strong>{order.totalPrice} {t("SAR")}</strong>
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