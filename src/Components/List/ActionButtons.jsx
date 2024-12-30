import React from "react";
import { Link } from "react-router-dom";
import viewImg from "../../assets/images/view.svg";
import editImg from "../../assets/images/edit.svg";
import deleteImg from "../../assets/images/delete.svg";

const ActionButtons = ({ entityType, entity, handleDelete }) => {
  return (
    <>
      <div className="flex space-x-4">
        <Link
          to={`${entityType}/read/${entity.id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded-md flex items-center"
        >
          <img src={viewImg} alt="view" />
        </Link>
        <Link
          to={`${entityType}/update/${entity.id}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold p-2 rounded-md flex items-center"
        >
          <img src={editImg} alt="edit" />
        </Link>
        <button
          onClick={() => handleDelete(entity.id)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold p-2 rounded-md flex items-center"
        >
          <img src={deleteImg} alt="delete" />
        </button>
      </div>
    </>
  );
};

export default ActionButtons;
