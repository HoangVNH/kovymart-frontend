import Payment from "../components/Payment"
import ProductItem from "../components/ProductItem"
import { Col, Row, Space } from 'antd'
import ButtonUI from "components/UIKit/ButtonUI"
import './Cart.scss'
import { useSelector, useDispatch } from "react-redux"
import { deleteCart } from '../cartSlice'
const Cart = () => {
    const dispatch = useDispatch();
    const products_list = useSelector((state) => state.cart.items);
    const handleContinue = () => {
    }
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
                        onClick={() => { dispatch(deleteCart()) }}
                    />

                </Space>
                <Row className="mt-5 ">
                    <Col span={24} sm={13} lg={16} className="px-3 d-flex justify-content-center">
                        <div  >
                            {products_list
                                ? <>
                                    {products_list.map((item) => {
                                        return (
                                            <ProductItem key={item.productId} product={item} />
                                        )
                                    }
                                    )}
                                </>
                                : "none"
                            }
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