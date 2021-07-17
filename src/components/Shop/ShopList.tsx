import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getShops, deleteShop } from "../../utils/shop";
import FilledButton from "../FilledButton";

const ShopList : React.FC = () => {
  const fields = ['No.', 'Nama', 'Jalan', 'Kecamatan', 'Provinsi', 'Action'];
  const [shops, setShops] = useState<ShopInfo[]>([]);
  const history = useHistory();

  useEffect(() => {
    getShops()
      .then((res) => setShops(res.data))
  }, []);

  const handleDelete = (id: number) => {
    deleteShop(id)
      .then((res) => console.log(res))
  }

  const handleButton = () => {
    history.push("/create-shop");
  }

  return (
    <div className="table w-full p-2">
      <FilledButton 
        name="+ Add Shop"
        submit={false}
        handleClick={handleButton}
      />
      <table className="w-full border">
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
              <td className="p-5 flex justify-center items-center">
                <Link to={`/shops/${shop.id}`}>
                  <p className="bg-yellow-400 p-2 text-white text-xs font-thin rounded-lg">View</p>
                </Link>
                <p 
                  className="cursor-pointer bg-red-500 p-2 text-white text-xs font-thin rounded-lg" 
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
  )
}

export default ShopList;