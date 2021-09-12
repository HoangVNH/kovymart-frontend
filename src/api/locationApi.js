import axiosClient from "./axiosClient"

const locationApi = {
  getProvinces() {
    const url = `provinces?page=1&limit=100`
    return axiosClient.get(url)
  },
  getDistricts(provinceId) {
    const url = `districts?provinceid=${provinceId}`
    return axiosClient.get(url)
  },
  getWards(districtId) {
    const url = `wards?districtid=${districtId}`
    return axiosClient.get(url)
  },
}

export default locationApi
