import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getShops, deleteShop, createShop } from "../../utils/shop";
import { ShopInfo } from "../../interfaces/shop";
import FilledButton from "../FilledButton";
import Modal from "../Modal";
import InputField from "../InputField";

const ShopList : React.FC = () => {
  const fields = ['No.', 'Nama', 'Jalan', 'Kecamatan', 'Provinsi', 'Action'];
  const [shops, setShops] = useState<ShopInfo[]>([]);
  const [edited, setEdited] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState<string | undefined>();
  const [jalan, setJalan] = useState<string | undefined>();
  const [kecamatan, setKecamatan] = useState<string | undefined>();
  const [provinsi, setProvinsi] = useState<string | undefined>();

  useEffect(() => {
    getShops()
      .then((res) => {
        setShops(res.data);
        setEdited(false);
      })
      .catch((err) => {
        console.log(err)
      })
    
  }, [edited]);

  const handleDelete = (id: number) => {
    deleteShop(id)
      .then(() => {
        setEdited(true);
      })
      .catch((err) => console.log(err))
  }

  const resetFields = () => {
    setName(undefined)
    setJalan(undefined)
    setKecamatan(undefined)
    setProvinsi(undefined)
  }

  const handleSubmit = () => {
    if (name && jalan && kecamatan && provinsi) {
      createShop({
        nama: name,
        jalan: jalan,
        kecamatan: kecamatan,
        provinsi: provinsi
      })
      .then(() => {
        resetFields();
        setEdited(true);
        setShowModal(false);
      })
      .catch((err) => console.log(err));
    }
  }

  return (
    <>
      {showModal? 
        <Modal setShow={setShowModal} title={`Create A Shop`}>
          <div>
            <InputField value={name} setValue={setName} isEdit={true} title="Nama" />
            <InputField value={jalan} setValue={setJalan} isEdit={true} title="Alamat" />
            <InputField value={kecamatan} setValue={setKecamatan} isEdit={true} title="Kecamatan" />
            <InputField value={provinsi} setValue={setProvinsi} isEdit={true} title="Provinsi" />
          </div>
          <div className="flex justify-center text-base font-bold text-white p-2">
            <FilledButton 
              name="Cancel"
              submit={false}
              handleClick={() => {
                resetFields()
                setShowModal(!showModal)
              }}
            />
            <FilledButton 
              name="Submit"
              submit={true}
              background="#4CAF50"
              handleClick={handleSubmit}
            />
          </div>
        </Modal> 
      : null}
      <div className="table w-full p-2">
        <FilledButton 
          name="+ Add Shop"
          submit={false}
          handleClick={() => setShowModal(!showModal)}
        />
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-gray-50 border-b">
              {fields.map((field, index) => (
                <th className="p-2 border-r text-sm font-bold text-black" key={index}>
                  <div className="flex items-center justify-center">
                    {field}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shops.length > 0 && shops.map((shop, index) => (
              <tr className="bg-gray-100 hover:bg-gray-200 text-center border-b text-sm text-gray-600" key={index}>
                <td className="p-5 border-r">{index+1}.</td>
                <td className="p-5 border-r">{shop.nama}</td>
                <td className="p-5 border-r">{shop.jalan}</td>
                <td className="p-5 border-r">{shop.kecamatan}</td>
                <td className="p-5 border-r">{shop.provinsi}</td>
                <td className="p-5 text-base font-bold text-white flex justify-center items-center">
                  <Link to={`/shops/${shop.id}`}>
                    <p className="bg-yellow-400 p-2 rounded-lg">View</p>
                  </Link>
                  <p 
                    className="cursor-pointer bg-red-500 p-2 rounded-lg" 
                    onClick={() => {
                      handleDelete(shop.id)
                    }}
                  >
                    Remove
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {shops.length === 0 && 
          <div className="text-center w-full m-5">
            <p>No Shops Available</p>
          </div>
        }
      </div>
    </>
  )
}

export default ShopList;