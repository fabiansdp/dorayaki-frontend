import React, { useEffect, useState } from "react";
import { updateInventory, addInventory } from "../../utils/shop";
import { ShopInventory as Inventory } from "../../interfaces/shop";
import { useParams } from "react-router";
import InputField from "../InputField";
import Modal from "../Modal";
import FilledButton from "../FilledButton";

interface Props {
  shopInventory: Inventory[];
  setSuccess: (arg: boolean) => void;
}

const ShopInventory : React.FC<Props> = ({shopInventory, setSuccess}) => {
  const fields = ['No.', 'Rasa', 'Quantity', 'Action'];
  const { id } = useParams<{id: string}>();
  const [error, setError] = useState<string | null>();
  const [quantity, setQuantity] = useState<string | undefined>();
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<number | null>();

  const handleUpdate = () => {
    updateInventory({
      dorayaki_id: selected!, 
      quantity: parseInt(quantity!)
    }, id)
      .then((res) => {
        setQuantity(undefined)
        setSuccess(true)
        setShow(false)
      })
      .catch((err) => {
        console.log(err)
        setError(err.message)
      })
  }

  return (
    <div className="table w-full p-2">
      {show? 
        <Modal setShow={setShow} title={`Edit Inventory Quantity`}>
          <InputField value={quantity} setValue={setQuantity} isEdit={true} title="New Quantity" type="number" />
          <div className="flex justify-center text-base font-bold text-white p-2">
            <FilledButton 
              name="Cancel"
              submit={false}
              handleClick={() => {
                setQuantity(undefined)
                setShow(false)
              }}
            />
            <FilledButton 
              name="Submit"
              submit={true}
              background="#4CAF50"
              handleClick={handleUpdate}
            />
          </div>
        </Modal> 
      : null}
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
          {shopInventory && shopInventory.length > 0 && shopInventory.map((item, index) => (
            <tr className="bg-gray-100 hover:bg-gray-200 text-center border-b text-base text-gray-600" key={index}>
              <td className="p-5 border-r">{index+1}.</td>
              <td className="p-5 border-r">{item.rasa}</td>
              <td className="p-5 border-r">{item.quantity}</td>
              <td className="p-5">
                <div className="flex justify-center text-base font-bold text-white p-2">
                  <p 
                    className="cursor-pointer bg-blue-500 p-2 mx-2 rounded-lg" 
                    onClick={() => {
                      setQuantity(item.quantity.toString())
                      setSelected(item.id)
                      setShow(true)
                    }}
                  >
                    Edit Quantity
                  </p>
                  <p 
                    className="cursor-pointer bg-yellow-500 p-2 mx-2 rounded-lg" 
                    onClick={() => console.log()}
                  >
                    Move Inventory
                  </p>
                  <p 
                    className="cursor-pointer bg-red-500 p-2 mx-2 rounded-lg" 
                    onClick={() => console.log()}
                  >
                    Delete
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )    
}

export default ShopInventory;