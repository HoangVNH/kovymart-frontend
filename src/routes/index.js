import { Route } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import LoginPage from "../features/auth/pages/LoginPage";
import HomePage from "../features/homepage";
import ProductDetails from "features/product/pages/ProductDetails";
const routes = [
  {
    key: uuidv4(),
    path: '/login',
    component: LoginPage,
  },
  {
    key: uuidv4(),
    path: '/',
    component: HomePage,
  },
  {
    key: uuidv4(),
    path: `/product`,
    component: ProductDetails,
  }
  // {
  //   key: 1,
  //   path: '',
  //   component: '',
  // },
  // {
  //   key: 1,
  //   path: '',
  //   component: '',
  // },
  // {
  //   key: 1,
  //   path: '',
  //   component: '',
  // },
];

const mappedRoutes = routes.map((route) => {
  return <Route exact path={route.path} component={route.component} key={route.key} />
});

export default mappedRoutes;
