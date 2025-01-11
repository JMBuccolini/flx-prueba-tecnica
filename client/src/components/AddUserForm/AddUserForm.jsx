import { Button, Form, Input, Modal, Select} from "antd";
import React, { useState } from "react";

const ModalForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title="Agregar usuario"
      okText="Agregar usuario"
      onCancel={onCancel}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                onCreate(values);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
        >
          Agregar usuario
        </Button>,
      ]}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        className="flex justify-around px-0"
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <section>
          <Form.Item
            name="username"
            label="Usuario"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese un nombre de usuario",
              },
            ]}
          >
            <Input placeholder="johndoe"/>
          </Form.Item>

          <Form.Item
            name="name"
            label="Nombre"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese el nombre del usuario",
              },
            ]}
          >
            <Input placeholder="John" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Estado"
            rules={[
              {
                required: true,
                message: "Por favor, seleccione un estado (activo/inactivo)",
              },
            ]}
          >
            <Select placeholder="Seleccione un estado">
              <Select.Option value="activo">Activo</Select.Option>
              <Select.Option value="inactivo">Inactivo</Select.Option>
            </Select>
          </Form.Item>
        </section>
        <section>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese el correo del usuario",
              },
            ]}
          >
            <Input placeholder="johndoe@gmail.com"/>
          </Form.Item>

          <Form.Item
            name="lastname"
            label="Apellido"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese el apellido del usuario",
              },
            ]}
          >
            <Input placeholder="Doe"/>
          </Form.Item>

          <Form.Item
            name="age"
            label="Edad"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese la edad del usuario con valores numéricos",
              },
            ]}
          >
            <Input placeholder="43" />
          </Form.Item>
        </section>
      </Form>
    </Modal>
  );
};

const AddUserForm = ({handleCreate}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Agregar Usuario
      </Button>
      <ModalForm
        open={open}
        onCreate={(values)=> {
          handleCreate(values)
          setOpen(false)
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};
export default AddUserForm;
