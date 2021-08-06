import { Col, Row, Button, Card } from "antd"
import ImageWithFallBack from "components/ImageWithFallback"
import {
    DeleteOutlined, MinusOutlined, PlusOutlined
} from '@ant-design/icons'
import Money from "../../../helper/Money"
const CardProduct = (props) => {
    const product = props.product
    const handleDelete = () => {
        alert("cl")
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
                        Bắp bò loại 1 500g
                    </h4>
                    <a onClick={handleDelete}><h4 className="text-danger">
                        <DeleteOutlined className="align-baseline" /> Xóa sản phẩm
                    </h4></a>
                </Col>
                <Col span={24} sm={24} lg={10} className="pe-3 d-flex justify-content-end align-items-end">
                    <h4 className="fw-bold me-4" ><Money money={50000} /></h4>
                    <Button className="mb-2" icon={<MinusOutlined />}></Button>
                    <h2 className="lh-1 m-3">1</h2>
                    <Button className="mb-2" icon={<PlusOutlined />}></Button>
                </Col>
            </Row>
        </div>
    )
}
export default CardProduct