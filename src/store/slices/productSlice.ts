import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListShowMode, Product } from "@/types/product";

interface InitialState {
  isLoading: boolean;
  listShowMode: ListShowMode;
  pageNo: number;
  perPage: number;
  products: Array<Product>;
}

const initialState: InitialState = {
  isLoading: true,
  listShowMode: "ALL",
  pageNo: 0,
  perPage: 10,
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleListShowMode: (state, action: PayloadAction<ListShowMode>) => {
      state.listShowMode = action.payload === "ALL" ? "ONLY_FAV" : "ALL";
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    updateProduct: (
      state,
      action: PayloadAction<{ id: number; newProduct: Product }>
    ) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index > -1) {
        state.products[index] = {
          id: state.products[index].id,
          name: action.payload.newProduct.name,
          imageUrl: state.products[index].imageUrl,
          isFav: state.products[index].isFav,
        };
      }
    },
    toggleLikeProduct: (state, action: PayloadAction<number>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (index > -1) {
        state.products[index] = {
          ...state.products[index],
          isFav: state.products[index].isFav === true ? false : true,
        };
      }
    },
    setPageNo: (state, action: PayloadAction<number>) => {
      state.pageNo = action.payload;
    },
  },
});

export const {
  addProduct,
  updateProduct,
  toggleLikeProduct,
  toggleListShowMode,
  deleteProduct,
  setPageNo,
  setIsLoading,
} = productSlice.actions;
export default productSlice.reducer;
