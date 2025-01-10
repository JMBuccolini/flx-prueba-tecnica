'use client'

import { Select } from 'antd';



const FilterInput = ({onChange}) => (
  <Select
    showSearch
    placeholder="Filtrar por estado"
    optionFilterProp="children"
    style={{
        width:210
    }}
    onChange={onChange}
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
        value:'all',
        label:'Todos'
      }
    ]}
  />
);
export default FilterInput;