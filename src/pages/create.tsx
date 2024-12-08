import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldMeta, useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ZodValidator, zodValidator } from "@tanstack/zod-form-adapter";
import { useEffect, useState } from "react";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { addProduct } from "@/store/slices/productSlice";
import { useNavigate } from "react-router-dom";
import { ProductSchema, ProductSchemaType } from "@/types/product";


export default function CreateProductPage() {
  const [productImageUrl, setProductImageUrl] = useState<
    string | null | undefined
  >("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const form = useForm<ProductSchemaType, ZodValidator>({
    defaultValues: {
      id: Date.now(),
      name: "",
      imageUrl: "",
    },
    validators: {
      onChange: ProductSchema,
    },
    validatorAdapter: zodValidator(),
    onSubmit: ({ value }) => console.log(value),
  });

  const fetchProductImage = async () => {
    const response = await fetch("https://foodish-api.com/api/");
    const data = await response.json();
    setProductImageUrl(data?.image);
    form.setFieldValue("imageUrl", data.image);
  };

  useEffect(() => {
    fetchProductImage();
  }, []);

  const handleSubmit = async () => {
    form.validateAllFields("submit");
    const newProduct = {
      id: form.getFieldValue("id"),
      name: form.getFieldValue("name"),
      imageUrl: form.getFieldValue("imageUrl"),
      isFav: false,
    };
    dispatch(addProduct(newProduct));
    navigate("/");
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Create a product</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <form.Field
            name="imageUrl"
            children={(field) => (
              <div>
                <Label htmlFor="imageUrl">Image</Label>
                {productImageUrl && (
                  <img
                    src={productImageUrl}
                    className="h-[150px] w-full object-cover"
                  />
                )}
                <FieldInfo fieldMeta={field.state.meta} />
              </div>
            )}
          />
          <form.Field
            name="name"
            children={(field) => (
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo fieldMeta={field.state.meta} />
              </div>
            )}
          />
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleSubmit}>Save</Button>
      </CardFooter>
    </Card>
  );
}

function FieldInfo({ fieldMeta }: { fieldMeta: FieldMeta | undefined }) {
  if (!fieldMeta) return null;

  return (
    <>
      {fieldMeta.isTouched && fieldMeta.errors.length ? (
        <p className="text-destructive text-sm mt-1">
          {fieldMeta.errors.join(",")}
        </p>
      ) : null}
      {fieldMeta.isValidating ? "Validating..." : null}
    </>
  );
}
