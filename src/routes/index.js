import { Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import HomePage from "../features/homepage";
import ProductDetails from "features/product/pages/ProductDetails";
import Cart from "features/cart/pages/Cart";
import Category from "features/category/pages";
import Order from "features/order/pages";
import OrderSuccess from "features/order/pages/OrderSuccess";

const routes = [
  {
    key: uuidv4(),
    path: "/",
    component: HomePage,
  },
  {
    key: uuidv4(),
    path: `/product/:productId`,
    component: ProductDetails,
  },
  {
    key: uuidv4(),
    path: "/cart",
    component: Cart,
  },
  {
    key: uuidv4(),
    path: "/order",
    component: Order,
  },
  {
    key: uuidv4(),
    path: "/ordersuccess",
    component: OrderSuccess,
  },
  {
    key: uuidv4(),
    path: `/category/:categoryId`,
    component: Category,
  },
];

const mappedRoutes = routes.map((route) => (
  <Route exact path={route.path} component={route.component} key={route.key} />
));

export default mappedRoutes;
