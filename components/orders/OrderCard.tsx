import React from "react";
import { Card } from "../ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";

interface Props {
  orderId: string;
  totalAmount: number;
  boughtQuantity: number;
  onselect: (id: string) => void;
  onFetch: Function;
  createdOn: string;
}

const OrderCard: React.FC<Props> = ({
  onselect,
  orderId,
  onFetch,
  boughtQuantity,
  totalAmount,
  createdOn,
}) => {
  return (
    <Card className="p-4">
      <div className="flex justify-between">
        <div className="">
          <h1 className="text-lg font-semibold">{orderId}</h1>
          <p className="text-gray-500">Price: {totalAmount}</p>
          <p className="text-gray-500">Quantity: {boughtQuantity}</p>
        </div>

        <div>
          <Checkbox
            className="mr-2"
            onCheckedChange={() => onselect(orderId)}
          />
        </div>
      </div>
    </Card>
  );
};

export default OrderCard;
