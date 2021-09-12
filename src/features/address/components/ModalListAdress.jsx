import { Modal, Row } from 'antd'
import { useState, useEffect } from 'react'
import CardAddress from './CardAddress'
import ButtonUI from 'components/UIKit/ButtonUI'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAddressList, selectAddressList, setDefaultAddress } from '../addressSlice'
import { PlusOutlined } from '@ant-design/icons'
const ModalListAddress = (props) => {
    const dispatch = useDispatch()
    const [selectedDefault, setSelectedDefault] = useState(null)
    const list_address = useSelector(selectAddressList)
    const handleOk = () => {
        props.setVisibility(false)
    }
    const handleCancel = () => {
        props.setVisibility(false)
    }

    useEffect(() => {
        dispatch(getAddressList())
    }, [])
    return (
        <Modal
            title="Danh sách địa chỉ"
            visible={props.visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <ButtonUI text="Quay lại" variant="light" key="back" onClick={handleCancel} />,
                <ButtonUI text="Xác nhận" key="submit" onClick={handleOk} />
            ]}
        >
            {list_address.length > 0 ?
                <>{list_address.map((item) => {
                    return <CardAddress address={item} />
                })} </> : null}
            <Row class="mt-5" type="flex" justify="end">
                <Link to="/address/add">
                    <ButtonUI withIcon={<PlusOutlined />} variant="light" text="Thêm địa chỉ" />
                </Link>
            </Row>
        </Modal>
    )
}

export default ModalListAddress