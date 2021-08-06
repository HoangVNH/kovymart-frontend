import { Button, Row, Col } from "antd"
import Money from "helper/Money"
const Payment = (props) => {
    const handlePayment = () => {
        alert("payment")
    }
    const total = props.products.reduce((currentTotal, item) => {
        return item.price + currentTotal
    }, 0)
    const shippingFee = 20000
    return (
        <div className="border shadow-sm rounded-2 py-5 px-4 sticky-payment-form">
            <Row>
                <Col xs={12} sm={24} md={12} span={12}>
                    <span className="fw-bold"> Tạm tính:</span>
                </Col>
                <Col xs={12} sm={24} md={12} span={12} className="d-flex justify-content-end align-items-end">
                    <h4><Money money={total} /></h4>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={24} md={12} span={12}>
                    <span className="fw-bold"> Phí vận chuyển:</span>
                </Col>
                <Col xs={12} sm={24} md={12} span={12} className="d-flex justify-content-end align-items-end">
                    <h4><Money money={shippingFee} /></h4>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={24} md={12} span={12}>
                    <span className="fw-bold"> Tổng tiền:</span>
                </Col>
                <Col xs={12} sm={24} md={12} span={12} className="d-flex justify-content-end align-items-end">
                    <h4><Money money={total+shippingFee} /></h4>
                </Col>
            </Row>
            <div className="text-center mt-5">
                <Button
                    type="primary"
                    style={{ background: "#ed1b24", borderColor: "#ed1b24" }}
                    onClick={handlePayment}
                >
                    Thanh toán
                </Button>
            </div>

        </div>
    )
}
export default Payment