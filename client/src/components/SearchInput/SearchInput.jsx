"use client";
import { Input, Space, Spin } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { React, useState } from "react";
const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const SearchInput = ({ handleSearch, onClear }) => {
  const [loading, setLoading] = useState(false);
  const onSearchHandler = (value) => {
    setLoading(true); // Activar el loader
    setTimeout(() => {
      handleSearch(value);
      setLoading(false);
    }, 2000);

    // Desactivar el loader después de completar la búsqueda
  };

  return (
    <Space direction="vertical">
      <Search
        placeholder="Buscar usuarios"
        onSearch={onSearchHandler}
        onClear={onClear}
        loading = {loading}
        style={{
          width: 290,
        }}
      />
    </Space>
  );
};

export default SearchInput;
