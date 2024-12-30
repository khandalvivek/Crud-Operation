import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import ListHeader from "../List/ListHeader";
import { useNavigate } from "react-router-dom";
import FormField from "../List/FormField";
import FormButtons from "../List/FormButtons";
import RadioField from "../List/RadioField";
import CheckField from "../List/CheckField";
import SelectField from "../List/SelectField";

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

  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry.isoCode));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setCities(
        City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
      );
    }
  }, [selectedState, selectedCountry]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCountryChange = (e) => {
    const country = countries.find((c) => c.name === e.target.value);
    console.log("country: ", country);
    setSelectedCountry(country);
    setData({
      ...data,
      country: country.name,
      state: "",
      city: "",
    });
    setStates(State.getStatesOfCountry(country.isoCode));
    setCities([]);
  };

  const handleStateChange = (e) => {
    const state = states.find((s) => s.name === e.target.value);
    setSelectedState(state);
    setData({
      ...data,
      state: state.name,
      city: "",
    });
    setCities(City.getCitiesOfState(selectedCountry.isoCode, state.isoCode));
  };

  const handleCityChange = (e) => {
    setData({
      ...data,
      city: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newData = { ...data, id: new Date().getTime() };
      const savedData = JSON.parse(localStorage.getItem("users")) || [];
      savedData.push(newData);
      localStorage.setItem("users", JSON.stringify(savedData));
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

    if (!data.country) {
      tempErrors.country = "Country is required";
    }

    if (!data.state) {
      tempErrors.state = "State is required";
    }

    if (!data.city) {
      tempErrors.city = "City is required";
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
        <ListHeader title="Create User" />
        <form
          className="w-full bg-gray-50 p-8 shadow-md rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-3 gap-4">
            <FormField
              label="Name"
              id="name"
              name="name"
              type="text"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your name"
              error={errors.name}
            />

            <FormField
              label="Email"
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              error={errors.email}
            />

            <FormField
              label="Mobile"
              id="mobile"
              name="mobile"
              type="text"
              value={data.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              error={errors.mobile}
            />

            <FormField
              label="Date of Birth"
              id="dob"
              name="dob"
              type="date"
              pattern="\d{2}-\d{2}-\d{4}"
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

            <SelectField
              label="Country"
              id="country"
              name="country"
              value={data.country}
              onChange={handleCountryChange}
              options={countries.map((country) => ({
                label: country.name,
                value: country.name,
              }))}
              error={errors.country}
            />

            <SelectField
              label="State"
              id="state"
              name="state"
              value={data.state}
              onChange={handleStateChange}
              options={states.map((state) => ({
                label: state.name,
                value: state.name,
              }))}
              error={errors.state}
            />

            <SelectField
              label="City"
              id="city"
              name="city"
              value={data.city}
              onChange={handleCityChange}
              options={cities.map((city) => ({
                label: city.name,
                value: city.name,
              }))}
              error={errors.city}
            />

            <FormField
              label="Password"
              id="password"
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors.password}
            />

            <FormField
              label="Confirm Password"
              id="conformPassword"
              name="conformPassword"
              type="password"
              value={data.conformPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              error={errors.conformPassword}
            />
          </div>

          <CheckField
            id="terms"
            name="terms"
            label="I agree to the Terms & Conditions"
            checked={data.terms}
            onChange={handleChange}
            error={errors.terms}
          />

          <FormButtons
            onSubmit={handleSubmit}
            onReset={handleReset}
            data="User"
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
