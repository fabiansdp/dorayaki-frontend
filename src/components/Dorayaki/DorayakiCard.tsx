import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteDorayaki } from "../../utils/dorayaki";
import ConfirmModal from "../ConfirmModal";

interface Props {
  id: number;
  name: string;
  gambar: string;
  description: string;
  setIsEdited: (edited: boolean) => void;
  error: string | null;
  setError: (err : string | null) => void;
}

const DorayakiCard : React.FC<Props> = ({id, name, description, gambar, setIsEdited, error, setError}) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const { VITE_BACKEND_URL }= import.meta.env;
  const path = `${VITE_BACKEND_URL}/file/${gambar}`;

  const handleDelete = () => {
    setError(null)
    deleteDorayaki(id)
      .then(() => setIsEdited(true))
      .catch((err) => setError(err.message));
  }

  return (
    <>
      {showConfirm ? 
        <ConfirmModal setShow={setShowConfirm} handleSubmit={handleDelete} error={error} setError={setError} /> 
        : 
        null
      }
      <div className="sm:m-1 md:m-5 flex flex-col h-min w-56 p-1 border-box bg-white rounded xl">
        <div className="flex rounded flex-col w-full h-48 bg-gray-200 items-center">
          <img 
            src={path} 
            alt="Foto Dorayaki" 
            className="h-full w-full"
          />
        </div>
        <div className="flex border-box p-1 flex-col">
          <h2 className="text-lg font-medium">{name}</h2>
          <p>{description}</p>
          <Link to={`dorayaki/${id}`}>
            <p className="text-center text-sm bg-blue-500 rounded py-2 text-white mt-2">
              View Dorayaki
            </p>
          </Link>
          <p 
            className="cursor-pointer text-center text-sm bg-red-500 rounded py-2 text-white mt-2"
            onClick={() => setShowConfirm(true)}
          >
            Remove Dorayaki
          </p>
        </div>
      </div>
    </>
  )
}

export default DorayakiCard;