import { AppPromotionBanner } from "../app-promotion-banner/app-promotion-banner";
import { FiltersContextProvider } from "../filters-context/filters-context";
import { MainMenuNav } from "../main-menu-nav/main-menu-nav";
import WarningModal from "../warning-modal/warning-modal";

export const AllProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <MainMenuNav />
      <AppPromotionBanner />
      <FiltersContextProvider>{children}</FiltersContextProvider>
      <WarningModal />
    </>
  );
};

export default AllProviders;
