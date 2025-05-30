"use client";

import ServiceSidebar from "@/components/shared/sidebars/ServiceSidebar";
import getAllPortfolios from "@/libs/getAllPortfolios";
import getAllTestimonials from "@/libs/getAllTestimonials";
import Image from "next/image";
import { useParams } from "next/navigation";
import TestimonialCard from "@/components/shared/cards/TestimonialCard";
import CommonContext from "@/providers/CommonContext";

const PortfolioDetailsPrimary = () => {
  const { id: currentId } = useParams();
  const currentPortfolio = getAllPortfolios()?.find(
    ({ id }) => id === parseInt(currentId)
  );
  const testimonials = getAllTestimonials()?.filter(
    ({ id }) => id > 0 && id < 3
  );
  const { imgLarge } = currentPortfolio ? currentPortfolio : {};
  return (
    <div className="ltn__page-details-area ltn__service-details-area mb-105">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="ltn__page-details-inner ltn__service-details-inner">
              <div className="ltn__blog-img">
                <Image src={imgLarge} alt="Image" width={800} height={520} />
              </div>
              <p>
                {" "}
                <span className="ltn__first-letter">L</span>orem ipsum dolor sit
                amet, consectetur adipisicing elit, sed do eiusmod tempor incidi
                dunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exerc itation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione.{" "}
              </p>
              <div className="row">
                {testimonials?.map((testimonial, idx) => (
                  <div key={idx} className="col-lg-6">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione.{" "}
              </p>
              <div className="row">
                <div className="col-lg-6">
                  <Image
                    src="/img/service/33.jpg"
                    alt="image"
                    width={600}
                    height={600}
                  />
                  <label>Image caption here.</label>
                </div>
                <div className="col-lg-6">
                  <Image
                    src="/img/service/34.jpg"
                    alt="image"
                    width={600}
                    height={600}
                  />
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione.{" "}
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident.
              </p>
              <div className="ltn__service-list-menu text-uppercase mt-50">
                <ul>
                  <li>
                    <i className="fas fa-car"></i> Front Brakes Repair{" "}
                    <span className="service-price">
                      $225.95 <span>Plus Parts</span>
                    </span>{" "}
                  </li>
                  <li>
                    <i className="fas fa-life-ring"></i> Rear Brakes Repair{" "}
                    <span className="service-price">
                      $225.95 <span>Plus Parts</span>
                    </span>{" "}
                  </li>
                  <li>
                    <i className="fas fa-cog"></i> Axle{" "}
                    <span className="service-price">
                      $225.95 <span>Plus Parts</span>
                    </span>{" "}
                  </li>
                  <li>
                    <i className="fas fa-car"></i> Starters / Alternators{" "}
                    <span className="service-price">
                      $225.95 <span>Plus Parts</span>
                    </span>{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <CommonContext value={{ isPortfolio: true }}>
              <ServiceSidebar />
            </CommonContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetailsPrimary;
