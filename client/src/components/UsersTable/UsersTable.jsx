"use client";
import React, { useState } from "react";
import { Modal } from "antd";
import { Table, Tag, Space } from "antd";

import './DeleteModal.css'

const DeleteModal = ({ isModalOpen, setIsModalOpen, onConfirm, userToDelete}) => {
  const [loading, setLoading] = useState(false)
  return (
    <Modal
      title="Confirmar Eliminación"
      open={isModalOpen}
      confirmLoading={loading}
      className="custom-delete-modal"
      okText = "Eliminar"
      okButtonProps={{
        style: { backgroundColor: "red", borderColor: "red", color: "white" },
      }}
      onOk={() => {
        setLoading(true)
        setTimeout(()=>{
          onConfirm(); // Ejecutar la acción de eliminación confirmada
          setIsModalOpen(false); // Cerrar el modal
          setLoading(false)
        },2000)
        
      }}
      onCancel={() => setIsModalOpen(false)} // Solo cierra el modal
    >
      <p>¿Está seguro que desea eliminar al usuario <span className="text-red-500">@{userToDelete?.username}</span>? </p>
    </Modal>
  );
};

function UsersTable({ users, handleEdit, handleDelete, tableLoader }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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
      width:'1rem',
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
      render: (_, user) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            color: "blue",
          }}
        >
          <Space>
            <a style={{ padding: "4px 8px" }} onClick={() => handleEdit(user)}>
              Editar
            </a>
            <a
              style={{ padding: "4px 8px" }}
              onClick={() => {
                setUserToDelete(user); // Establecer el usuario a eliminar
                setIsModalOpen(true); // Abrir el modal
              }}
            >
              Eliminar
            </a>
          </Space>
        </div>
      ),
      width: 150,
    },
  ];

  return (
    <section>
      {users && (
        <Table dataSource={users} columns={columns} rowKey="id" bordered loading={tableLoader} />
      )}
      <DeleteModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userToDelete = {userToDelete}
        onConfirm={() => {
          if (userToDelete) {
            handleDelete(userToDelete.id); // Llamar a la función de eliminación
          }
        }}
      />
    </section>
  );
}

export default UsersTable;
