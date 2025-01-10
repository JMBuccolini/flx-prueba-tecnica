'use client'

import { Table, Tag, Space } from "antd";

function UsersTable({users}) {

  const columns = [
    {
      title: "Usuario",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => {
        const color = status === "inactive" ? "volcano" : "green";
        const statusText = status === "inactive" ? "Inactivo" : "Activo";
        return (
          <Tag color={color} key={status}>
            {statusText}
          </Tag>
        );
      },
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (_) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center", // Centra horizontalmente
            gap: "8px", // Espaciado entre los botones
            color:'blue'
          }}
        >
          <Space>
            <a style={{ padding: "4px 8px" }}>Editar</a>
            <a style={{ padding: "4px 8px" }}>Eliminar</a>
          </Space>
        </div>
      ),
      width: 150,
    },
  ];

  return (
    <section>
      {users && (
        <Table dataSource={users} columns={columns} rowKey="id" bordered/>
      )}
    </section>
  );
}

export default UsersTable;
