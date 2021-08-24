import {
  Col,
  Row,
  Card,
  Typography,
  Select,
  Space,
  Input,
  Form,
  Divider,
} from "antd"
import { ShoppingCartOutlined } from "@ant-design/icons"
import ButtonUI from "components/UIKit/ButtonUI"
import Utils from "components/UIKit/Utils"
import { useHistory, Link } from "react-router-dom"
import { checkAuth } from "helper/auth"
import { useEffect } from "react"
import "./Order.scss"
import { selectProvinces, selectDistricts, selectWards } from '../../location/locationSlice'
import { useSelector } from 'react-redux'
import { fee } from 'constants/fee'
const { Text, Title } = Typography
const { Option } = Select
const Order = () => {
  const history = useHistory()
  const [form] = Form.useForm()
  const cart = useSelector((state) => state.cart)
  const provinces = useSelector(selectProvinces)
  const districts = useSelector(selectDistricts)
  const wards = useSelector(selectWards)

  useEffect(() => {
    const isUserLoggedIn = checkAuth()
    if (!isUserLoggedIn || cart.totalItems === 0) {
      history.push("/")
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  //handle dispatch location

  //handle payment actions
  // const getID = (value) => {
  //   return value ? JSON.parse(value)[0] : -1;
  // };
  const handleSubmit = (e) => {
    // console.log(e);
    // let location = {
    //   provinces_id: getID(e.provincesId),
    //   district_id: getID(e.districtId),
    //   ward_id: getID(e.wardId),
    //   address: e.address,
    // }
    // let data = {
    //   totalPrice: 35000,
    //   note: "noted",
    //   paymentId: 1,
    //   items: [
    //     {
    //       quantity: 1,
    //       price: 50000,
    //       productId: 1,
    //       total: 50000
    //     }
    //   ]
    // }
    // console.log(location)
    // dispatch data

    // Direct to page order success
    history.push("/ordersuccess")
  }

  return (
    <Row type="flex" align="middle" justify="center" className="my-5">
      <Col lg={14} xs={23}>
        <Card className="card-shadow border px-2">
          <Row>
            <Col xs={24} md={22}>
              <Title level={4} style={{ color: "#e99667" }}>
                <Space>
                  <ShoppingCartOutlined />
                  Thông tin đơn hàng
                </Space>
              </Title>
            </Col>
          </Row>
          <Form
            className="mt-5"
            layout="vertical"
            onFinish={handleSubmit}
            form={form}
          >
            {/* User information */}
            <Row gutter={20} type="flex">
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Họ tên người nhận"
                  name="name"
                  rules={[
                    { required: true, message: "Bạn phải nhập thông tin này!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Số điện thoại"
                  name="phonenumber"
                  rules={[
                    { required: true, message: "Bạn phải nhập thông tin này!" },
                  ]}
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
                  rules={[
                    { required: true, message: "Bạn phải nhập thông tin này!" },
                  ]}
                >
                  <Select showSearch placeholder="Chọn tỉnh">
                    {provinces.map((prov) => (
                      <Option
                        key={prov.id}
                        value={JSON.stringify([prov.id, prov.name])}
                      >
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
                  rules={[
                    { required: true, message: "Bạn phải nhập thông tin này!" },
                  ]}
                >
                  <Select showSearch placeholder="Chọn tỉnh">
                    {districts.map((prov) => (
                      <Option
                        key={prov.id}
                        value={JSON.stringify([prov.id, prov.name])}
                      >
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
                  rules={[
                    { required: true, message: "Bạn phải nhập thông tin này!" },
                  ]}
                >
                  <Select showSearch placeholder="Chọn phường xã">
                    {wards.map((prov) => (
                      <Option
                        key={prov.id}
                        value={JSON.stringify([prov.id, prov.name])}
                      >
                        {prov.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} lg={24}>
                <Form.Item label="Địa chỉ" name="address">
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
                style={{ flex: "1" }}
                value={30}
              >
                <Row align="middle" justify="center">
                  <Col xs={14} md={8}>
                    <Text strong>Tạm tính:</Text>
                  </Col>
                  <Col xs={10} md={8} className="align-end">
                    <Text strong>{Utils.Money({ money: cart.totalPrices })}</Text>
                  </Col>
                </Row>
                <Row align="middle" justify="center">
                  <Col xs={14} md={8}>
                    <Text strong>Phí vận chuyển:</Text>
                  </Col>
                  <Col xs={10} md={8} className="align-end">
                    <Text strong>{Utils.Money({ money: fee.shipping })}</Text>
                  </Col>
                </Row>
                <Divider />
                <Row align="middle" justify="center">
                  <Col xs={14} md={8}>
                    <Text strong>Tổng tiền:</Text>
                  </Col>
                  <Col xs={10} md={8} className="align-end">
                    <Text strong>{Utils.Money({ money: cart.finalPrices })}</Text>
                  </Col>
                </Row>
              </Space>
            </Row>
            <Col style={{ textAlign: "center", marginTop: "2em" }}>
              <Space className="mt-4" size={20}>
                <Link to={"/"}>
                  <ButtonUI text="Quay lại" variant="secondary"></ButtonUI>
                </Link>
                <ButtonUI
                  htmlType="submit"
                  text="Xác nhận thanh toán"
                ></ButtonUI>
              </Space>
            </Col>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default Order
