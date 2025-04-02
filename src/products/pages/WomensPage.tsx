import { ProductList, useProducts } from "..";

export const WomensPage = () => {
  const { isPending, products } = useProducts({
    filterKey: "women's clothing",
  });

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Productos para mujeres</h1>
      {isPending && <p>Cargando...</p>}

      <ProductList products={products} />
    </div>
  );
};
