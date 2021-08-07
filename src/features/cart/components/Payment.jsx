import { Row, Col } from "antd"
import Utils from "components/UIKit/Utils"
import ButtonUI from "components/UIKit/ButtonUI"
import { NotifyHelper } from "helper/notify-helper"
import PropTypes from 'prop-types'
const Payment = (props) => {
    const handlePayment = () => {
        NotifyHelper.success("Message here", "Thanh toán thành công")
    }
    const sum = props.products.reduce((currentTotal, item) => {
        return item.price + currentTotal
    }, 0)
    const shippingFee = 20000
    const final = shippingFee + sum
    return (
        <div className="border shadow-sm rounded-2 py-5 px-4 sticky-payment-form">
            <Row>
                <Col xs={12} sm={24} md={12} span={12}>
                    <span className="fw-bold"> Tạm tính:</span>
                </Col>
                <Col xs={12} sm={24} md={12} span={12} className="d-flex justify-content-end align-items-end">
                    <h4>{Utils.Money({ money: sum })}</h4>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={24} md={12} span={12}>
                    <span className="fw-bold"> Phí vận chuyển:</span>
                </Col>
                <Col xs={12} sm={24} md={12} span={12} className="d-flex justify-content-end align-items-end">
                    <h4>{Utils.Money({ money: shippingFee })}</h4>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={24} md={12} span={12}>
                    <span className="fw-bold"> Tổng tiền:</span>
                </Col>
                <Col xs={12} sm={24} md={12} span={12} className="d-flex justify-content-end align-items-end">
                    <h4>{Utils.Money({ money: final })}</h4>
                </Col>
            </Row>
            <div className="text-center mt-5">
                <ButtonUI text='Thanh toán'
                    onClick={handlePayment}
                />
            </div>
        </div>
    )
}
Payment.propTypes = {
    products: PropTypes.array,
}
export default Payment