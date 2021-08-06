import Payment from "../components/Payment"
import CardProduct from "../components/CardProduct"
import { Col, Row } from 'antd'
const Cart = () => {
    return (
        <>
            <Col
                className="container my-5 shadow-sm  border border-1 rounded p-5"
                span={20}
            >
                <Row>
                    <Col span={16} className="px-5">
                        <Button
                            type="primary"
                            style={{ background: "#ed1b24", borderColor: "#ed1b24" }}
                            onClick={handleClick}
                        > </Button>
                            <CardProduct />
                    </Col>
                        <Col span={8} className="px-5">
                            Payment
                            <Payment />
                        </Col>
                </Row>
            </Col>
        </>
            )
}

            export default Cart