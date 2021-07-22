import React, { useEffect, useState } from "react";
import { updateInventory, addInventory } from "../../utils/shop";
import { ShopInventory as Inventory } from "../../interfaces/shop";
import { useParams } from "react-router";
import { getDorayakis } from "../../utils/dorayaki";
import InputField from "../InputField";
import Modal from "../Modal";
import FilledButton from "../FilledButton";
import SelectField from "../SelectField";

interface Props {
  shopInventory: Inventory[];
  setSuccess: (arg: boolean) => void;
}

const ShopInventory : React.FC<Props> = ({shopInventory, setSuccess}) => {
  const fields = ['No.', 'Rasa', 'Quantity', 'Action'];
  const { id } = useParams<{id: string}>();
  const [error, setError] = useState<string | null>();
  const [quantity, setQuantity] = useState<string | undefined>();
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [dorayakiList, setDorayakiList] = useState<Dorayaki[]>([]);
  const [selected, setSelected] = useState<number | undefined>();

  const getDorayakiList = () => {
    getDorayakis().then((res) => setDorayakiList(res.data))
  }
  
  const updateModal = () => {
    return (
      <Modal setShow={setShowUpdate} title={`Edit Inventory Quantity`}>
        <InputField value={quantity} setValue={setQuantity} isEdit={true} title="New Quantity" type="number" />
        <div className="flex justify-center text-base font-bold text-white p-2">
          <FilledButton 
            name="Cancel"
            submit={false}
            handleClick={() => {
              setQuantity(undefined)
              setShowUpdate(false)
              setSelected(undefined)
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
    )
  }

  const addModal = () => {
    return (
      <Modal setShow={setShowAdd} title={`Add Dorayaki`}>
        <SelectField value={selected} setValue={setSelected} choices={dorayakiList} />
        <InputField value={quantity} setValue={setQuantity} isEdit={true} title="Quantity" type="number" />
        <div className="flex justify-center text-base font-bold text-white p-2">
          <FilledButton 
            name="Cancel"
            submit={false}
            handleClick={() => {
              setQuantity(undefined)
              setShowAdd(false)
              setSelected(undefined)
            }}
          />
          <FilledButton 
            name="Submit"
            submit={true}
            background="#4CAF50"
            handleClick={handleAdd}
          />
        </div>
      </Modal> 
    )
  }

  const handleUpdate = () => {
    if (selected && quantity) {
      updateInventory({
        dorayaki_id: selected, 
        quantity: parseInt(quantity)
      }, id)
        .then(() => {
          setQuantity(undefined)
          setSuccess(true)
          setShowUpdate(false)
          setSelected(undefined)
        })
        .catch((err) => {
          setError(err.message)
        })
    }
  }

  const handleAdd = () => {
    if (quantity && selected) {
      addInventory({
        dorayaki_id: selected,
        shop_id: parseInt(id),
        quantity: parseInt(quantity),
      })
      .then((res) => {
        console.log(res)
        setQuantity(undefined)
        setSuccess(true)
        setShowAdd(false)
        setSelected(undefined)
      })
      .catch((err) => {
        setError(err.message)
      })
    }
  }

  const showAddModal = () => {
    setShowAdd(true);
    setQuantity(undefined);
    getDorayakiList();
  }

  return (
    <div className="table w-full p-2 my-10">
      {showUpdate ? updateModal() : null}
      {showAdd ? addModal() : null}
      <FilledButton 
        name="+ Add Dorayaki" 
        submit={false} 
        handleClick={showAddModal}
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
                      setShowUpdate(true)
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