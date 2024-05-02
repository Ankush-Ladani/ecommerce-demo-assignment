import React, { useState } from "react";
import ProductModal from "./ProductModal";

interface Props {
  onFetch: Function;
}

const CreateProduct: React.FC<Props> = ({ onFetch }) => {
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const onCreate = async (
    nameInput: string,
    priceInput: string,
    quantityInput: string
  ) => {
    setLoading(true);

    try {
      let response = await fetch(`http://localhost:8888/products/create`, {
        method: "POST",
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
      buttonTItle="Create Product"
      loading={loading}
      onSave={onCreate}
      isOpen={open}
      setOpen={setOpen}
    />
  );
};

export default CreateProduct;
