import { useTranslations } from '@/hooks/useTranslate';
import React from 'react'

const TermsConditionsPrimary = () => {
    const t = useTranslations("termsConditions");
    
  return (
    <div className="container">
      <div className="row">
        <div className="about-us-info-wrap">
          <div className="section-title-area ltn__section-title-2">
            <h1 className="section-title">
              {t("title")}
            </h1>
          </div>
          
          <div className="terms-content">
            <p className="intro">{t("intro")}</p>
            
            <h3>{t("ordersHeading")}</h3>
            <ul>
              {[1, 2, 3, 4].map((item) => (
                <li key={item}>{t(`ordersPoint${item}`)}</li>
              ))}
            </ul>
            
            <h3>{t("deliveryHeading")}</h3>
            <ul>
              {[1, 2, 3, 4].map((item) => (
                <li key={item}>{t(`deliveryPoint${item}`)}</li>
              ))}
            </ul>
            
            <h3>{t("privacyHeading")}</h3>
            <ul>
              {[1, 2, 3].map((item) => (
                <li key={item}>{t(`privacyPoint${item}`)}</li>
              ))}
            </ul>
            
            <h3>{t("returnsHeading")}</h3>
            <ul>
              {[1, 2, 3].map((item) => (
                <li key={item}>{t(`returnsPoint${item}`)}</li>
              ))}
            </ul>
            
            <h3>{t("ownershipHeading")}</h3>
            <ul>
              {[1, 2].map((item) => (
                <li key={item}>{t(`ownershipPoint${item}`)}</li>
              ))}
            </ul>
            
            <h3>{t("illegalUseHeading")}</h3>
            <p>{t("illegalUseText")}</p>
            
            <h3>{t("modificationsHeading")}</h3>
            <ul>
              {[1, 2].map((item) => (
                <li key={item}>{t(`modificationsPoint${item}`)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsConditionsPrimary