import Image from "next/image";
import { useTranslations } from "@/hooks/useTranslate";

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
      </div>
    </div>
  );
};

export default FooterNewsletter;
