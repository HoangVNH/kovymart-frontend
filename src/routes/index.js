import { Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import HomePage from "../features/homepage";

const routes = [
  {
    key: 1,
    path: '/login',
    component: LoginPage,
  },
  {
    key: 2,
    path: '/',
    component: HomePage,
  },
  {

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
