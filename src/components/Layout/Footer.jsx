import React from 'react';
import { Layout, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { 
  PhoneOutlined,
  MailOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined
} from '@ant-design/icons';

const { Footer } = Layout;

const categories = [
  {
    key: 'fruits',
    content: 'Rau - củ - trái cây',
    path: '/'
  },
  {
    key: 'fruits2',
    content: 'Gia vị - phụ gia',
    path: '/'
  },
  {
    key: 'fruit3',
    content: 'Hàng tươi sống',
    path: '/'
  }
]

const aboutUsItems = [
  {
    key: 'about-us-1',
    content: 'Giới thiệu về KovyMart',
    path: '/about-us'
  },
  {
    key: 'about-us-2',
    content: 'Quản lý chất lượng',
    path: '/about-us'
  },
  {
    key: 'about-us-3',
    content: 'Điều khoản và điều kiện giao dịch',
    path: '/about-us'
  },
  {
    key: 'about-us-4',
    content: 'Chính sách bảo mật và chia sẻ thông tin',
    path: '/about-us'
  },
]

const MainFooter = () => (
	<Footer className="main-footer-wrapper">
    <Row>
      <Col span={6}>
        <h4>KovyMart</h4>
        <ul>
          <li>
            <a href="tel:+123456789">
              <PhoneOutlined /> 123456789
            </a>
          </li>
          <li>
            <a href="mailto:cskh@kovymart.com">
              <MailOutlined /> cskh@kovymart.com
            </a>
          </li>
        </ul>
      </Col>
      <Col span={6}>
        <h4>Danh mục</h4>
        <ul>
          {
            categories.map(({ key, content, path}) => (
              <li key={`${key}`}>
                <Link
                  to={`${path}`}
                  className="link--normalize"
                >
                  {content}
                </Link>
              </li>
            ))
          }
        </ul>
      </Col>
      <Col span={6}>
        <h4>Về chúng tôi</h4>
        <ul>
        {
          aboutUsItems.map(({ key, content, path}) => (
            <li>
              <Link
                className="about-us__list-item link--normalize"
                key={`${key}`}
                to={`${path}`}
              >
                {content}
              </Link>
            </li>
          ))
        }
        </ul>
      </Col>
      <Col span={6}>
        <h4>Kết nối cùng chúng tôi</h4>
        <ul className="social-network-list">
          <li className="about-us__list-item">
            <a href="tel:+123456789">
              <FacebookOutlined 
                style={{
                  fontSize: '24px'
                }}
              /> 
            </a>
          </li>
          <li className="about-us__list-item">
            <a href="mailto:cskh@kovymart.com">
              <InstagramOutlined 
                style={{
                  fontSize: '24px'
                }}
              />
            </a>
          </li>
          <li className="about-us__list-item">
            <a href="mailto:cskh@kovymart.com">
              <YoutubeOutlined 
                style={{
                  fontSize: '24px'
                }}
              />
            </a>
          </li>
        </ul>
      </Col>
    </Row>
	</Footer>
);

export default MainFooter;
