import Payment from "../components/Payment"
import ProductItem from "../components/ProductItem"
import { Col, Row, Space } from 'antd'
import ButtonUI from "components/UIKit/ButtonUI"
import './Cart.scss'
import { useSelector } from "react-redux"

const Cart = () => {

    const products = useSelector((state) => state.cart.items);
    const handleContinue = () => {

    }
    // const handleDelete = () => {

    // }
    return (
        <>
            <Col
                className="container my-5"
                span={24}
                xl={20}
            >
                <Space size={20} className="ms-3">
                    <ButtonUI text="Tiếp tục mua hàng"
                        onClick={handleContinue} />
                    <ButtonUI text="Xóa giỏ hàng"
                        variant="danger"
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