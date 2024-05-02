import React, { useState } from "react";
import ProductModal from "./ProductModal";

interface Props {
  id: string;
  name: string;
  price: string;
  quantity: string;
  onFetch: Function;
}

const EditProduct: React.FC<Props> = ({
  id,
  name,
  price,
  quantity,
  onFetch,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onUpateProduct = async (
    nameInput: string,
    priceInput: string,
    quantityInput: string
  ) => {
    setLoading(true);
    // setOpen(false);
    try {
      let response = await fetch(`http://localhost:8888/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: nameInput,
          price: +priceInput,
          quantity: +quantityInput,
        }),
      });

      let data = await response.json();

      console.log(data);
      await onFetch();
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductModal
      buttonTItle="Edit Product"
      loading={loading}
      onSave={onUpateProduct}
      name={name}
      price={price}
      quantity={quantity}
      variant="secondary"
      isOpen={open}
      setOpen={setOpen}
    />
  );
};

export default EditProduct;
