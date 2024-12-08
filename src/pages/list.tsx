import ListFilterButton from "@/components/listFilterButton";
import ProductCard from "@/components/productCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppDispatch, RootState } from "@/store";
import { setPageNo } from "@/store/slices/productSlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, products, listShowMode, pageNo, perPage } = useSelector(
    (state: RootState) => state.products
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(setPageNo(0));
  }, [listShowMode]);

  const { filteredProducts, totalCount } = useMemo(() => {
    const _products =
      listShowMode === "ALL"
        ? products
        : products.filter((product) => product.isFav === true);
    return {
      filteredProducts: _products
        .filter((product) => product.name.indexOf(searchQuery) > -1)
        .slice(pageNo * perPage, (pageNo + 1) * perPage),
      totalCount: _products.length,
    };
  }, [listShowMode, pageNo, products, searchQuery]);

  const pageCount = Math.ceil(totalCount / perPage);

  const handleChangePageNo = (index: number) => {
    dispatch(setPageNo(index));
  };
  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div className="flex flex-col gap-1 w-full">
      <div className="w-full flex flex-row-reverse gap-2">
        <ListFilterButton showMode={listShowMode} />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[150px]"
          placeholder="Search"
        />
        <div className="w-full flex items-center gap-1">
          {Array.from({ length: pageCount }).map((_, index) => (
            <Button
              onClick={() => handleChangePageNo(index)}
              className={index !== pageNo ? "bg-transparent" : ""}
              key={index}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
      <div className=" grid grid-cols-3 gap-2 ">
        {filteredProducts.map((product, index) => (
          <ProductCard data={product} key={index} />
        ))}
      </div>
    </div>
  );
}
