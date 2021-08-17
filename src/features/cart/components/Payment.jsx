import { Row, Col } from "antd";
import Utils from "components/UIKit/Utils";
import ButtonUI from "components/UIKit/ButtonUI";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { NotifyHelper } from "helper/notify-helper";
import { checkAuth } from 'helper/auth';
import { fee } from "constants/fee";
import { useSelector } from "react-redux"

const Payment = (props) => {
  let history = useHistory();
  const handlePayment = () => {
    const isUserLoggedIn = checkAuth();
    if (!isUserLoggedIn) {
      NotifyHelper.error('Vui lòng đăng nhập để tiến hành thanh toán !', 'Không thể thanh toán')
    } else {
      history.push("/order");
    }
  };

  const cart = useSelector((state) => state.cart);
  const final = cart.totalPrice + fee.shipping
  return (
    <div className="border shadow-sm rounded-2 py-5 px-4 sticky-payment-form">
      <Row>
        <Col xs={12} sm={24} md={12} span={12}>
          <span className="fw-bold"> Tạm tính:</span>
        </Col>
        <Col
          xs={12}
          sm={24}
          md={12}
          span={12}
          className="d-flex justify-content-end align-items-end"
        >
          <h4>{Utils.Money({ money: cart.totalPrice })}</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={24} md={12} span={12}>
          <span className="fw-bold"> Phí vận chuyển:</span>
        </Col>
        <Col
          xs={12}
          sm={24}
          md={12}
          span={12}
          className="d-flex justify-content-end align-items-end"
        >
          <h4>{Utils.Money({ money: fee.shipping })}</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={24} md={12} span={12}>
          <span className="fw-bold"> Tổng tiền:</span>
        </Col>
        <Col
          xs={12}
          sm={24}
          md={12}
          span={12}
          className="d-flex justify-content-end align-items-end"
        >
          <h4>{Utils.Money({ money: final })}</h4>
        </Col>
      </Row>
      <div className="text-center mt-5">
        <ButtonUI text="Thanh toán" onClick={handlePayment} />
      </div>
    </div>
  );
};
Payment.propTypes = {
  products: PropTypes.array,
};
export default Payment;
