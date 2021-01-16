import ProductList from "../../Product/ProductList.js";
import ProductEdit from "../../Product/ProductEdit.js";
import StoreEdit from "../../Store/StoreEdit.js";

export const DASHBOARD_ROUTES = [
  {
    path: "/products",
    component: ProductList,
  },
  {
    path: "/products/new",
    component: ProductEdit,
  },
  {
    path: "/store",
    component: StoreEdit,
  },
];
