import React from "react";
import { Card } from "../ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import EditProduct from "./EditProduct";

interface Props {
    id: string;
    name: string;
    price: string;
    quantity: string;
    onselect: (id: string) => void;
}

const ProductCard: React.FC<Props> = ({ name, price, quantity, onselect, id }) => {
    const onUpateProduct = async (id: string, name: string, price: string, quantity: string) => {
        try {
            let response = await fetch(`http://localhost:8888/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    price: +price,
                    quantity: +quantity,
                }),
            });

            let data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card className="p-4">
            <div className="flex justify-between">
                <div className="">
                    <h1 className="text-lg font-semibold">{name}</h1>
                    <p className="text-gray-500">Price: {price}</p>
                    <p className="text-gray-500">Quantity: {quantity}</p>
                </div>

                <div>
                    <Checkbox className="mr-2" onCheckedChange={() => onselect(id)} />
                </div>
            </div>

            <div>
                <div className="mt-4 flex gap-2">
                    <Button variant="default">Create Order</Button>

                    <EditProduct id={id} name={name} price={price} quantity={quantity} />
                </div>
            </div>
        </Card>
    );
};

export default ProductCard;
