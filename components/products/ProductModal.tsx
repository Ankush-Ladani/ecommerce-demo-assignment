import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
    loading: boolean;
    buttonTItle: string;
    name?: string;
    price?: string;
    quantity?: string;
    onSave: Function;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
}

const ProductModal: React.FC<Props> = ({ buttonTItle, loading, name, price, quantity, onSave, variant }) => {
    const [nameInput, setNameInput] = useState(name);
    const [priceInput, setPriceInput] = useState(price);
    const [quantityInput, setQuantityInput] = useState(quantity);

    const saveHandler = () => {
        onSave(nameInput, priceInput, quantityInput);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={variant || "default"}>{buttonTItle}</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription>
                        Make changes to your Product here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nameedit" className="text-right">
                            Name
                        </Label>

                        <Input
                            id="nameedit"
                            value={nameInput}
                            className="col-span-3"
                            onChange={(e) => setNameInput(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="priceedit" className="text-right">
                            Price
                        </Label>
                        <Input
                            id="priceedit"
                            value={priceInput}
                            className="col-span-3"
                            onChange={(e) => setPriceInput(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="qtyed" className="text-right">
                            Qty
                        </Label>

                        <Input
                            id="qtyed"
                            value={quantityInput}
                            className="col-span-3"
                            onChange={(e) => setQuantityInput(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button type="submit" onClick={saveHandler} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ProductModal;
