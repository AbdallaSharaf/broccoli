"use client";
import getNiceSelectValue from "@/libs/getNiceSelectValue";
import { useEffect } from "react";
import { useTranslations } from "@/hooks/useTranslate"; // assuming you're using this hook

const ShopShortSelect = ({ setArrangeInput }) => {
  const t = useTranslations("common");

  const selectInputs = [
    {
      value: "default",
      name: t("default sorting"),
    },
    {
      value: "popularity",
      name: t("sort by popularity"),
    },
    {
      value: "new",
      name: t("sort by new arrivals"),
    },
    {
      value: "price ascending",
      name: t("sort by price: low to high"),
    },
    {
      value: "price descending",
      name: t("sort by price: high to low"),
    },
  ];

  useEffect(() => {
    getNiceSelectValue(setArrangeInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="short-by text-center">
      <select className="nice-select">
        {selectInputs?.map(({ value, name }, idx) => (
          <option value={value} key={idx}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ShopShortSelect;
