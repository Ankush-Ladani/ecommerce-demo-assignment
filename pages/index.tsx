import Layout from "@/components/Layout";
import ProductCard from "@/components/products/ProductCard";
import { useCallback, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import CreateProduct from "@/components/products/CreateProduct";

export interface IProduct {
  id: string;
  name: string;
  price: string;
  quantity: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [limit, setLimit] = useState("10");
  const [sort, setSort] = useState("asc");
  const [selectedItems, SelectedItems] = useState<IProduct["id"][]>([]);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);

    try {
      let response = await fetch(
        `https://fastapi-ecommerce-api-bknc.onrender.com/products/all?limit=${limit}`
      );
      let data = await response.json();

      if (sort === "desc")
        data.data.sort((a: any, b: any) => b.price - a.price);
      else data.data.sort((a: any, b: any) => a.price - b.price);

      setProducts(data.data);
    } catch (error) {
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [sort, limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const onSelectProduct = (id: string) => {
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

  const onSortChange = (value: string) => {
    setSort(value);
  };

  const onLimitChange = (value: string) => {
    setLimit(value);
  };

  const onDeleteProduct = async (id: string) => {
    setIsLoading(true);

    try {
      let response = await fetch(
        `https://fastapi-ecommerce-api-bknc.onrender.com/products/${id}`,
        {
          method: "DELETE",
        }
      );

      // if (response.ok) {
      //   fetchProducts();
      // }
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
          <h1>Products</h1>

          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <CreateProduct onFetch={fetchProducts} />

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

            <Select onValueChange={onSortChange} value={sort}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem className="cursor-pointer" value="asc">
                    Price Low to High
                  </SelectItem>

                  <SelectItem className="cursor-pointer" value="desc">
                    Price High to Low
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
                if (selectedItems.length > 0) {
                  await selectedItems.forEach(async (item) => {
                    // console.log(item);
                    await onDeleteProduct(item);
                  });
                  await fetchProducts();
                  SelectedItems([]);
                }
              }}
              className="mr-2 bg-red-500">
              Delete {selectedItems.length} Selected Items
            </Button>
          </div>
        )}

        <div className="grid gap-4 mt-6">
          {products.map(({ id, name, price, quantity }) => {
            return (
              <ProductCard
                key={id}
                id={id}
                name={name}
                price={price}
                quantity={quantity}
                onselect={onSelectProduct}
                onFetch={fetchProducts}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
