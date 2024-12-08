import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldMeta, useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ZodValidator, zodValidator } from "@tanstack/zod-form-adapter";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "@/store/slices/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { ProductSchema, ProductSchemaType } from "@/types/product";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const { products } = useSelector((state: RootState) => state.products);
  const productData = products.find((product) => product.id === Number(id));
  if (!productData) return <div>No details</div>;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const form = useForm<ProductSchemaType, ZodValidator>({
    defaultValues: {
      id: productData.id,
      name: productData.name,
      imageUrl: productData.imageUrl,
    },
    validators: {
      onChange: ProductSchema,
    },
    validatorAdapter: zodValidator(),
    onSubmit: ({ value }) => console.log(value),
  });

  const handleSubmit = async () => {
    form.validateAllFields("submit");
    const newProduct = {
      id: productData.id,
      name: form.getFieldValue("name"),
      imageUrl: productData.imageUrl,
      isFav: false,
    };
    dispatch(updateProduct({ id: productData.id, newProduct }));
    navigate("/");
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Edit a product</CardTitle>
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
                {productData.imageUrl && (
                  <img
                    src={productData.imageUrl}
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
