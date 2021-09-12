import { Card, Row, Col, Typography, Modal } from 'antd'
import ButtonUI from '../../../components/UIKit/ButtonUI'
import { setDefaultAddress, deleteAddress } from '../addressSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
const { Text } = Typography

const CardAddress = (props) => {
    const dispatch = useDispatch()
    const handleSetDefault = () => {
        dispatch(setDefaultAddress(props.address))
    }
    const handleDelete = () => {
        setVisibilityDelete(true)
    }
    const handleConfirmDelete = (addressId) => {
        dispatch(deleteAddress(addressId))
    }
    const handleCancelDelete = () => {
        setVisibilityDelete(false)
    }

    const [visibilityDelete, setVisibilityDelete] = useState(false)
    return (
        <Card className="mb-4 shadow-sm border">
            <Modal
                title="Xóa địa chỉ"
                visible={visibilityDelete}
                onOk={handleConfirmDelete}
                onCancel={handleCancelDelete}
                footer={[
                    <ButtonUI text="Quay lại" variant="light" key="back" onClick={handleCancelDelete} />,
                    <ButtonUI text="Xóa" variant="danger" key="submit" onClick={handleConfirmDelete} />
                ]}
            >
            </Modal>
            <Row >
                {/* Name */}
                <Col span={10}>
                    <Text strong>
                        Tên:
                    </Text>
                </Col>
                <Col>
                    <Text> {props.address.name}</Text>
                </Col>
            </Row>
            {/* Phone */}
            <Row >
                <Col span={10}>
                    <Text strong>
                        Số điện thoại:
                    </Text>
                </Col>
                <Col>
                    <Text>{props.address.phone}</Text>
                </Col>
            </Row>
            {/* Address */}
            <Row >
                <Col span={10}>
                    <Text strong>
                        Địa chỉ:
                    </Text>
                </Col>
                <Col>
                    <Text> {props.address.address} - {props.address.provinceId} - {props.address.districtId} - {props.address.wardId}</Text>

                </Col>
            </Row>

            <Row className="mt-5" type="flex" justify="center">
                <ButtonUI className="mx-1 my-1" variant="light" text="Đặt làm mặc định"
                    onClick={handleSetDefault}
                />
                <ButtonUI className="mx-1 my-1" variant="danger" text="Xóa" onClick={handleDelete} />
            </Row>

        </Card>
    )
}

export default CardAddress