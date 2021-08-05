import "./ProductDetails.scss"
import { Col, Image, Layout, Button, Row, Tag, Typography } from "antd"
import {
  CheckCircleOutlined,
  ShoppingCartOutlined,
  CheckOutlined,
} from "@ant-design/icons"
import FormatMoney from "../../../helper/formatMoney"
import { useEffect } from "react"
const { Content } = Layout
const { Text } = Typography

const product = {
  name: "Snack Doritos",
  discount: 10,
  price: 50000,

  description:
    "  • Snack khoai tây vị tảo biển O'Star gói 48g là sản phẩm của thương \n hiệu Orion, một trong ba tập đoàn thực phẩm lớn nhất Hàn Quốc.\n • Thông tin sản phẩm Màu sắc sản phẩm: Năng lượng: 570kcal/100g.\n• Hướng dẫn sử dụng: Ăn trực tiếp sau khi bóc vỏ. Bảo quản sản phẩm nơi khô ráo, thoáng mát, tránh ánh sáng và   \nnhiệt độ cao.    \n• Thành phần: Khoai tây tươi, dầu thực vật, bột gia vị   tảo biển 5% (đường, maltodextrin, muối, bột sữa, chất điều vịmononatri glutamat (E621), bột hành, bột tỏi, tảo biển).",
}

const ProductDetails = () => {
  useEffect(() => {
    // call api get product by id
  }, [])
  const handleClick = () => {
    alert("clicked")
  }
  return (
    <Col
      className="container my-5 shadow-sm  border border-1 rounded p-5"
      span={16}
    >
      <Row>
        <Col lg={12} className="pe-5">
          <Image
            src="https://img.dominos.vn/Veggie-mania.jpg"
            className="rounded"
          />
        </Col>
        <Col lg={12} className="px-2">
          <Tag className="mb-2 fw-bold" color="warning">
            {product.discount}% OFF
          </Tag>
          <br />
          <h2 className="fw-bold mb-0"> {product.name}</h2>
          <div className="text-muted mb-5">
            <CheckCircleOutlined className="me-2 align-baseline" />
            <span className="mb-2"></span>Sẵn có 5kg
          </div>
          <div className="text-wrap lh-1 mb-3">
            <h4 className="fw-bold" style={{ lineHeight: "0" }}>
              Giá:
              <FormatMoney money={product.price} />
            </h4>
            <span className="text-muted text-decoration-line-through">
              <FormatMoney
                money={product.price * (1 + product.discount * 0.01)}
              />
            </span>
            <h5 className="text-muted ">(Đã tính thuế)</h5>
          </div>
          <Button
            type="primary"
            style={{ background: "#ed1b24", borderColor: "#ed1b24" }}
            onClick={handleClick}
          >
            <ShoppingCartOutlined className="align-baseline" />
            Mua ngay
          </Button>
          <div className="mt-5">
            <span>Lý do nên mua sản phẩm ?</span>
            <br />
            <span className="text-info">
              <CheckOutlined className="align-baseline" /> Dễ dàng đổi và hoàn
              trả
            </span>
            <br />
            <span className="text-info">
              <CheckOutlined className="align-baseline" /> Đảm bảo giá cả phải
              chăng
            </span>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col lg={16}>
          <h2 className="fw-bold">Mô tả sản phẩm</h2>
          <div className="mt-4">{product.description}</div>
        </Col>
      </Row>
    </Col>
  )
}

export default ProductDetails
