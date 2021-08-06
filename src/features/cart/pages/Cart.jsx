import Payment from "../components/Payment"
import CardProduct from "../components/CardProduct"
import { Col, Row, Space, Button } from 'antd'
import './Cart.scss'
const Cart = () => {
    const handleContinue = () => {

    }
    const handleDelete = () => {

    }
    return (
        <>
            <Col
                className="container my-5"
                span={24}
                xl={20}
            >
                <Space size={20} className="ms-3">
                    <Button
                        type="primary"
                        style={{ background: "#ed1b24", borderColor: "#ed1b24" }}
                        onClick={handleContinue}
                    >Tiếp tục mua hàng </Button>
                    <Button
                        type="primary"
                        style={{ background: "#6C757D", borderColor: "#6C757D" }}
                        onClick={handleContinue}
                    >Xóa giỏ hàng </Button>
                </Space>
                <Row className="mt-5 ">
                    <Col span={24} sm={13} lg={16} className="px-3 d-flex justify-content-center">
                        <div  >
                            <CardProduct />
                            <CardProduct />
                            <CardProduct />
                            <CardProduct />
                        </div>
                    </Col>
                    <Col span={22} sm={11} lg={8} className="px-5">
                        <Payment />
                    </Col>
                </Row>
            </Col>
        </>
    )
}

export default Cart