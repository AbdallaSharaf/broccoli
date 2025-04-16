"use client";

import CartProduct from "@/components/shared/cart/CartProduct";
import Nodata from "@/components/shared/no-data/Nodata";
import { useWishlistContext } from "@/providers/WshlistContext";
import { useEffect, useState } from "react";
import { useTranslations } from "@/hooks/useTranslate"; // Import translation hook

const WishlistPrimary = () => {
  const { wishlistProducts } = useWishlistContext();
  const [isClient, setIsClient] = useState(false);
  const iswishlistProducts = wishlistProducts?.wishlist?.length ? true : false;
  const t = useTranslations("common"); // Use the translation hook for "common" keys

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="liton__wishlist-area mb-105">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="shoping-cart-inner">
              <div className="shoping-cart-table table-responsive">
                {isClient ? (
                  <table className="table">
                    <tbody>
                      {iswishlistProducts?.wishlist?.length === 0 ? (
                        <tr>
                          <td>
                            <Nodata text={t("Empty Wishlist!")} /> {/* Use the translation key here */}
                          </td>
                        </tr>
                      ) : (
                        wishlistProducts?.wishlist?.map((product, idx) => (
                          <CartProduct
                            key={idx}
                            product={{ product: product, price: product.price }}
                            isWishlist={true}
                          />
                        ))
                      )}
                    </tbody>
                  </table>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPrimary;
