import "./styles.scss";

import { Layout } from "antd";
import { Switch } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import mappedRoutes from "../../routes";
import { Suspense } from "react";

const { Content } = Layout;

const MainLayout = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Layout style={{ minHeight: "inherit", background: "#FFF" }}>
      <Header />
      <Content>
        <Switch>{mappedRoutes}</Switch>
      </Content>
      <Footer />
    </Layout>
  </Suspense>
);

export default MainLayout;
