"use client";
import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';
import getAllProducts from "@/libs/getAllProducts";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import SidebarTopRatedProducs from "@/components/shared/sidebars/widgets/SidebarTopRatedProducs";
import SidebarBanner from "@/components/shared/sidebars/widgets/SidebarBanner";
import { useProductContext } from "@/providers/ProductContext";
import ProductDetailsRight from "@/components/shared/products/ProductDetailsRight";
import { useCommonContext } from "@/providers/CommonContext";
import ProductDetailsTab from "@/components/shared/products/ProductDetailsTab";
import ProductDetailsTab2 from "@/components/shared/products/ProductDetailsTab2";

const ProductDetailsPrimary = () => {
  const { isNotSidebar, type } = useCommonContext();
  const { setCurrentProduct, product } = useProductContext();
  const thumbsSwiper = useRef(null);
  const mainSwiper = useRef(null);

  // Set up Swiper instance refs
  const setThumbsSwiper = (swiper) => {
    thumbsSwiper.current = swiper;
  };

  const setMainSwiper = (swiper) => {
    mainSwiper.current = swiper;
  };

  // Normalize imgCover to always be an array
  const getCoverImages = () => {
    if (!product?.imgCover) return [];
    return Array.isArray(product.imgCover) ? product.imgCover : [product.imgCover];
  };

  // Combine all images (cover + additional images)
  const getAllImages = () => {
    const coverImages = getCoverImages();
    const additionalImages = product?.images || [];
    return [...coverImages, ...additionalImages];
  };

  return (
    <div
      className={`ltn__shop-details-area ${
        type === 1 || type === 2 ? "pb-85" : "pb-120"
      }`}
      onMouseEnter={() => setCurrentProduct(product)}
    >
      <div className="container">
        <div className="row">
          <div className={`${isNotSidebar ? "" : "col-lg-8"} col-md-12`}>
            <div
              className={`ltn__shop-details-inner ${
                type === 1 || type === 2 ? "mb-60" : ""
              }`}
            >
              <div className="row">
                <div className={isNotSidebar ? "col-lg-6" : "col-md-6"}>
                  <div className="ltn__shop-details-img-gallery" dir="ltr">
                    {/* Main Image Swiper */}
                    <div className="ltn__shop-details-large-img" dir="ltr">
                      <Swiper
                        onSwiper={setMainSwiper}
                        modules={[EffectFade, Navigation, Thumbs]}
                        effect="fade"
                        spaceBetween={10}
                        thumbs={{ swiper: thumbsSwiper.current }}
                        className="main-swiper"
                      >
                        {getCoverImages().map((image, idx) => (
                          <SwiperSlide key={`cover-${idx}`}>
                            <div className="single-large-img">
                              <Link href={image} data-rel="lightcase:myCollection">
                                <Image
                                  src={image}
                                  alt={`${product?.title} cover image ${idx + 1}`}
                                  width={1000}
                                  height={1000}
                                  priority={idx === 0}
                                />
                              </Link>
                            </div>
                          </SwiperSlide>
                        ))}
                        {product?.images?.map((image, idx) => (
                          <SwiperSlide key={`image-${idx}`}>
                            <div className="single-large-img">
                              <Link href={image} data-rel="lightcase:myCollection">
                                <Image
                                  src={image}
                                  alt={`${product?.title} image ${idx + 1}`}
                                  width={1000}
                                  height={1000}
                                />
                              </Link>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>

                    {/* Thumbnail Swiper */}
                    {(getCoverImages().length > 0 || product?.images?.length > 0) && (
                      <div className="ltn__shop-details-small-img" dir="ltr">
                        <Swiper
                          onSwiper={setThumbsSwiper}
                          modules={[FreeMode, Navigation, Thumbs]}
                          spaceBetween={10}
                          slidesPerView={5}
                          freeMode={true}
                          watchSlidesProgress={true}
                          className="thumbnail-swiper"
                          breakpoints={{
                            992: { slidesPerView: 4 },
                            768: { slidesPerView: 3 },
                            580: { slidesPerView: 3 },
                          }}
                        >
                          {getCoverImages().map((image, idx) => (
                            <SwiperSlide key={`thumb-cover-${idx}`}>
                              <div className="single-small-img">
                                <Image
                                  src={image}
                                  alt={`Cover thumbnail ${idx + 1}`}
                                  width={200}
                                  height={200}
                                />
                              </div>
                            </SwiperSlide>
                          ))}
                          {product?.images?.map((image, idx) => (
                            <SwiperSlide key={`thumb-image-${idx}`}>
                              <div className="single-small-img">
                                <Image
                                  src={image}
                                  alt={`Thumbnail ${idx + 1}`}
                                  width={200}
                                  height={200}
                                />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    )}
                  </div>
                </div>
                <div className={isNotSidebar ? "col-lg-6" : "col-md-6"}>
                  <ProductDetailsRight product={product} />
                </div>
              </div>
            </div>
            {type === 1 || type === 2 ? <ProductDetailsTab product={product} /> : ""}
          </div>
          {!isNotSidebar && (
            <div className="col-lg-4">
              <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar">
                <SidebarTopRatedProducs />
                <SidebarBanner
                  image={"/img/banner/2.jpg"}
                  imgWidth={740}
                  imgHeight={440}
                />
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPrimary;