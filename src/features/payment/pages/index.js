import { Col, Row, Card, Typography, Select, Space, Input, Form, Divider } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './Payment.scss';
import ButtonUI from 'components/UIKit/ButtonUI';
import Utils from 'components/UIKit/Utils';
const { Text, Title } = Typography;
const { Option } = Select;
const Payment = () => {
	const provinces = [
		{ id: 1, name: 'Lâm Đồng' },
		{ id: 2, name: 'Đà Lạt' },
		{ id: 3, name: 'Bình Thuận' },
	];
	const districts = [
		{ id: 1, name: 'Đơn Dương' },
		{ id: 2, name: 'Bắc Hội' },
	];

	const wards = [
		{ id: 1, name: 'Giải phóng' },
		{ id: 2, name: 'Ka Đô' },
	];

	//handle dispatch location

	//handle search actions

	return (
		<Row type="flex" align="middle" justify="center" className="my-5">
			<Col lg={14} xs={22}>
				<Card className="card-shadow px-5">
					<Row>
						<Col span={24}>
							<Title level={4} style={{ color: '#e99667' }}>
								<Space>
									<ShoppingCartOutlined className="align-baseline" />
									Thông tin đơn hàng
								</Space>
							</Title>
						</Col>
					</Row>
					<Form className="mt-5" layout="vertical">
						{/* User information */}
						<Row gutter={20} type="flex">
							<Col xs={24} lg={12}>
								<Form.Item
									label="Họ tên người nhận"
									name="name"
									rules={[{ required: true, message: 'Bạn phải nhập thông tin này!' }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} lg={12}>
								<Form.Item
									label="Số điện thoại"
									name="phonenumber"
									rules={[{ required: true, message: 'Bạn phải nhập thông tin này!' }]}
								>
									<Input />
								</Form.Item>
							</Col>
						</Row>
						{/* Address information */}
						<Row gutter={20}>
							<Col xs={24} lg={12}>
								<Form.Item
									label="Tỉnh/thành phố"
									name="provinceId"
									rules={[{ required: true, message: 'Bạn phải nhập thông tin này!' }]}
								>
									<Select showSearch placeholder="Chọn tỉnh">
										{provinces.map((prov) => (
											<Option key={prov.id} value={JSON.stringify([prov.id, prov.name])}>
												{prov.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</Col>
							<Col xs={24} lg={12}>
								<Form.Item
									label="Quận/ huyện"
									name="districtId"
									rules={[{ required: true, message: 'Bạn phải nhập thông tin này!' }]}
								>
									<Select showSearch placeholder="Chọn tỉnh">
										{districts.map((prov) => (
											<Option key={prov.id} value={JSON.stringify([prov.id, prov.name])}>
												{prov.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</Col>
							<Col xs={24} lg={12}>
								<Form.Item
									label="Phường/ xã"
									name="wardId"
									rules={[{ required: true, message: 'Bạn phải nhập thông tin này!' }]}
								>
									<Select showSearch placeholder="Chọn tỉnh">
										{districts.map((prov) => (
											<Option key={prov.id} value={JSON.stringify([prov.id, prov.name])}>
												{prov.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</Col>
							<Col xs={24} lg={24}>
								<Form.Item
									label="Địa chỉ"
									name="address"
									rules={[{ required: true, message: 'Bạn phải nhập thông tin này!' }]}
								>
									<Input />
								</Form.Item>
							</Col>
						</Row>
						{/* Cash information */}
						<Row className="mt-5">
							<Space
								type="flex"
								align="middle"
								justify="center"
								direction="vertical"
								style={{ flex: '1' }}
								value={30}
							>
								<Row align="middle" justify="center">
									<Col xs={24} md={14}>
										<Text strong>Tạm tính:</Text>
									</Col>
									<Col xs={24} md={4} className="align-end">
										<Text strong>{Utils.Money({ money: 100000 })}</Text>
									</Col>
								</Row>
								<Row align="middle" justify="center">
									<Col xs={24} md={14}>
										<Text strong>Phí vận chuyển:</Text>
									</Col>
									<Col xs={24} md={4} className="align-end">
										<Text strong>{Utils.Money({ money: 20000 })}</Text>
									</Col>
								</Row>
								<Divider />
								<Row align="middle" justify="center">
									<Col xs={24} md={14}>
										<Text strong>Tổng tiền:</Text>
									</Col>
									<Col xs={24} md={4} className="align-end">
										<Text strong>{Utils.Money({ money: 170000 })}</Text>
									</Col>
								</Row>
							</Space>
						</Row>
						<Col style={{ textAlign: 'center', marginTop: '2em' }}>
							<Space className="mt-4" size={20}>
								<ButtonUI text="Quay lại" variant="secondary"></ButtonUI>
								<ButtonUI text="Xác nhận thanh toán"></ButtonUI>
							</Space>
						</Col>
					</Form>
				</Card>
			</Col>
		</Row>
	);
};

export default Payment;
