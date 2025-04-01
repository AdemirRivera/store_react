import { useQuery } from "@tanstack/react-query";
import { productActions } from "..";

interface Options {
  filterKey?: string;
}

export const useProducts = ({ filterKey }: Options) => {
  const {
    isPending,
    isError,
    error,
    data: products = [],
    isFetching,
  } = useQuery({
    queryKey: ["products", { filterKey }],
    queryFn: () => productActions.getProducts({ filterKey }),
    gcTime: 1000 * 60 * 60, // 1 hora
  });

  return {
    error,
    isError,
    isFetching,
    isPending,
    products,
  };
};
