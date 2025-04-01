import { ProductList, useProducts } from "..";

export const CompleteListPage = () => {
  const { isPending, products } = useProducts({});

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Todos los productos</h1>

      {isPending && <p>Cargando...</p>}

      <ProductList products={products} />
    </div>
  );
};
