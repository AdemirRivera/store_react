import { Button, Image, Input, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCreateProduct } from "..";

interface FormInputs {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const NewProduct = () => {

  const productMutation = useCreateProduct()

  const [tempImage, setTempImage] = useState("");

  const { control, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      title: "Chaqueta",
      price: 10.99,
      description: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    },
  });

  const newImage = watch("image");

  useEffect(() => {
    setTempImage(newImage);
  }, [newImage]);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    productMutation.mutate(data);
  };

  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-around items-center">
          <div className="flex-col w-[500px]">
            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  type="text"
                  label="Titulo del producto"
                />
              )}
            />
            <Controller
              control={control}
              name="price"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value?.toString()}
                  onChange={(ev) => field.onChange(+ev.target.value)}
                  className="mt-2"
                  type="number"
                  label="Precio del producto"
                />
              )}
            />
            <Controller
              control={control}
              name="image"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  type="url"
                  label="Url de la imagen del producto"
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  label="Descripcion del producto"
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  value={field.value}
                  onChange={field.onChange}
                  className="rounded-md p-3 mt-2 bg-gray-800 w-full"
                >
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
              )}
            />

            <br />
            <Button
              className="mt-2"
              color="primary"
              type="submit"
              isDisabled={productMutation.isPending}
            >
              {productMutation.isPending ? "Cargando..." : "Crear producto"}
            </Button>
          </div>

          <div
            className="bg-white rounded-2xl p-10 flex items-center"
            style={{
              width: "500px",
              height: "600px",
            }}
          >
            <Image src={tempImage} />
          </div>
        </div>
      </form>
    </div>
  );
};
