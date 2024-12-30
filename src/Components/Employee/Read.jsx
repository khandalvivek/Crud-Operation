import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ListHeader from "../List/ListHeader";
import FormField from "../List/FormField";
import RadioField from "../List/RadioField";
import FormButtons from "../List/FormButtons";

export const Read = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    salary: "",
    position: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("employees")) || [];
    const user = storedData.find((user) => user.id === parseInt(id));
    if (user) {
      setData(user);
    }
  }, [id]);

  const handleDelete = (id) => {
    const confirm = window.confirm("Would you like to delete?");
    if (confirm) {
      const savedData = JSON.parse(localStorage.getItem("employees")) || [];
      const updatedData = savedData.filter((employee) => employee.id != id);
      localStorage.setItem("employees", JSON.stringify(updatedData));
      setData(updatedData);
      navigate("/");
    }
  };

  return (
    <>
      <div className="p-8">
        <ListHeader
          title="Read Employee Details"
          link={`/employee/update/${id}`}
          isReadPage={true}
          handleDelete={handleDelete}
        />

        <form className="w-full bg-gray-50 p-8 shadow-md rounded-lg">
          <div className="grid grid-cols-3 gap-4">
            <FormField
              id="name"
              label="Name"
              type="text"
              value={data.name}
              placeholder="Enter Your Name"
              disabled
            />
            <FormField
              id="email"
              label="Email"
              type="email"
              value={data.email}
              placeholder="Enter Your Email"
              disabled
            />
            <FormField
              id="mobile"
              label="Mobile"
              type="text"
              value={data.mobile}
              placeholder="Enter Your Mobile"
              disabled
            />
            <FormField
              id="dob"
              label="Date of Birth"
              type="date"
              value={data.dob}
              placeholder="Enter Your Date of Birth"
              disabled
            />
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Gender
              </label>
              <div className="space-x-4">
                <RadioField
                  id="gender-male"
                  label="Male"
                  value="Male"
                  checked={data.gender === "Male"}
                  name="gender"
                  disabled
                />
                <RadioField
                  id="gender-female"
                  label="Female"
                  value="Female"
                  checked={data.gender === "Female"}
                  name="gender"
                  disabled
                />
                <RadioField
                  id="gender-other"
                  label="Other"
                  value="Other"
                  checked={data.gender === "Other"}
                  name="gender"
                  disabled
                />
              </div>
            </div>
            <FormField
              id="salary"
              label="Salary"
              type="number"
              value={data.salary}
              placeholder="Enter Your Salary"
              disabled
            />
            <FormField
              id="position"
              label="Position"
              type="text"
              value={data.position}
              placeholder="Enter Your position"
              disabled
            />
          </div>

          <FormButtons
            backLink="/"
          />
        </form>
      </div>
    </>
  );
};

export default Read;
