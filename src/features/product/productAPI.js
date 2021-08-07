import axiosClient from "api/axiosClient"

const ProductAPI = {
    getbyid: (id) => {
        const url = `https://jsonplaceholder.typicode.com/posts/${id}`
        return axiosClient.get(url)
    },
    // getlist: (params) => {
    //     const url = `https://jsonplaceholder.typicode.com/posts`
    //     return axiosClient.get(url, {params})
    // },
}

export default ProductAPI
