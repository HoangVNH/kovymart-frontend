import Payment from "../components/Payment"
import CardProduct from "../components/CardProduct"
import { Col, Row, Space, Button } from 'antd'
const Cart = () => {
    const continueHandle = () => {

    }
    const deleteHandle = () => {

    }
    return (
        <>
            <Col
                className="container my-5 shadow-sm  border border-1 rounded p-5"
                span={20}
            >
                <Row>
                    <Col span={16} className="px-5">
                        <Space size={10}>
                            <Button
                                type="primary"
                                style={{ background: "#ed1b24", borderColor: "#ed1b24" }}
                                onClick={continueHandle}
                            >Tiếp tục mua hàng </Button>
                            <Button
                                type="primary"
                                style={{ background: "#ed1b24", borderColor: "#ed1b24" }}
                                onClick={continueHandle}
                            >Xóa giỏ hàng </Button>
                        </Space>
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