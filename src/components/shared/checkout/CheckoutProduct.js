import countTotalPrice from "@/libs/countTotalPrice";
import modifyAmount from "@/libs/modifyAmount";
import sliceText from "@/libs/sliceText";
import React from "react";

const CheckoutProduct = ({ product }) => {
  const { product: productData, totalPrice, quantity } = product ? product : {};
  const { name } = productData ? productData : {};
  return (
    <tr>
      <td>
        {sliceText(name['en'] ?? name['ar'], 20)} <strong>× {quantity}</strong>
      </td>
      <td>${modifyAmount(totalPrice)}</td>
    </tr>
  );
};

export default CheckoutProduct;
