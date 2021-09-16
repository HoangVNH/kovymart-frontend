import { Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { lazy } from "react";

const routes = [
  {
    key: uuidv4(),
    path: "/",
    component: lazy(() => import("features/homepage")),
  },
  {
    key: uuidv4(),
    path: `/product/:productId`,
    component: lazy(() => import("features/product/pages/ProductDetails")),
  },
  {
    key: uuidv4(),
    path: "/cart",
    component: lazy(() => import("features/cart/pages/Cart")),
  },
  {
    key: uuidv4(),
    path: "/order",
    component: lazy(() => import("features/order/pages")),
  },
  {
    key: uuidv4(),
    path: "/ordersuccess",
    component: lazy(() => import("features/order/pages/OrderSuccess")),
  },
  {
    key: uuidv4(),
    path: `/category/:categoryId`,
    component: lazy(() => import("features/category/pages")),
  },
];

const mappedRoutes = routes.map((route) => (
  <Route exact path={route.path} component={route.component} key={route.key} />
));

export default mappedRoutes;
