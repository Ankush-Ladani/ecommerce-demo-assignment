import Layout from "@/components/Layout";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import OrderCard from "@/components/orders/OrderCard";

type Props = {};

interface IOrder {
  orderId: string;
  createdOn: string;
  items: [
    {
      productId: string;
      boughtQuantity: number;
    }
  ];
  userAddress: {
    City: string;
    Country: string;
    ZipCode: string;
  };
  totalAmount: number;
}

const OrdersPage = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [limit, setLimit] = useState("10");
  const [selectedItems, SelectedItems] = useState<IOrder["orderId"][]>([]);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);

    try {
      let response = await fetch(
        `http://localhost:8888/orders/all?limit=${limit}`
      );
      let data = await response.json();
      //   console.log(data);
      setOrders(data);
    } catch (error) {
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  console.log(orders);

  const onLimitChange = (value: string) => {
    setLimit(value);
  };

  const onSelectOrder = (id: string) => {
    if (selectedItems.includes(id)) {
      SelectedItems((prev) => {
        return prev.filter((item) => item !== id);
      });
    } else {
      SelectedItems((prev) => {
        return [...prev, id];
      });
    }
  };

  const onDeleteOrder = async (id: string) => {
    setIsLoading(true);

    try {
      await fetch(`http://localhost:8888/orders/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      {isLoading && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center">
          <h1>Loading...</h1>
        </div>
      )}
      <div>
        <div className="flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-center">
          <h1>Orders</h1>

          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <Select value={limit} onValueChange={onLimitChange}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Items to Show" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem className="cursor-pointer" value={"5"}>
                    5
                  </SelectItem>

                  <SelectItem className="cursor-pointer" value={"10"}>
                    10
                  </SelectItem>

                  <SelectItem className="cursor-pointer" value={"25"}>
                    25
                  </SelectItem>

                  <SelectItem className="cursor-pointer" value={"50"}>
                    50
                  </SelectItem>

                  <SelectItem className="cursor-pointer" value={"75"}>
                    75
                  </SelectItem>

                  <SelectItem className="cursor-pointer" value={"100"}>
                    100
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedItems.length > 0 && (
          <div className="mt-6">
            <Button
              onClick={async () => {
                await selectedItems.forEach(
                  async (item) => await onDeleteOrder(item)
                );
                SelectedItems([]);
                await fetchOrders();
              }}
              className="mr-2 bg-red-500">
              Delete {selectedItems.length} Selected Items
            </Button>
          </div>
        )}

        <div className="grid gap-4 mt-6">
          {orders.map(({ orderId, totalAmount, createdOn, items }) => {
            return (
              <OrderCard
                key={orderId}
                createdOn={createdOn}
                orderId={orderId}
                boughtQuantity={items[0].boughtQuantity}
                totalAmount={totalAmount}
                onselect={onSelectOrder}
                onFetch={fetchOrders}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default OrdersPage;
