import React, { useEffect, useState } from "react";
import { updateInventory, addInventory } from "../../utils/shop";
import { ShopInventory as Inventory } from "../../interfaces/shop";
import { useParams } from "react-router";
import InputField from "../InputField";

interface Props {
  shopInventory: Inventory[];
}

const ShopInventory : React.FC<Props> = ({shopInventory}) => {
  const fields = ['No.', 'Rasa', 'Quantity', 'Action'];
  const { id } = useParams<{id: string}>();
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number | null>();
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log(quantity)
  }, [quantity])
  
  const inputField = () => {
    return (
      <input 
        type="number" 
        onChange={(evt) => {
          setQuantity(evt.target.valueAsNumber);
        }} 
        placeholder="Jumlah Item"
        min="0"
      />
    )
  }

  const handleUpdate = (itemId: number) => {
    updateInventory({
      dorayaki_id: itemId, 
      quantity: quantity!
    }, id)
      .then((res) => {
        
      })
      .catch((err) => {
        setError(err.message)
      })
  }

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
                    className="cursor-pointer bg-blue-500 p-2 mx-2 text-white font-thin rounded-lg" 
                    onClick={() => {
                      setShow(show)
                    }}
                  >
                    Edit Quantity
                  </p>
                  <p 
                    className="cursor-pointer bg-yellow-500 p-2 mx-2 text-white font-thin rounded-lg" 
                    onClick={() => {
                      addInventory({dorayaki_id: 2, shop_id: id, quantity: 80}).then(res => console.log(res))
                    }}
                  >
                    Move Inventory
                  </p>
                  <p 
                    className="cursor-pointer bg-red-500 p-2 mx-2 text-white font-thin rounded-lg" 
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