"use client";
import { useEffect } from "react";
import Header from "@/components/layout/headers/Header";
import HeaderContex from "@/providers/HeaderContex";
import CartContextProvider from "@/providers/CartContext";
import Footer from "@/components/layout/footers/Footer";
import FooterContexProvider from "@/providers/FooterContext";

import Preloader from "../others/Preloader";
import main from "@/libs/main";
import WishlistContextProvider from "@/providers/WshlistContext";
import ProductContextProvider from "@/providers/ProductContext";
import CategoryContextProvider from "@/providers/CategoryContext";
import UserContextProvider from "@/providers/UserContext";

const PageWrapper = ({
  children,
  headerStyle,
  headerSize,
  headerTopStyle,
  isNotHeaderTop,
  headerTopBg,
  isHeaderRight,
  isStickyOnMobile,
  isTextWhite,
  navBg,
  isNotHeaderRight,
  isHeaderSupport,
  isNavbarAppointmentBtn,
  isNotTransparent,
  footerBg,
  isCommingSoon,
}) => {
  useEffect(() => {
    main();
  }, []);
  return (
    <div className="body-wrapper">
      {isCommingSoon ? (
        children
      ) : (
        <CartContextProvider>
          <WishlistContextProvider>
            <HeaderContex
              value={{
                headerStyle,
                headerSize,
                headerTopStyle,
                isNotHeaderTop,
                headerTopBg,
                isTextWhite,
                isStickyOnMobile,
                navBg,
                isHeaderRight,
                isNotHeaderRight,
                isHeaderSupport,
                isNavbarAppointmentBtn,
                isNotTransparent,
              }}
              >
              <Header />
            </HeaderContex>

                <UserContextProvider>
            <ProductContextProvider>
              <CategoryContextProvider>
                {children}
              </CategoryContextProvider>

            </ProductContextProvider>
            </UserContextProvider>
          </WishlistContextProvider>

          <FooterContexProvider value={{ footerBg }}>
            <Footer />
          </FooterContexProvider>
        </CartContextProvider>
      )}

      <Preloader />
    </div>
  );
};

export default PageWrapper;
