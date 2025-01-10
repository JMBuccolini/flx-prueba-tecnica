
import {Breadcrumb} from "antd";
function Breadcrums() {
  const items = [
    {
      title: <a href="" >Usuarios</a>,
    },
    {
      title: <a href="" >Listado de usuarios</a>,
    },
  ];

  return <Breadcrumb items={items} />;

}

export default Breadcrums;
