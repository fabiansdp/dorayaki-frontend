import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { updateShop } from "../../utils/shop";
import { ShopInfo as Info } from "../../interfaces/shop";
import FilledButton from "../FilledButton";
import InputField from "../InputField";

interface Props {
  shopInfo?: Info;
  setSuccess: (arg: boolean) => void;
}

const ShopInfo : React.FC<Props> = ({shopInfo, setSuccess}) => {
  const { id } = useParams<{id: string}>();
  const [error, setError] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(shopInfo?.nama);
  const [jalan, setJalan] = useState(shopInfo?.jalan);
  const [kecamatan, setKecamatan] = useState(shopInfo?.kecamatan);
  const [provinsi, setProvinsi] = useState(shopInfo?.provinsi);

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
    setName(shopInfo?.nama);
    setJalan(shopInfo?.jalan);
    setKecamatan(shopInfo?.kecamatan);
    setProvinsi(shopInfo?.provinsi);
  }

  const handleSubmit = () => {
    updateShop({
      nama: name,
      jalan: jalan,
      kecamatan: kecamatan,
      provinsi: provinsi
    }, id)
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
    <div className="p-2 m-5">
      <h2>Nama</h2>
      {!isEdit ?
        <p>{shopInfo?.nama}</p>
        : <InputField value={name} setValue={setName} isEdit={isEdit} 
      />
      }
      <h2>Alamat</h2>
      {!isEdit ? <p>{shopInfo?.jalan}</p>
        : <InputField value={jalan} setValue={setJalan} isEdit={isEdit} 
      />}
      <h2>Kecamatan</h2>  
      {!isEdit ? <p>{shopInfo?.kecamatan}</p>
        : <InputField value={kecamatan} setValue={setKecamatan} isEdit={isEdit} 
      />}
      <h2>Provinsi</h2>
      {!isEdit ? <p>{shopInfo?.provinsi}</p>
        : <InputField value={provinsi} setValue={setProvinsi} isEdit={isEdit} 
      />}
      <h2>Updated at: {formatDate(shopInfo?.updated_at)}</h2>
      <h2>Created at: {formatDate(shopInfo?.created_at)}</h2>
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