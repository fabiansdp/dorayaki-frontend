import React, { useEffect, useState } from "react";
import { getDorayakis } from "../../utils/dorayaki";
import DorayakiCard from "./DorayakiCard";
import FilledButton from "../FilledButton";

const DorayakiList : React.FC = () => {
  const [dorayakis, setDorayakis] = useState<Dorayaki[]>([]);
  const [edited, setIsEdited] = useState(false);

  useEffect(() => {
    setIsEdited(false)
    getDorayakis()
    .then(response => setDorayakis(response.data))
  }, [edited])
  
  return (
    <div className="p-2 text-center">
      <FilledButton 
        width="200px"
        name="+ Add Dorayaki"
        submit={false}
      />
      <div className="mt-5 flex flex-wrap justify-center items-center">
        {dorayakis.map((dorayaki, index) => (
          <DorayakiCard 
            key={index}
            id={dorayaki.id}
            name={dorayaki.rasa}
            description={dorayaki.deskripsi}
            setIsEdited={setIsEdited}
          />
        ))}
      </div>
    </div>
  )
}

export default DorayakiList;