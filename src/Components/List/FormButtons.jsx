import React from "react";
import { Link } from "react-router-dom";
import backImg from "../../assets/images/back.svg";

const FormButtons = ({ onSubmit, onReset, backLink, isSubmitReset, data, page }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        {isSubmitReset && (
          <div className="flex space-x-2">
            <button
              type="submit"
              onClick={onSubmit}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              {page} {data}
            </button>
            <button
              type="reset"
              onClick={onReset}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Reset {data}
            </button>
          </div>
        )}
        <Link
          to={backLink}
          className="bg-gray-800 hover:bg-gray-900 text-white font-bold p-2 rounded-md flex items-center ml-auto"
        >
          <img src={backImg} alt="back.svg" />
        </Link>
      </div>
    </>
  );
};

export default FormButtons;
