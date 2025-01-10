'use client'
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import React from 'react';
const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);



const SearchInput = ({onSearch, onClear}) => (
  <Space direction="vertical">
    <Search
      placeholder="Buscar usuarios"
      onSearch={onSearch}
      onClear = {onClear}
      style={{
        width: 290,
      }}
    />
  </Space>
);
export default SearchInput;