import { Row, Col, Typography } from "antd"
import Utils from "components/UIKit/Utils"
import ButtonUI from "components/UIKit/ButtonUI"
import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"
import { NotifyHelper } from "helper/notify-helper"
import { checkAuth } from "helper/auth"
import { fee } from "constants/fee"
import { useSelector } from "react-redux"

const {  Text } = Typography

const Payment = () => {
  let history = useHistory()
  const handlePayment = () => {
    const isUserLoggedIn = checkAuth()
    if (!isUserLoggedIn) {
      NotifyHelper.error(
        "Vui lòng đăng nhập để tiến hành thanh toán !",
        "Không thể thanh toán"
      )
    } else {
      history.push("/order")
    }
  }

  const cart = useSelector((state) => state.cart)
  return (
    <div className="border shadow-sm rounded-2 py-5 px-4 sticky-payment-form">
      <Row className="mb-3">
        <Col xs={12} sm={24} md={12} span={12}>
          <Text strong >Tạm tính:</Text>
        </Col>
        <Col
          xs={12}
          sm={24}
          md={12}
          span={12}
          className="d-flex justify-content-end align-items-end"
        >
          <Text>{Utils.Money({ money: cart.totalPrices })}</Text>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={12} sm={24} md={12} span={12}>
          <Text strong >Phí vận chuyển:</Text>
        </Col>
        <Col
          xs={12}
          sm={24}
          md={12}
          span={12}
          className="d-flex justify-content-end align-items-end"
        >
          <Text>{Utils.Money({ money: fee.shipping })}</Text>
        </Col>
      </Row>
      <Row >
        <Col xs={12} sm={24} md={12} span={12}>
          <Text strong> Tổng tiền:</Text>
        </Col>
        <Col
          xs={12}
          sm={24}
          md={12}
          span={12}
          className="d-flex justify-content-end align-items-end"
        >
          <Text>{Utils.Money({ money: cart.finalPrices })}</Text>
        </Col>
      </Row>
      <div className="text-center mt-5">
        <ButtonUI text="Thanh toán" onClick={handlePayment} />
      </div>
    </div>
  )
}
Payment.propTypes = {
  products: PropTypes.array,
}
export default Payment
