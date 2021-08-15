import { Col, Row } from "antd"
import ImageWithFallBack from "components/ImageWithFallback"
import {
    DeleteOutlined, MinusOutlined, PlusOutlined
} from '@ant-design/icons'
import { useState } from "react"
import ButtonUI from "components/UIKit/ButtonUI"
import Utils from "components/UIKit/Utils"
import PropTypes from 'prop-types'
import { increaseUnit, decreaseUnit } from '../cartSlice';
import { useDispatch } from 'react-redux';
import {UNIT} from '../../../constants/unit'

const ProductItem = (props) => {
   
    const product = props.product;
    const [disMinusButton, setMinusButton] = useState(true);
    const [disPlusButton, setPlusButton] = useState(false);
    const dispatch = useDispatch();
    console.log(product);
    const handleDelete = () => {
        alert("cl")
    }

    const handleCounterPlus = (producyId) => {
        const action = increaseUnit(producyId);
        console.log(producyId);
        dispatch(action);
        if(product.unit === UNIT.MAX)
            setPlusButton(true);
        setMinusButton(false);
    }

    const handleCounterMinus = (producyId) => {
        const action = decreaseUnit(producyId);
        console.log(producyId);
        dispatch(action);
        if(product.unit === UNIT.MIN)
            setMinusButton(true);
        setPlusButton(false);
    }

    return (
        <div className="rounded-3 mb-3 border p-2 shadow-sm">
            <Row className="my-3">
                <Col span={8} sm={8} lg={4} className="ps-2">
                    <ImageWithFallBack
                        className="rounded"
                        src="https://static.riviu.co/image/2020/06/04/29afad6e8ef2ca40ae8b832e058fa770_output.jpeg" />
                </Col>
                <Col span={15} sm={12} lg={10} className="ps-4">
                    <h4 className="fw-bold">
                        {product.name ? product.name : "Title"}
                    </h4>
                    <a href="/#" onClick={handleDelete}><h4 className="text-danger">
                        <DeleteOutlined className="align-baseline" /> Xóa sản phẩm
                    </h4></a>
                </Col>
                <Col span={24} sm={24} lg={10} className="pe-3 d-flex justify-content-end align-items-end">
                    <h4 className="fw-bold me-4" >
                        {Utils.Money({ money: product.price * product.unit})}
                    </h4>
                    <ButtonUI className="mb-2" 
                        onClick = {()=> handleCounterMinus(product.id)}
                        disabled = {disMinusButton}
                        type="default"
                        normal={true}
                        withIcon={<MinusOutlined />}
                    />
                    <h2 className="lh-1 m-3"> {product.unit}</h2>
                    <ButtonUI className="mb-2"
                        onClick = {()=> handleCounterPlus(product.id)}
                        disabled = {disPlusButton}
                        type="default"
                        normal={true}
                        withIcon={<PlusOutlined />}
                    />
                </Col>
            </Row>
        </div>
    )
}

ProductItem.propTypes = {
    product: PropTypes.object,
}
export default ProductItem