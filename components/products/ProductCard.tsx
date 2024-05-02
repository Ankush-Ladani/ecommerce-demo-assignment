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
  onFetch: Function;
}

const ProductCard: React.FC<Props> = ({
  name,
  price,
  quantity,
  onselect,
  id,
  onFetch,
}) => {
  const onCreateOrder = async () => {
    const orderObj = {
      createdOn: new Date().toISOString(),
      items: [
        {
          productId: id,
          boughtQuantity: 1,
        },
      ],
      userAddress: {
        City: "ABC",
        Country: "India",
        ZipCode: "300192",
      },
      totalAmount: price,
    };

    try {
      const response = await fetch(
        "https://fastapi-ecommerce-api-bknc.onrender.com/orders/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderObj),
        }
      );

      console.log(response);
    } catch (error) {
      console.log("Error in creating order...");
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
          <Button onClick={onCreateOrder} variant="default">
            Create Order
          </Button>

          <EditProduct
            onFetch={onFetch}
            id={id}
            name={name}
            price={price}
            quantity={quantity}
          />
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
