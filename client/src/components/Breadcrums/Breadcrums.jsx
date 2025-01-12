
import {Breadcrumb} from "antd";
function Breadcrums() {
  const items = [
    {
      title:<p>Usuarios</p> ,
    },
    {
      title: <a href="#"><strong>Listado de usuarios</strong></a>,
    },
  ];

  return <Breadcrumb items={items}/>;

}

export default Breadcrums;
