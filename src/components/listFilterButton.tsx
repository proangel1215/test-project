import { ListShowMode } from "@/types/product";
import { Button } from "./ui/button";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { toggleListShowMode } from "@/store/slices/productSlice";

export default function ListFilterButton({
  showMode,
}: {
  showMode: ListShowMode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const handleToggle = () => {
    dispatch(toggleListShowMode(showMode));
  };
  return (
    <Button onClick={handleToggle}>
      {showMode === "ALL" ? "All" : "Only favourites"}
    </Button>
  );
}
