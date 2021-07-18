import React, { useState } from "react";
import { useParams } from "react-router";
import { updateShop } from "../../utils/shop";
import FilledButton from "../FilledButton";
import InputField from "../InputField";

interface Props {
  shopInfo?: ShopInfo;
  setSuccess: (arg: boolean) => void;
}

const ShopInfo : React.FC<Props> = ({shopInfo, setSuccess}) => {
  const [error, setError] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams<{id: string}>();

  const formatDate = (date?: string) => {
    const transformedDate = new Date(date ? date : "");
    const year = transformedDate.getFullYear();
    let month = transformedDate.getMonth()+1;
    let dt = transformedDate.getDate();
    const dateString = (dt < 10 ? '0' + dt.toString() : dt.toString());
    const monthString = (month < 10 ? '0' + month.toString() : month.toString());
    const time = transformedDate.getHours() + ":" + transformedDate.getMinutes();

    return `${dateString}-${monthString}-${year} ${time} WIB`;
  }

  const handleEdit = () => {
    setIsEdit(!isEdit);
  }

  const handleSubmit = () => {
    updateShop({provinsi:"Jawa Tengah"}, id)
      .then((res) => {
        if (res.status) {
          setSuccess(true);
          setIsEdit(false);
        }
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return (
    <div className="p-2 my-5">
      <p>Nama: {shopInfo?.nama}</p>
      <p>Alamat: {shopInfo?.jalan}</p>
      <p>Kecamatan: {shopInfo?.kecamatan}</p>  
      <p>Provinsi: {shopInfo?.provinsi}</p>
      <p>Updated at: {formatDate(shopInfo?.updated_at)}</p>
      <p>Created at: {formatDate(shopInfo?.created_at)}</p>
      <FilledButton 
        name={!isEdit ? `Edit` : `Cancel`}
        submit={false}
        handleClick={handleEdit}
      />
      {isEdit && 
        <FilledButton 
          name="Submit"
          submit={true}
          handleClick={handleSubmit}
        />
      }
    </div> 
  )
} 

export default ShopInfo;