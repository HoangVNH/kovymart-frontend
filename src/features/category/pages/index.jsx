import { useParams } from 'react-router-dom'
import ButtonUI from 'components/UIKit/ButtonUI'
import Utils from 'components/UIKit/Utils'
import { useDispatch, useSelector } from "react-redux"
import { getProductsPagination, selectProducts, selectPagination, selectCategory, getCategoryById } from '../categorySlice'
import { useEffect } from 'react'
import ProductCardList from 'components/ProductCardList'
import { Row, Col } from 'antd'

const Category = () => {
    const { categoryId } = useParams()
    const dispatch = useDispatch()
    const requesting = useSelector(state => state.category.requesting)
    const finished = useSelector(state => state.category.pagination.finished)
    const products = useSelector(selectProducts)
    const pagination = useSelector(selectPagination)
    const category = useSelector(selectCategory)
    useEffect(() => {
        if (category === null)
            dispatch(getCategoryById(categoryId))
    }, [dispatch,categoryId, category])

    useEffect(() => {
        dispatch(getProductsPagination({ categoryId, page: 1 }))
    }, [dispatch, categoryId])

    const layout = {
        gutter: { xs: 4, xl: 8 },
        span: { xs: 24, sm: 12, lg: 8, xl: 6 },
    }

    function handleLoadmore() {
        dispatch(getProductsPagination({ categoryId, page: pagination + 1 }))
    }
    return (
        <Row type="flex" justify="center" className="mt-5">
            <Col span={22}>
                {products && category ?
                    <>
                        <ProductCardList
                            products={products}
                            title= {category.name}
                            layout={layout}
                        // onClickHandler={handleAddToCart}
                        />
                        <Row type="flex" justify="center">

                            {requesting
                                ? <> {Utils.Loading()} </>
                                : <> {!finished ? <ButtonUI text="Xem thêm" onClick={handleLoadmore} /> : ""}</>
                            }
                        </Row>
                    </>
                    : ""}
            </Col>
        </Row>
    )
}

export default Category