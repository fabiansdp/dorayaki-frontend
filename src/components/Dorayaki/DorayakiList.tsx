import React, { useEffect, useState } from "react";
import { getDorayakis } from "../../utils/dorayaki";
import DorayakiCard from "./DorayakiCard";
import FilledButton from "../FilledButton";

const DorayakiList : React.FC = () => {
  const [dorayakis, setDorayakis] = useState<Dorayaki[]>([]);

  useEffect(() => {
    getDorayakis().then(response => setDorayakis(response)).catch(err => console.log(err))
  }, [])

  return (
    <div className="p-2">
      <FilledButton 
        width="200px"
        name="+ Add Dorayaki"
        submit={false}
      />
      <div className="mt-5 flex flex-wrap justify-center items-center">
        {dorayakis.map((dorayaki) => (
          <DorayakiCard 
            id={dorayaki.id}
            name={dorayaki.rasa}
            description={dorayaki.deskripsi}
          />
        ))}
      </div>
    </div>
  )
}

export default DorayakiList;