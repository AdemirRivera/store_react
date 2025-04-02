import { useQuery } from "@tanstack/react-query";
import { productActions } from "..";

interface Options {
  id: number;
}

export const useProduct = ({ id }: Options) => {
  const {
    isPending,
    isError,
    error,
    data: product,
    isFetching,
  } = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => productActions.getProductById(id),
    gcTime: 1000 * 60 * 60, // 1 hora
  });

  return {
    error,
    isError,
    isFetching,
    isPending,
    product,
  };
};
