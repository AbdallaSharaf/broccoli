import { useCommonContext } from "@/providers/CommonContext";
import React from "react";
import QuickSearchItems from "../../others/QuickSearchItems";
import { useTranslations } from "@/hooks/useTranslate"; // Assuming a translation hook

const SidebarSearch = () => {
  const {
    handleSearch,
    handleSearchString,
    startSearch,
    closeSearch,
    sidebar,
    setIsShowQuickSearchResult,
    searchedItems,
  } = useCommonContext();

  const t = useTranslations("common");  // Access translations for common terms

  return (
    <div className="widget ltn__search-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        {t("Search Objects")}
      </h4>
      <form style={{ position: "relative" }} onSubmit={(e) => handleSearch(e)}>
        <input
          type="text"
          name="search"
          placeholder={t("Search your keyword...")}
          onBlur={() => setIsShowQuickSearchResult(false)}
          onChange={(e) => handleSearchString(e)}
          onKeyDown={closeSearch}
          onKeyUp={startSearch}
          required
        />
        <button type="submit">
          <i className="fas fa-search"></i>
        </button>
        <QuickSearchItems />
      </form>
    </div>
  );
};

export default SidebarSearch;
