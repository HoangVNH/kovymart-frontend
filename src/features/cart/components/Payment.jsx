import { Button, Row, Col } from "antd"
import Money from "helper/Money"
const Payment = () => {
    const handlePayment = () => {
        alert("payment")
    }
    return (
        <div className="border shadow-sm rounded-2 py-5 px-4 sticky-payment-form">
            <Row>
                <Col xs={12} sm={24} md={12} span={12}>
                    <span className="fw-bold"> Tạm tính:</span>
                </Col>
                <Col xs={12} sm={24} md={12} span={12} className="d-flex justify-content-end align-items-end">
                    <h4><Money money={50000} /></h4>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={24} md={12} span={12}>
                    <span className="fw-bold"> Phí vận chuyển:</span>
                </Col>
                <Col xs={12} sm={24} md={12} span={12} className="d-flex justify-content-end align-items-end">
                    <h4><Money money={20000} /></h4>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={24} md={12} span={12}>
                    <span className="fw-bold"> Tổng tiền:</span>
                </Col>
                <Col xs={12} sm={24} md={12} span={12} className="d-flex justify-content-end align-items-end">
                    <h4><Money money={70000} /></h4>
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