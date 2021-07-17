import React from "react";
import { Link } from "react-router-dom";
import { deleteDorayaki } from "../../utils/dorayaki";

interface Props {
  id: number;
  name: string;
  description: string;
  setIsEdited: (edited: boolean) => void;
}

const DorayakiCard : React.FC<Props> = ({id, name, description, setIsEdited}) => {
  const handleDelete = () => {
    setIsEdited(true)
    deleteDorayaki(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div className="sm:m-1 md:m-5 flex flex-col h-min w-56 p-1 border-box bg-white rounded xl">
      <div className="flex rounded flex-col w-ful w-full h-48 bg-gray-200 items-center">
        <img 
          src="dorayaki.svg" 
          alt="Foto Dorayaki" 
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
            onClick={handleDelete}
          >
            Remove Dorayaki
          </p>
      </div>
    </div>
  )
}

export default DorayakiCard;