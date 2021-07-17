import React from "react";

interface Props {
  shopInventory: ShopInventory[];
}

const ShopInventory : React.FC<Props> = ({shopInventory}) => {
  const fields = ['No.', 'Rasa', 'Quantity', 'Action'];

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
            {shopInventory.length > 0 && shopInventory.map((item, index) => (
              <tr className="bg-gray-100 hover:bg-gray-200 text-center border-b text-sm text-gray-600" key={index}>
                <td className="p-5 border-r">{index+1}.</td>
                <td className="p-5 border-r">{item.rasa}</td>
                <td className="p-5 border-r">{item.quantity}</td>
                <td className="p-5 flex justify-center">
                  <p 
                    className="cursor-pointer bg-red-500 p-2 mx-2 text-white text-xs font-thin rounded-lg" 
                    onClick={() => {
                    }}
                  >
                    Edit Quantity
                  </p>
                  <p 
                    className="cursor-pointer bg-red-500 p-2 mx-2 text-white text-xs font-thin rounded-lg" 
                    onClick={() => {
                    }}
                  >
                    Move Inventory
                  </p>
                  <p 
                    className="cursor-pointer bg-red-500 p-2 mx-2 text-white text-xs font-thin rounded-lg" 
                    onClick={() => {
                    }}
                  >
                    Delete
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )    
}

export default ShopInventory;