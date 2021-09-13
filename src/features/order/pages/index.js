import {
  Col,
  Row,
  Card,
  Typography,
  Space,
  Divider,
  Skeleton
} from "antd"
import { HomeOutlined } from "@ant-design/icons"
import ButtonUI from "components/UIKit/ButtonUI"
import Utils from "components/UIKit/Utils"
import { useHistory, Link } from "react-router-dom"
import { checkAuth } from "helper/auth"
import { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { fee } from 'constants/fee'
import ModalListAddress from "features/address/components/ModalListAdress"
import { getAddressList, selectDefaultAddress, selectRequesting } from '../../address/addressSlice'

const { Text, Title } = Typography

const Order = () => {
  const history = useHistory()
  const cart = useSelector((state) => state.cart)
  const default_address = useSelector(selectDefaultAddress)
  const dispatch = useDispatch()
  useEffect(() => {
    const isUserLoggedIn = checkAuth()
    if (!isUserLoggedIn || cart.totalItems === 0) {
      history.push("/")
    }
    else {
      dispatch(getAddressList())
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
  const requesting = useSelector(selectRequesting)
  const [visibleListAddress, setVisibleListAddress] = useState(false)
  const handleChangeAddress = () => {
    setVisibleListAddress(true)
  }

  const callbackVisibleListAddress = useCallback(val => {
    setVisibleListAddress(val)
  }, [setVisibleListAddress])
  return (
    <Row type="flex" align="middle" justify="center" className="my-5">
      <ModalListAddress
        visible={visibleListAddress}
        setVisibility={callbackVisibleListAddress}
      />
      <Col lg={14} xs={23}>
        <Card className="card-shadow border-3 px-4 pb-4">
          <Row>
            <Col span={24}>

              <Title level={4} style={{ color: "#e99667" }}>
                <Space>
                  <HomeOutlined />
                  Thông tin địa chỉ
                </Space>
              </Title>
              <Row >
                {default_address && !requesting ? 
                  <Col md={20} xs={24}>
                    {/* Name */}
                    <Row  className="mt-3">
                      <Col md={5} xs={10}>
                        <Text strong>
                          Tên:
                        </Text>
                      </Col>
                      <Col>
                        <Text> {default_address.name}</Text>
                      </Col>
                    </Row>
                    {/* Phone */}
                    <Row >
                      <Col md={5} xs={10}>
                        <Text strong>
                          Số điện thoại:
                        </Text>
                      </Col>
                      <Col>
                        <Text> {default_address.phone}</Text>
                      </Col>
                    </Row>
                    {/* Address */}
                    <Row >
                      <Col md={5} xs={10}>
                        <Text strong>
                          Địa chỉ:
                        </Text>
                      </Col>
                      <Col>
                        <Text> {default_address.address} - {default_address.provinceId} - {default_address.districtId} - {default_address.wardId}</Text>
                        {/* <Text /><Address address={default_address} /> */}
                      </Col>
                    </Row>
                  </Col>
                  : <Skeleton />}
                <Col xs={24} md={4} className="mt-3" >
                  <ButtonUI className="float-right" text="Thay đổi" variant="light" onClick={handleChangeAddress} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ marginTop: "14%" }}>
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
            <Row type="flex" justify="center">
              <Link to={"/"}>
                <ButtonUI className="mt-2 mx-1" text="Quay lại" variant="secondary"></ButtonUI>
              </Link>
              <ButtonUI className="mt-2 mx-1"
                onClick={handleSubmit}
                text="Xác nhận thanh toán"
              ></ButtonUI>
            </Row>
          </Col>
        </Card>
      </Col>
    </Row>
  )
}

export default Order
