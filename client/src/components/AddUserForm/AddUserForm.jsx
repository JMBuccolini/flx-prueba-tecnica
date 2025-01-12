import { Button} from "antd";
import React from "react";



const AddUserForm = () => {
  
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
      
    </div>
  );
};

export default AddUserForm;
