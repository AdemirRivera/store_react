import { Product, productActions } from "..";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActions.createProduct,

    onMutate: (product) => {
      const optimisticProduct = { id: Math.random(), ...product };

      // optimistically update the cache
      queryClient.setQueryData<Product[]>(["products", { filterKey: product.category }], (old) => {
        if (!old) return [optimisticProduct];

        return [...old, optimisticProduct];
      });

      return {
        optimisticProduct,
      };
    },

    onSuccess: (product, _, context) => {
      // invalidar query por categoria
      // queryClient.invalidateQueries({ queryKey: ["products", product.category] });

      queryClient.removeQueries({ queryKey: ["products", context?.optimisticProduct.id] });

      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: product.category }],

        (old) => {
          if (!old) return [product];

          return old.map((cacheProduct) => {
            return cacheProduct.id === context?.optimisticProduct.id ? product : cacheProduct;
          });
        }
      );
    },

    onError: (_, variables, context) => {
      queryClient.removeQueries({ queryKey: ["products", context?.optimisticProduct.id] });

      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: variables.category }],

        (old) => {
          if (!old) return [];

          return old.filter((cacheProduct) => {
            return cacheProduct.id !== context?.optimisticProduct.id;
          });
        }
      );
    },
  });

  return mutation;
};
