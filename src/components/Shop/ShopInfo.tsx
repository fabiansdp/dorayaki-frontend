import React from "react";

interface Props {
  shopInfo?: ShopInfo;
}

const ShopInfo : React.FC<Props> = ({shopInfo}) => {
  return (
    <div>
      <p>Nama: {shopInfo?.nama}</p>
      <p>Alamat: {shopInfo?.jalan}</p>
      <p>Kecamatan: {shopInfo?.kecamatan}</p>  
      <p>Provinsi: {shopInfo?.provinsi}</p>
      <p>Updated at: {shopInfo?.updated_at}</p>
      <p>Created at: {shopInfo?.created_at}</p>
    </div> 
  )
} 

export default ShopInfo;