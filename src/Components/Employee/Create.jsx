import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListHeader from "../List/ListHeader";
import FormField from "../List/FormField";
import FormButtons from "../List/FormButtons";
import RadioField from "../List/RadioField";
import CheckField from "../List/CheckField";

export const Create = () => {
  const initialFormData = {
    name: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    country: "",
    state: "",
    city: "",
    password: "",
    conformPassword: "",
    terms: "",
  };

  const [data, setData] = useState(initialFormData);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newData = { ...data, id: new Date().getTime() };
      const savedData = JSON.parse(localStorage.getItem("employees")) || [];
      savedData.push(newData);
      localStorage.setItem("employees", JSON.stringify(savedData));
      alert("Form submitted successfully!");
      navigate("/");
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setData(initialFormData);
  };

  const validate = () => {
    let tempErrors = {};

    if (!data.name) {
      tempErrors.name = "Name is required";
    }

    if (!data.email) {
      tempErrors.email = "Email is required";
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(data.email)) {
      tempErrors.email = "Email is invalid";
    }

    if (!data.mobile) {
      tempErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(data.mobile)) {
      tempErrors.mobile = "Mobile number must be 10 digits long";
    }

    if (!data.dob) {
      tempErrors.dob = "Date of Birth is required";
    } else {
      const age = new Date().getFullYear() - new Date(data.dob).getFullYear();
      if (age < 18) {
        tempErrors.dob = "You must be at least 18 years old";
      }
    }

    if (!data.gender) {
      tempErrors.gender = "Gender is required";
    }

    if (!data.salary) {
      tempErrors.salary = "Salary is required";
    }

    if (!data.position) {
      tempErrors.department = "Position is required";
    }

    if (!data.password) {
      tempErrors.password = "Password is required";
    } else if (data.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(data.password)) {
      tempErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(data.password)) {
      tempErrors.password =
        "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(data.password)) {
      tempErrors.password = "Password must contain at least one digit";
    } else if (!/[!@#$%^&*]/.test(data.password)) {
      tempErrors.password =
        "Password must contain at least one special character (!@#$%^&*)";
    }

    if (data.password !== data.conformPassword) {
      tempErrors.conformPassword = "Passwords are different";
    }

    if (!data.terms) {
      tempErrors.terms = "Terms & Conditions are required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  return (
    <>
      <div className="p-8">
        <ListHeader title="Create Employee" />
        <form
          className="w-full bg-gray-50 p-8 shadow-md rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className=" grid grid-cols-3 gap-4">
            <FormField
              id="name"
              label="Name"
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              error={errors.name}
            />

            <FormField
              id="email"
              label="Email"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              error={errors.email}
            />

            <FormField
              id="mobile"
              label="Mobile No."
              type="number"
              name="mobile"
              value={data.mobile}
              onChange={handleChange}
              placeholder="Enter Your Mobile No."
              error={errors.mobile}
            />

            <FormField
              id="dob"
              label="Date of Birth"
              type="date"
              name="dob"
              value={data.dob}
              onChange={handleChange}
              error={errors.dob}
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
                  onChange={handleChange}
                  name="gender"
                  error={errors.gender}
                />
                <RadioField
                  id="gender-female"
                  label="Female"
                  value="Female"
                  checked={data.gender === "Female"}
                  onChange={handleChange}
                  name="gender"
                  error={errors.gender}
                />
                <RadioField
                  id="gender-other"
                  label="Other"
                  value="Other"
                  checked={data.gender === "Other"}
                  onChange={handleChange}
                  name="gender"
                  error={errors.gender}
                />
              </div>
              {errors.gender && (
                <p className="text-red-500 text-xs italic">{errors.gender}</p>
              )}
            </div>

            <FormField
              id="salary"
              label="Salary"
              type="number"
              name="salary"
              value={data.salary}
              onChange={handleChange}
              placeholder="Enter Your Salary"
              error={errors.salary}
            />

            <FormField
              id="position"
              label="Position"
              type="text"
              name="position"
              value={data.position}
              onChange={handleChange}
              placeholder="Enter Your Position"
              error={errors.position}
            />

            <FormField
              id="password"
              label="Password"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter Your Password"
              error={errors.password}
            />

            <FormField
              id="conformPassword"
              label="Confirm Password"
              type="password"
              name="conformPassword"
              value={data.conformPassword}
              onChange={handleChange}
              placeholder="Enter Your Confirm Password"
              error={errors.conformPassword}
            />
          </div>

          <CheckField
            id="terms"
            label="I agree to the Terms & Conditions"
            type="checkbox"
            value={data.terms}
            onChange={handleChange}
            name="terms"
            error={errors.terms}
          />

          <FormButtons
            onSubmit={handleSubmit}
            onReset={handleReset}
            data="Employee"
            page="Create"
            isSubmitReset={true}
            backLink="/"
          />
        </form>
      </div>
    </>
  );
};

export default Create;
