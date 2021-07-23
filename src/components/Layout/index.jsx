import './styles.scss'

import { Layout } from 'antd';
import { Switch } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import mappedRoutes from '../../routes';

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: 'inherit' }}>
      <Header />
      <Content className="container">
          <Switch>
            {mappedRoutes}
          </Switch>
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
