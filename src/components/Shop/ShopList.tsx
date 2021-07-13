import React, { useEffect, useState } from "react";
import { getShops } from "../../utils/shop";

const ShopList : React.FC = () => {
  const fields = ['No.', 'Nama', 'Jalan', 'Kecamatan', 'Provinsi', 'Action'];
  const [shops, setShops] = useState<ShopInfo[]>([]);

  useEffect(() => {
    getShops().then((res) => setShops(res)).catch(err => console.log(err));
  }, []);
  
  return (
    <div className="table w-full p-2">
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
          {shops.map((shop, index) => (
            <tr className="bg-gray-100 cursor-pointer text-center border-b text-sm text-gray-600" key={index}>
              <td className="p-5 border-r">{index+1}.</td>
              <td className="p-5 border-r">{shop.nama}</td>
              <td className="p-5 border-r">{shop.jalan}</td>
              <td className="p-5 border-r">{shop.kecamatan}</td>
              <td className="p-5 border-r">{shop.provinsi}</td>
              <td>
                <a href="#" className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin rounded-lg">View</a>
                <a href="#" className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin rounded-lg">Edit</a>
                <a href="#" className="bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin rounded-lg">Remove</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ShopList;