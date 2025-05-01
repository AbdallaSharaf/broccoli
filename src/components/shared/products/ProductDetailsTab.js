import React from "react";
import ProductDetailsReviews from "./ProductDetailsReviews";
import Link from "next/link";
import TabDescription from "./TabDescription";
import countCommentLength from "@/libs/countCommentLength";
import { useTranslations } from "@/hooks/useTranslate";

const ProductDetailsTab = ({ product }) => {
  const t = useTranslations("common");
  // variables
  const reviewsLength = countCommentLength(product?.reviews);
  return (
    <div className="ltn__shop-details-tab-inner ltn__shop-details-tab-inner-2">
      <div className="ltn__shop-details-tab-menu">
        <div className="nav">
          <Link
            className="active show"
            data-bs-toggle="tab"
            href="#liton_tab_details_1_1"
          >
            {t("description")}
          </Link>
          <Link data-bs-toggle="tab" href="#liton_tab_details_1_2" className="">
            {t("reviews")}
          </Link>
        </div>
      </div>
      <div className="tab-content">
        <div className="tab-pane fade active show" id="liton_tab_details_1_1">
          <TabDescription product={product}/>
        </div>
        {/* reviews */}
        <div className="tab-pane fade" id="liton_tab_details_1_2">
          <ProductDetailsReviews
            reviews={product?.reviews || []}
            reviewsLength={reviewsLength}
            productId={product?._id}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsTab;
