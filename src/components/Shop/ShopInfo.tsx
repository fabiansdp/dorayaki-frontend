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

  useEffect(() => {
    setName(shopInfo?.nama)
    setJalan(shopInfo?.jalan)
    setKecamatan(shopInfo?.kecamatan)
    setProvinsi(shopInfo?.provinsi)
  }, [shopInfo])

  const formatDate = (date?: string) => {
    const transformedDate = new Date(date ? date : "");
    const year = transformedDate.getFullYear();
    let month = transformedDate.getMonth()+1;
    let dt = transformedDate.getDate();
    const dateString = (dt < 10 ? '0' + dt.toString() : dt.toString());
    const monthString = (month < 10 ? '0' + month.toString() : month.toString());
    const time = transformedDate.getHours() + ":" + (transformedDate.getMinutes() < 10 ? '0' + transformedDate.getMinutes() : transformedDate.getMinutes() < 10);

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
    <div className="shop-info p-2 m-5">
      <div className="mb-5">
        <InputField value={name} setValue={setName} isEdit={isEdit} title="Nama" />
        <InputField value={jalan} setValue={setJalan} isEdit={isEdit} title="Alamat" />
        <InputField value={kecamatan} setValue={setKecamatan} isEdit={isEdit} title="Kecamatan" />
        <InputField value={provinsi} setValue={setProvinsi} isEdit={isEdit} title="Provinsi" />
        <h2>Updated at: {formatDate(shopInfo?.updated_at)}</h2>
        <h2>Created at: {formatDate(shopInfo?.created_at)}</h2>
      </div>
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