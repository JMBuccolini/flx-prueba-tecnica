'use client';

import { Select } from 'antd';
import { useState } from 'react';

const FilterInput = ({ onChange }) => {
  const [loading, setLoading] = useState(false);

  const onSearchHandler = (value) => {
    setLoading(true); 
    setTimeout(() => {
      onChange(value);
      setLoading(false);
    }, 1000);
  };

  return (
    <Select
      showSearch
      placeholder="Filtrar por estado"
      optionFilterProp="children"
      style={{
        width: 210,
      }}
      onChange={onSearchHandler} 
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={[
        {
          value: 'active',
          label: 'Activo',
        },
        {
          value: 'inactive',
          label: 'Inactivo',
        },
        {
          value: 'all',
          label: 'Todos',
        },
      ]}
      loading={loading}
    />
  );
};

export default FilterInput;
