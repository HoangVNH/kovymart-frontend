import React from "react";
import { Input } from "antd";
import {
  useHistory
} from "react-router-dom";
import { isValidSearchString } from "utils";

const Search = () => {
  const history = useHistory()

  const handleSearch = (value) => {
      if(isValidSearchString(value))
        history.push(`/product?search=${value}`);
  };

  return (
    <Input.Search
      placeholder="Tìm sản phẩm"
      enterButton="Tìm kiếm"
      onSearch={handleSearch}
      className="ant-input-search--override"
    />
  );
};

export default Search;
