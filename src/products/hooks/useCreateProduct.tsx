import { productActions } from "..";
import { useMutation } from "@tanstack/react-query";

export const useCreateProduct = () => {
  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onSuccess: () => {
      console.log("Producto creado");
      },
      onSettled: () => {
        console.log("On settled");
    }
  });

  return mutation;
};
