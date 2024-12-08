import { Product } from "@/types/product";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { deleteProduct, toggleLikeProduct } from "@/store/slices/productSlice";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ data }: { data: Product }) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleDelete = () => {
    dispatch(deleteProduct(data.id));
  };
  const handleToggleLike = () => {
    dispatch(toggleLikeProduct(data.id));
  };
  const handleEdit = () => {
    navigate(`/edit/${data.id}`);
  };
  const handleShowDetails = () => {
    navigate(`/product/${data.id}`);
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle
          className="overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"
          onClick={handleShowDetails}
        >
          <span className="hover:text-[#f00]">{data.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <img src={data.imageUrl} className="w-full h-28 object-cover"></img>
      </CardContent>
      <CardFooter className="flex justify-between w-fit flex-wrap gap-1">
        <Button
          className={`${
            data.isFav ? "bg-red-800" : "bg-transparent"
          } text-[#FFF]`}
          onClick={handleToggleLike}
        >
          Like
        </Button>
        <Button className="bg-transparent text-[#FFF]" onClick={handleEdit}>
          Edit
        </Button>
        <Button className="bg-transparent text-[#F00]" onClick={handleDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
