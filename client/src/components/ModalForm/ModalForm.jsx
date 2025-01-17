"use client";
import { Form, Modal, Input, Select, Button } from "antd";
import { useEffect, useState } from "react";
import './ModalStyles.css'

const ModalForm = ({ open, onCreate, onCancel, initialValues }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const formatName = (name) => {
    if (!name) return "";
    return name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues); // Si hay datos para editar, los carga en el formulario
    }else{
      form.setFieldValue(null) //Esto produce un warning que no he podido resolver que tiene que ver con la instancia de use.Form
    }
  }, [initialValues, form]);

  return (
    <Modal
      open={open}
      title={initialValues ? "Editar usuario" : "Agregar usuario"}
      okText="Agregar usuario"
      getContainer = {false}
      className="custom-modal"
      onCancel={() => {
        form.resetFields()
        onCancel();
      }}
      footer={
        [
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                setLoading(true);
                setTimeout(() => {
                  onCreate({
                    ...initialValues,
                    ...values,
                    name: formatName(values.name),
                    lastname: formatName(values.lastname),
                  });
                  setLoading(false);
                }, 2000);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
        >
          {initialValues ? "Guardar cambios" : "Agregar usuario"}
        </Button>,
      ]}
    >
      <Form
        className="flex justify-around px-0"
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={initialValues}
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
            <Input placeholder="johndoe" />
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
            <Input placeholder="johndoe@gmail.com" />
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
            <Input placeholder="Doe" />
          </Form.Item>

          <Form.Item
            name="age"
            label="Edad"
            rules={[
              {
                required: true,
                message:
                  "Por favor, ingrese la edad del usuario con valores numéricos",
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

export default ModalForm;
