import React from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import addUserImg from "../../assets/images/addUSer.svg";
import editImg from "../../assets/images/edit.svg";
import deleteImg from "../../assets/images/delete.svg";

const ListHeader = ({
  title = "List Of Data",
  link,
  isListPage,
  isReadPage,
  isUpdatePage,
  handleDelete,
}) => {
  const { id } = useParams();

  return (
    <>
      <div className="flex justify-between pb-8">
        <h2 className="text-3xl font-bold text-black">{title}</h2>
        {isListPage && (
          <div>
            <Link
              to={link}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold p-2 rounded-md flex items-center space-x-1"
            >
              <img src={addUserImg} alt="plus.svg" />
            </Link>
          </div>
        )}
        {isReadPage && (
          <div className="flex space-x-4">
            <Link
              to={link}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold p-2 rounded-md flex items-center"
            >
              <img src={editImg} alt="edit.svg" />
            </Link>
            <button
              onClick={() => handleDelete(id)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold p-2 rounded-md flex items-center"
            >
              <img src={deleteImg} alt="delete.svg" />
            </button>
          </div>
        )}
        {isUpdatePage && (
          <div className="flex space-x-4">
            <button
              onClick={() => handleDelete(id)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold p-2 rounded-md flex items-center"
            >
              <img src={deleteImg} alt="delete.svg" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

ListHeader.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  isCreatePage: PropTypes.bool,
  isReadPage: PropTypes.bool,
  handleDelete: PropTypes.func,
};

export default ListHeader;
