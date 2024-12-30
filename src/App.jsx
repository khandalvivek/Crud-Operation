import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./Components/Home";
import CreateUser from "./Components/User/Create";
import CreateEmployee from "./Components/Employee/Create";
import UpdateUser from "./Components/User/Update";
import UpdateEmployee from "./Components/Employee/Update";
import ReadUser from "./Components/User/Read";
import ReadEmployee from "./Components/Employee/Read";
import "./index.css"

export const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/user/create" element={<CreateUser/>}></Route>
        <Route path="/employee/create" element={<CreateEmployee />} />
        <Route path="/user/update/:id" element={<UpdateUser/>}></Route>
        <Route path="/employee/update/:id" element={<UpdateEmployee/>}></Route>
        <Route path="/user/read/:id" element={<ReadUser/>}></Route>
        <Route path="/employee/read/:id" element={<ReadEmployee/>}></Route>
      </Routes>
    </BrowserRouter>
  )
};

export default App;
