import React, { useState } from "react";
import ProductModal from "./ProductModal";

const CreateProduct: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const onCreate = async (nameInput: string, priceInput: string, quantityInput: string) => {
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
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return <ProductModal buttonTItle="Create Product" loading={loading} onSave={onCreate} />;
};

export default CreateProduct;
