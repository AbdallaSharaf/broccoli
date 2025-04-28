"use client"
import { useTranslations } from "@/hooks/useTranslate";
import countTotalPrice from "@/libs/countTotalPrice";
import getTranslatedName from "@/libs/getTranslatedName";
import modifyAmount from "@/libs/modifyAmount";
import sliceText from "@/libs/sliceText";
import React from "react";

const OrderCheckoutProduct = ({ product }) => {
  const { name, totalPrice, quantity } = product ? product : {};
  const t = useTranslations("common");
  return (
    <tr>
      <td>
        {sliceText(getTranslatedName(name), 20)} <strong>× {quantity}</strong>
      </td>
      <td>{modifyAmount(totalPrice)} {t("SAR")}</td>
    </tr>
  );
};

export default OrderCheckoutProduct;
