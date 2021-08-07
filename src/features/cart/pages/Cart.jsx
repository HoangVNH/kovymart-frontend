import Payment from "../components/Payment"
import ProductItem from "../components/ProductItem"
import { Col, Row, Space, Button } from 'antd'
import ButtonUI from "components/UIKit/ButtonUI"
import './Cart.scss'
const products = [
    {
        name: "Bắp bò loại 1 500g",
        price: 50000,
        id: 1,
        discount: 10,
    },
    {
        name: "Bắp bò loại 1 500g",
        price: 50000,
        id: 2,
        discount: 10,
    },
    {
        name: "Bắp bò loại 1 500g",
        price: 50000,
        id: 3,
        discount: 10,
    },
    {
        name: "Bắp bò loại 1 500g",
        price: 50000,
        id: 4,
        discount: 10,
    },
    {
        name: "Bắp bò loại 1 500g",
        price: 50000,
        id: 5,
        discount: 10,
    },
]
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
                    {/* <Button
                        type="primary"
                        style={{ background: "#ed1b24", borderColor: "#ed1b24" }}
                        onClick={handleContinue}
                    >Tiếp tục mua hàng </Button> */}
                    <ButtonUI text="Tiếp tục mua hàng"
                        onClick={handleContinue} />
                    <ButtonUI text="Xóa giỏ hàng"
                        style={{ background: "#6C757D", borderColor: "#6C757D" }}
                        onClick={handleContinue} />
                 
                </Space>
                <Row className="mt-5 ">
                    <Col span={24} sm={13} lg={16} className="px-3 d-flex justify-content-center">
                        <div  >
                            {products
                                ? <>
                                    {products.map((item) => {
                                        return (
                                            <ProductItem key={item.id} product={item} />
                                        )
                                    }
                                    )}
                                </>
                                : "none"
                            }
                        </div>
                    </Col>
                    <Col span={22} sm={11} lg={8} className="px-5">
                        <Payment products={products} />
                    </Col>
                </Row>
            </Col>
        </>
    )
}

export default Cart