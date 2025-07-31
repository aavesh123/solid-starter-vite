import { useList } from "@refinedev/core";
import { TransformedCategory } from "../types/purplle";

type Category = TransformedCategory;

export const useCategories = () => {
  const { data, isLoading, error } = useList({
    resource: "categories",
    dataProviderName: "purplle",
  });

  const categories = data?.data || [];
  const loading = isLoading;
  const apiError = error ? error.message : null;

  return {
    categories,
    loading,
    error: apiError,
    rawData: data,
  };
}; 