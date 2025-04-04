"use client";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import ButtonSecondary from "@/components/shared/buttons/ButtonSecondary";
import Nodata from "@/components/shared/no-data/Nodata";
import countDiscount from "@/libs/countDiscount";
import countTotalPrice from "@/libs/countTotalPrice";
import modifyAmount from "@/libs/modifyAmount";

import { useCartContext } from "@/providers/CartContext";
import Image from "next/image";
import Link from "next/link";

const HeaderCart = () => {
  const { cartProducts, deleteProductFromCart } = useCartContext();
  if (!cartProducts.items) return
  return (
    <div
      id="ltn__utilize-cart-menu"
      className="ltn__utilize ltn__utilize-cart-menu"
    >
      <div className="ltn__utilize-menu-inner ltn__scrollbar">
        <div className="ltn__utilize-menu-head">
          <span className="ltn__utilize-menu-title">Cart</span>
          <button className="ltn__utilize-close">×</button>
        </div>
        <div className="mini-cart-product-area ltn__scrollbar">
            {cartProducts?.items?.map(
              ({ product, quantity, price }, idx) => {
                const { _id, name, images } = product
                return (
                  <div key={idx} className="mini-cart-item clearfix">
                    <div className="mini-cart-img">
                      <Link href={`/products/${_id}`}>
                        <Image
                          src={images?.[0] || "/img/product/1.png"}
                          alt="Image"
                          width={1000}
                          height={1000}
                        />
                      </Link>
                      <span
                        onClick={() => deleteProductFromCart(_id, name)}
                        className="mini-cart-item-delete"
                      >
                        <i className="icon-cancel"></i>
                      </span>
                    </div>
                    <div className="mini-cart-info">
                      <h6>
                        <Link href={`/products/${_id}`}>
                          {" "}
                          {(name?.["en"] ?? name?.["ar"] ?? "N/A")?.length > 22 ? (name?.["en"] ?? name?.["ar"] ?? "N/A")?.slice(0, 22) : (name?.["en"] ?? name?.["ar"] ?? "N/A")}
                        </Link>
                      </h6>
                      <span className="mini-cart-quantity">
                        {quantity} x ${modifyAmount(price)}
                      </span>
                    </div>
                  </div>
                );
              }
            )
          }
        </div>
        <div className="mini-cart-footer">
          <div className="mini-cart-sub-total">
            <h5>
              Subtotal: <span>${cartProducts?.totalPrice?.toFixed(2)}</span>
            </h5>
          </div>
          <div className="btn-wrapper">
            <ButtonPrimary text={"View Cart"} path={"/cart"} />
            <ButtonSecondary text={"Checkout"} path={"/checkout"} />
          </div>
          <p>Free Shipping on All Orders Over $100!</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderCart;
