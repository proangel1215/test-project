import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldMeta, useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ZodValidator } from "@tanstack/zod-form-adapter";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ProductSchemaType } from "@/types/product";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { products } = useSelector((state: RootState) => state.products);
  const productData = products.find((product) => product.id === Number(id));
  if (!productData) return <div>No details</div>;

  const form = useForm<ProductSchemaType, ZodValidator>({
    defaultValues: {
      id: productData.id,
      name: productData.name,
      imageUrl: productData.imageUrl,
    },
  });

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Product details</CardTitle>
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
            children={() => (
              <div>
                <Label htmlFor="imageUrl">Image</Label>
                {productData.imageUrl && (
                  <img
                    src={productData.imageUrl}
                    className="h-[150px] w-full object-cover"
                  />
                )}
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
                  disabled
                />
              </div>
            )}
          />
        </form>
      </CardContent>
    </Card>
  );
}