"use client";
import { useTranslations } from "@/hooks/useTranslate";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const HeaderSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const t = useTranslations("header");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <div className="col header-contact-serarch-column d-none d-lg-block">
      <div className="header-contact-search">
        {/* WhatsApp contact instead of phone */}
        <div className="header-feature-item">
          <div className="header-feature-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-whatsapp"
            >
              <path d="M21 12.05c0-5.05-4.1-9.15-9.15-9.15-2.45 0-4.68.95-6.36 2.63A8.962 8.962 0 0 0 3 12.05c0 1.47.37 2.89 1.08 4.15L3 21l4.8-1.27c1.24.68 2.64 1.04 4.05 1.04 5.05 0 9.15-4.1 9.15-9.15z"></path>
              <path d="M16.25 13.25l-1.5-.5c-.4-.15-.85.03-1.1.35l-.5.7a7.958 7.958 0 0 1-3.1-3.1l.7-.5c.32-.25.5-.7.35-1.1l-.5-1.5a.889.889 0 0 0-1-.6c-1 .3-2.05 1.8-1.8 3.3a9.052 9.052 0 0 0 5.3 5.3c1.5.25 3-0.8 3.3-1.8.1-.4-.2-.8-.6-1z"></path>
            </svg>
          </div>
          <div className="header-feature-info">
            <h6>{t("phone")}</h6>
            <p>
              <a 
                href="https://wa.me/+9660566249353" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                966-0566-249-353
              </a>
            </p>
          </div>
        </div>

        {/* Search box */}
        <div className="header-search-2">
          <form onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              name="search" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={t("searchHere")} 
            />
            <button type="submit">
              <span>
                <i className="icon-search"></i>
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeaderSearch;