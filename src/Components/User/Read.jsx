import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import ListHeader from "../List/ListHeader";
import FormField from "../List/FormField";
import RadioField from "../List/RadioField";
import FormButtons from "../List/FormButtons";
import SelectField from "../List/SelectField";

export const Read = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    country: "",
    state: "",
    city: "",
  });

  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    if (data.country) {
      const country = countries.find((c) => c.name === data.country);
      setSelectedCountry(country);
      setStates(State.getStatesOfCountry(country.isoCode));
    }
  }, [data.country]);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry.isoCode));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (data.state) {
      const state = states.find((s) => s.name === data.state);
      if (state) {
        setSelectedState(state);
        setCities(City.getCitiesOfState(state.isoCode));
      } else {
        setCities([]);
      }
    }
  }, [data.state, states]);

  useEffect(() => {
    if (selectedState) {
      setCities(
        City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
      );
    }
  }, [selectedState, selectedCountry]);

  const handleCountryChange = (e) => {
    const country = countries.find((c) => c.name === e.target.value);
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

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedData.find((user) => user.id === parseInt(id));
    if (user) {
      setData(user);
    }
  }, [id]);

  const handleDelete = (id) => {
    const confirm = window.confirm("Would you like to delete?");
    if (confirm) {
      const savedData = JSON.parse(localStorage.getItem("users")) || [];
      const updatedData = savedData.filter((user) => user.id != id);
      localStorage.setItem("users", JSON.stringify(updatedData));
      setData(updatedData);
      navigate("/");
    }
  };

  return (
    <>
      <div className="p-8">
        <ListHeader
          title="Read User Details"
          link={`/user/update/${id}`}
          isReadPage={true}
          handleDelete={handleDelete}
        />

        <form className="w-full bg-gray-50 p-8 shadow-md rounded-lg">
          <div className="grid grid-cols-3 gap-4">
            <FormField
              label="Name"
              id="name"
              name="name"
              type="text"
              value={data.name}
              placeholder="Enter your name"
              disabled
            />

            <FormField
              label="Email"
              id="email"
              name="email"
              type="email"
              value={data.email}
              placeholder="Enter your email"
              disabled
            />

            <FormField
              label="Mobile"
              id="mobile"
              name="mobile"
              type="text"
              value={data.mobile}
              placeholder="Enter your mobile number"
              disabled
            />

            <FormField
              label="Date of Birth"
              id="dob"
              name="dob"
              type="date"
              value={data.dob}
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
              disabled
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
              disabled
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
              disabled
            />
          </div>

          <FormButtons backLink="/" />
        </form>
      </div>
    </>
  );
};

export default Read;
