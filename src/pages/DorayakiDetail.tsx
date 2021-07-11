import React from "react";
import { useParams } from "react-router";

const DorayakiDetail : React.FC = () => {
  const { id } = useParams<{id?: string}>();

  return (
    <div>
      <p>Dorayaki : {id}</p>  
    </div>
  );
};

export default DorayakiDetail;