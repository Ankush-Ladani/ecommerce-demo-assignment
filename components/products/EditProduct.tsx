import React, { useState } from "react";
import ProductModal from "./ProductModal";

interface Props {
    id: string;
    name: string;
    price: string;
    quantity: string;
}

const EditProduct: React.FC<Props> = ({ id, name, price, quantity }) => {
    const [loading, setLoading] = useState(false);

    const onUpateProduct = async (nameInput: string, priceInput: string, quantityInput: string) => {
        setLoading(true);

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
        />
    );
};

export default EditProduct;
