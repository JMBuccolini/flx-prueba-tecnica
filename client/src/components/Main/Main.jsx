"use client";

import Breadcrums from "@/components/Breadcrums/Breadcrums";
import SearchInput from "@/components/SearchInput/SearchInput";
import FilterInput from "@/components/FilterInput/FilterInput";
import UsersTable from "@/components/UsersTable/UsersTable";
import ModalForm from "@/components/ModalForm/ModalForm";
import { useReducer, useEffect, useState } from "react";
import { userReducer } from "@/reducer/store/reducer";
import { TYPES } from "@/reducer/actions/actions";
import { v4 as uuidv4 } from "uuid";
import { Button } from "antd";
import "@ant-design/v5-patch-for-react-19";

export default function Main() {
  const [state, dispatch] = useReducer(userReducer, {
    allUsers: [],
    searchedUsers: []
  });
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState('')


  useEffect(() => {
    const getData = ()=>{
      fetch("http://localhost:4000/users")
      .then((res) => res.json())
      .then((res) => {
        const newUserTable = res.map((user) => ({
          ...user,
          id: uuidv4(),
        }));
        dispatch({ type: TYPES.SET_TABLE, payload: newUserTable });
      })
      .catch((err) => console.log("Hubo un error con el fetching", err));
    }

   getData()
  }, []);



  const handleSearch = (value) => {
    dispatch({ type: TYPES.SEARCH_USER, payload: value });
  };

  const handleEdit = (user) => {
    setInitialValues(user)
    setOpen(true);
  };

  const handleDelete = (id) =>{
    console.log('ingreso al delete')
    dispatch({type:TYPES.DELETE_USER, payload: id})
  }


  const handleChange = (value) => {
    dispatch({ type: TYPES.FILTER_STATUS, payload: value });
  };

  const handleCreate = (values) => {
    if(initialValues){
      dispatch({ type: TYPES.EDIT_USER, payload: {...initialValues,...values} });
      
    }else{
      const newUser = { ...values, id: uuidv4() };
      dispatch({ type: TYPES.ADD_USER, payload: newUser }); 
    }
    setInitialValues(null);
    setOpen(false);
  };



  return (
    <main className="bg-[#F5F5F5]">
      <section className="container mx-auto px-8 flex flex-col py-8 gap-y-8">
        <Breadcrums />
        <section className="flex justify-between w-full ">
          <section className="flex place-content-center gap-x-8">
            <SearchInput handleSearch={handleSearch} />
            <FilterInput onChange={handleChange} />
          </section>
          <section>
            <Button
              type="primary"
              onClick={() => {
                setInitialValues(null)
                setOpen(true);
              }}
            >
              Agregar Usuario
            </Button>
          </section>
        </section>
        <UsersTable users={state.searchedUsers} handleEdit={handleEdit} handleDelete={handleDelete} />
      </section>

      <ModalForm
        open={open}
        onCreate={(values) => {
          handleCreate(values);
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        initialValues = {initialValues}
      />
    </main>
  );
}