import React, { useEffect, useState } from "react";
import { getDorayakis } from "../../utils/dorayaki";
import DorayakiCard from "./DorayakiCard";

const DorayakiList : React.FC = () => {
  const [dorayakis, setDorayakis] = useState<Dorayaki[]>([]);

  useEffect(() => {
    getDorayakis()
      .then(response => {
        setDorayakis(response);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <div className="mt-20 flex flex-wrap justify-center items-center">
      {dorayakis.map((dorayaki) => (
        <DorayakiCard 
          id={dorayaki.id}
          name={dorayaki.rasa}
          description={dorayaki.deskripsi}
        />
      ))}
    </div>
  )
}

export default DorayakiList;