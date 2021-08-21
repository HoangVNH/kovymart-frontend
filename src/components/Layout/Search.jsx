import React from "react";
import { Input } from "antd";

const Search = () => {
  const handleSearch = (value) => {
    console.log(value);
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
