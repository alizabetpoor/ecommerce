export interface FilterProps {
  handleCategorySelect: (category: CategorySelectType) => void;
  debouncedSearchInputHandler: any;
  handleRating: (rate: number) => void;
}

export interface CategorySelectType {
  value: string;
  label: string;
}
