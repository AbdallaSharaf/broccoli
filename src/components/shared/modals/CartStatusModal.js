"use client";
import Image from "next/image";
import Link from "next/link";
import { useCartContext } from "@/providers/CartContext";
import controlModal from "@/libs/controlModal";
import getTranslatedName from "@/libs/getTranslatedName";

const CartStatusModal = ({ product }) => {
  const { _id, name, images } = product;
  const { cartStatus } = useCartContext();
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
                        <Image src={images?.[0] || "/img/product/1.png"} alt="#" width={1000} height={1000} />
                      </div>
                      <div className="modal-product-info">
                        <h5 onClick={() => controlModal()}>
                          <Link href={`/products/${_id}`}>{getTranslatedName(name)}</Link>
                        </h5>
                        <p className="added-cart">
                          <i className="fa fa-check-circle"></i> Successfully{" "}
                          {cartStatus ? cartStatus : "added"}{" "}
                          {cartStatus === "increased" ||
                          cartStatus === "decreased"
                            ? "in"
                            : cartStatus === "deleted"
                            ? "from"
                            : "to"}{" "}
                          your Cart
                        </p>
                        <div
                          className="btn-wrapper"
                          onClick={() => controlModal()}
                        >
                          <Link
                            href="/cart"
                            className="theme-btn-1 btn btn-effect-1"
                          >
                            View Cart
                          </Link>{" "}
                          <Link
                            href="/checkout"
                            className="theme-btn-2 btn btn-effect-2"
                          >
                            Checkout
                          </Link>
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
    </div>
  );
};

export default CartStatusModal;
