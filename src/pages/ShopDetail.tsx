import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const ShopDetails : React.FC = () => {
  const { id } = useParams<{id?: string}>();

  return (
    <>
      <p>Shop Detail {id}</p>
    </>
  )
} 

export default ShopDetails;