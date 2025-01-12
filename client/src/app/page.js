'use client'

import Breadcrums from "@/components/Breadcrums/Breadcrums";
import SearchInput from "@/components/SearchInput/SearchInput";
import FilterInput from "@/components/FilterInput/FilterInput";
import UsersTable from "@/components/UsersTable/UsersTable";
import { useReducer, useEffect } from "react";
import { userReducer } from "@/reducer/store/reducer";
import { TYPES } from "@/reducer/actions/actions";
import { v4 as uuidv4 } from "uuid";
import AddUserForm from "@/components/AddUserForm/AddUserForm";
import '@ant-design/v5-patch-for-react-19';

export default function Home() {
  const [state, dispatch] = useReducer(userReducer, { allUsers: [], searchedUsers:[], filteredUsers: [] });


  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((res) => res.json())
      .then((res) => {
        const newUserTable = res.map((user) => ({
          ...user,
          id: uuidv4(),
        }));
        dispatch({type:TYPES.SET_TABLE,payload: newUserTable})
      })
      .catch((err) => console.log("Hubo un error con el fetching", err));
  }, []);


  
  const onSearch = (value)=>{
    dispatch({type:TYPES.SEARCH_USER, payload: value})
  }

  const handleChange = (value)=>{
    dispatch({type:TYPES.FILTER_STATUS, payload:value})
  }

  const handleCreate = (values)=>{
    const newUser = {...values, id:uuidv4()}
    dispatch({type: TYPES.ADD_USER, payload: newUser})
  }

  return (
    <main className="bg-[#F5F5F5]">
      <section className="container mx-auto px-8 flex flex-col py-8 gap-y-8">
        <Breadcrums />
        <section className="flex justify-between w-full ">
          <section className="flex place-content-center gap-x-8">
            <SearchInput onSearch={onSearch} />
            <FilterInput onChange= {handleChange}/>
          </section>
          <section>
            <AddUserForm handleCreate = {handleCreate}/>
          </section>
        </section>
        <UsersTable users = {state.searchedUsers}/>
      </section>
    </main>
  );
}
