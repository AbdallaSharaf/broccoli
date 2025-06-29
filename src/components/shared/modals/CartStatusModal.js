"use client";
import Image from "next/image";
import Link from "next/link";
import { useCartContext } from "@/providers/CartContext";
import controlModal from "@/libs/controlModal";
import getTranslatedName from "@/libs/getTranslatedName";
import { useTranslations } from "@/hooks/useTranslate";

const CartStatusModal = ({ product }) => {
  const { _id, name, imgCover } = product;
  const { cartStatus } = useCartContext();
  const t = useTranslations("common");

  // Status messages mapping
  const statusMessages = {
    loading: t("processing"),
    added: t("addedToCart"),
    increased: t("quantityIncreased"),
    decreased: t("quantityDecreased"),
    updated: t("cartUpdated"),
    error: t("errorOccurred"),
  };

  // Get the appropriate message based on cart status
  const getStatusMessage = () => {
    return statusMessages[cartStatus] || t("cartStatus");
  };

  // Get the appropriate icon based on status
  const getStatusIcon = () => {
    if (cartStatus === "loading") {
      return <i className="fas fa-spinner fa-spin ms-2"></i>;
    } else if (cartStatus === "error") {
      return <i className="fa fa-exclamation-circle ms-2"></i>;
    }
    return <i className="fa fa-check-circle ms-2"></i>;
  };

  return (
    <div className="ltn__modal-area ltn__add-to-cart-modal-area">
      <div className="modal fade" id="add_to_cart_modal" tabIndex="-1">
        <div className="modal-dialog modal-md" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="ltn__quick-view-modal-inner">
                <div className="modal-product-item">
                  <div className="row">
                    <div className="col-12">
                      <div className="modal-product-img">
                        <Image 
                          src={imgCover || "/img/product/1.png"} 
                          alt="#" 
                          width={1000} 
                          height={1000} 
                        />
                      </div>
                      <div className="modal-product-info">
                        <h5 onClick={() => controlModal()}>
                          <Link href={`/products/${_id}`}>
                            {getTranslatedName(name)}
                          </Link>
                        </h5>
                        <p className={`added-cart ${cartStatus === "loading" ? "text-info" : cartStatus === "error" ? "text-danger" : "text-success"}`}>
                          {getStatusIcon()} {getStatusMessage()}
                        </p>
                        {cartStatus !== "loading" && cartStatus !== "error" && (
                          <div className="btn-wrapper" onClick={() => controlModal()}>
                            <Link
                              href="/cart"
                              className="theme-btn-1 btn btn-effect-1"
                            >
                              {t("viewCart")}
                            </Link>
                            <Link
                              href="/checkout"
                              className="theme-btn-2 btn btn-effect-2"
                            >
                              {t("checkout")}
                            </Link>
                          </div>
                        )}
                        {cartStatus === "error" && (
                          <button
                            className="theme-btn-1 btn btn-effect-1"
                            data-bs-dismiss="modal"
                          >
                            {t("tryAgain")}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartStatusModal;