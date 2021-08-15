import axiosClient from "./axiosClient";

const locationApi = {
  getProvinces() {
    const url = "";
    return axiosClient.get(url);
  },
  getDistricts() {
    const url = "";
    return axiosClient.get(url);
  },
  getWards() {
    const url = "";
    return axiosClient.get(url);
  },
};

export default locationApi;
