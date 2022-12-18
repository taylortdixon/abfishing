import { GridFilterItem } from "@mui/x-data-grid";
import { createContext, useContext, useMemo, useState } from "react";

type FiltersContextType = {
  filters: GridFilterItem[];
  page: number;

  onPageChange: (newPage: number) => void;
  setFilters: (newFilters: GridFilterItem[]) => void;
};

export const FiltersContext = createContext<FiltersContextType | undefined>(
  undefined
);

type FiltersContextProviderProps = {
  children?: React.ReactNode;
};

export const FiltersContextProvider: React.FC<FiltersContextProviderProps> = ({
  children,
}) => {
  const [page, onPageChange] = useState<number>(0);
  const [filters, setFilters] = useState<GridFilterItem[]>([]);

  const context = useMemo<FiltersContextType>(
    () => ({ page, filters, onPageChange, setFilters }),
    [page, filters]
  );

  return (
    <FiltersContext.Provider value={context}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error(
      "useFilterContext must be used within FilterContextProvider"
    );
  }

  return context;
};
