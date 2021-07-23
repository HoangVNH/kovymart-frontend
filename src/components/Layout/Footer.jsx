import React from 'react';
import { Layout, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import CopyrightIcon from '../../assests/images/copyright-footer.svg';

const { Footer } = Layout;

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
		<div className="container">
			<Row className="upper-content">
				<Col className="left-content" >
					<h3>KovyMart</h3>
				</Col>
				<Col className="right-content" >
					<Row>
						<Col className="about-us" offset={5}>
							<h4 className="about-us__title">Về chúng tôi</h4>

							<ul className="about-us__list">
								{
									aboutUsItems.map(({ key, content, path}) => (
										<li className="about-us__list-item" key={`${key}`}>
											<Link to={`${path}`}>{content}</Link>
										</li>
									))
								}
							</ul>
						</Col>

						<Col className="contact" offset={4}>
							<h4 className="about-us__title">Liên hệ</h4>

							<ul>
								<li className="about-us__list-item">
									<a href="tel:+123456789">
										Mua Online: 123456789
									</a>
								</li>
								<li className="about-us__list-item">
									<a href="mailto:cskh@kovymart.com">
										Email: cskh@kovymart.com
									</a>
								</li>
							</ul>
						</Col>
					</Row>
				</Col>
			</Row>

			<Row className="below-content">
				<Col>
					<img src={CopyrightIcon} alt="copyright" />
				</Col>
				<Col>
					<span>icon 1 </span>
					<span>icon 2 </span>
					<span>icon 3</span>
				</Col>
			</Row>
		</div>
	</Footer>
);

export default MainFooter;
