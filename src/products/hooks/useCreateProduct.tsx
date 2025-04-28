import { Product, productActions } from "..";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActions.createProduct,

    onMutate: (product) => {
      console.log("onMutate");

      const optimisticProduct = { id: Math.random(), ...product };

      // optimistically update the cache
      queryClient.setQueryData<Product[]>(["products", { filterKey: product.category }], (old) => {
        if (!old) return [optimisticProduct];

        return [...old, optimisticProduct];
      });
    },

    onSuccess: (product) => {
      // invalidar query por categoria
      // queryClient.invalidateQueries({ queryKey: ["products", product.category] });

      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: product.category }],

        (old) => {
          if (!old) return [product];

          return [...old, product];
        }
      );
    },
  });

  return mutation;
};
