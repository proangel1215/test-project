import Typography from "./components/ui/typography";
import { Link, Route, Routes } from "react-router-dom";
import ListPage from "./pages/list";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import CreateProductPage from "./pages/create";
import ProductDetailsPage from "./pages/product";
import EditProductPage from "./pages/edit";
import { useEffect } from "react";
import { fetchProductImage } from "./utils";
import { addProduct, setIsLoading } from "./store/slices/productSlice";

const INITIAL_PRODUCTS_COUNT = 0;

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const addRandomProducts = async () => {
    for (let i = 0; i < INITIAL_PRODUCTS_COUNT; i++) {
      const imageUrl = await fetchProductImage();
      const newProduct = {
        id: Date.now(),
        name: "Hey",
        imageUrl: imageUrl,
        isFav: false,
      };
      dispatch(addProduct(newProduct));
    }
    dispatch(setIsLoading(false));
  };

  useEffect(() => {
    addRandomProducts();
  }, []);

  return (
    <div className="w-full h-full bg-background flex flex-col items-center gap-10">
      <div className="w-full h-fit flex flex-col justify-center align-middle items-center">
        <Typography
          variant={"h2"}
          className="my-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600"
        >
          Test project with simple product management
        </Typography>
        <div className="flex flex-row gap-2 ">
          <Link to={"/"} className="hover:underline">Products</Link>
          <Link to={"/create-product"} className="hover:underline">Create</Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/edit/:id" element={<EditProductPage />} />
      </Routes>
      {/* <SignUp /> */}
      {/* <ReactiveForm /> */}
      {/* <UserCard /> */}
    </div>
  );
}

export default App;
