import Image from "next/image";
import { useTranslations } from "@/hooks/useTranslate";
import Link from "next/link.js";

const FooterNewsletter = () => {
  const t = useTranslations("footer");

  return (
    <div className="col-xl-3 col-md-6 col-sm-12 col-12">
      <div className="footer-widget footer-newsletter-widget">
        <h4 className="footer-title">{t("We Accept")}</h4>
        <Image
          src="/img/icons/payment-4.png"
          width={370}
          height={42}
          alt="Payment Image"
        />
        <div className="footer-address">

        <ul className="ltn__social-media mt-20" style={{display: "flex", justifyContent: "space-evenly",width: "100%"}}>

           <li>
              <Link href="https://www.facebook.com/fruitsheaven.sa/" title="Facebook">
                <i className="fab fa-facebook-f"></i>
              </Link>
            </li>{" "}
            {/* <li>
              <Link href="https://x.com" title="Twitter">
                <i className="fab fa-twitter"></i>
              </Link>
            </li>{" "} */}
            <li>
              <Link href="https://instagram.com/fruitsheaven.sa" title="instagram">
                <i className="fab fa-instagram"></i>
              </Link>
            </li>{" "}
            <li>
              <Link href="https://www.snapchat.com/add/fruitsheaven.sa" title="snapchat">
                <i className="fab fa-snapchat"></i>
              </Link>
            </li>
        </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterNewsletter;
