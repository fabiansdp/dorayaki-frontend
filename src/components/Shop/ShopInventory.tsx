import React, { useState } from "react";
import { updateInventory, addInventory, moveInventory, getShops, deleteInventory } from "../../utils/shop";
import { ShopInfo, ShopInventory as Inventory } from "../../interfaces/shop";
import { useParams } from "react-router";
import { getDorayakis } from "../../utils/dorayaki";
import InputField from "../InputField";
import Modal from "../Modal";
import FilledButton from "../FilledButton";
import SelectDorayaki from "../Dorayaki/SelectDorayaki";
import SelectShop from "../Shop/SelectShop";
import Alert from "../Alert";

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
  const [showMove, setShowMove] = useState(false);
  const [dorayakiList, setDorayakiList] = useState<Dorayaki[]>([]);
  const [shopList, setShopList] = useState<ShopInfo[]>([]);
  const [selected, setSelected] = useState<number | undefined>();
  const [recipient, setRecipient] = useState<number | undefined>();

  const getDorayakiList = () => {
    getDorayakis().then((res) => setDorayakiList(res.data))
  }

  const getShopList = () => {
    getShops().then((res) => setShopList(res.data))
  }
  
  const handleUpdate = () => {
    if (selected && quantity) {
      updateInventory({
        dorayaki_id: selected, 
        quantity: parseInt(quantity)
      }, id)
        .then(() => {
          setSuccess(true)
          setShowUpdate(false)
          setQuantity(undefined)
          setSelected(undefined)
        })
        .catch((err) => {
          setError(err.message)
        })
    } else {
      setError("Ada field kosong")
    }
  }

  const handleAdd = () => {
    if (quantity && selected) {
      addInventory({
        dorayaki_id: selected,
        shop_id: parseInt(id),
        quantity: parseInt(quantity),
      })
      .then(() => {
        setSuccess(true)
        setShowAdd(false)
        setQuantity(undefined)
        setSelected(undefined)
      })
      .catch((err) => {
        setError(err.message)
      })
    } else {
      setError("Ada field kosong")
    }
  }

  const handleMove = () => {
    if (quantity && selected && recipient) {
      moveInventory({
        dorayaki_id: selected,
        recipient_id: recipient,
        quantity: parseInt(quantity)
      }, id)
      .then(() => {
        setSuccess(true)
        setShowMove(false)
        setQuantity(undefined)
        setSelected(undefined)
        setRecipient(undefined)
      })
      .catch((err) => {
        setError(err.message)
        setShowMove(false)
      })
    } else {
      setError("Ada field kosong")
    }
  }

  const handleDelete = (itemID: number) => {
    deleteInventory(itemID, id)
    .then(() => {
      setSuccess(true)
    })
    .catch((err) => {
      setError(err.message)
    })
  }

  const showEditModal = (itemID : number) => {
    setSelected(itemID)
    setShowUpdate(true)
  }

  const showMoveModal = (itemID : number) => {
    setSelected(itemID);
    setShowMove(true);
    setQuantity(undefined);
    setRecipient(undefined);
    getShopList();
  }

  const showAddModal = () => {
    setShowAdd(true);
    setQuantity(undefined);
    getDorayakiList();
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
              setError(null)
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
        {showUpdate && error && <Alert error={error} setError={setError} />}
      </Modal> 
    )
  }

  const addModal = () => {
    return (
      <Modal setShow={setShowAdd} title={`Add Dorayaki`}>
        <SelectDorayaki value={selected} setValue={setSelected} choices={dorayakiList} />
        <InputField value={quantity} setValue={setQuantity} isEdit={true} title="Quantity" type="number" />
        <div className="flex justify-center text-base font-bold text-white p-2">
          <FilledButton 
            name="Cancel"
            submit={false}
            handleClick={() => {
              setError(null)
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
        {showAdd && error && <Alert error={error} setError={setError} />}
      </Modal> 
    )
  }
  
  const moveModal = () => {
    return (
      <Modal setShow={setShowAdd} title={`Move Inventory`}>
        <SelectShop value={recipient} setValue={setRecipient} choices={shopList.filter((shop) => shop.id != parseInt(id))} />
        <InputField value={quantity} setValue={setQuantity} isEdit={true} title="Quantity" type="number" />
        <div className="flex justify-center text-base font-bold text-white p-2">
          <FilledButton 
            name="Cancel"
            submit={false}
            handleClick={() => {
              setError(null)
              setShowMove(false)
              setQuantity(undefined)
              setRecipient(undefined)
              setSelected(undefined)
            }}
          />
          <FilledButton 
            name="Submit"
            submit={true}
            background="#4CAF50"
            handleClick={handleMove}
          />
        </div>
        {showMove && error && <Alert error={error} setError={setError} />}
      </Modal> 
    )
  }

  return (
    <div className="table w-full p-2 my-10">
      {showUpdate ? updateModal() : null}
      {showAdd ? addModal() : null}
      {showMove ? moveModal() : null}
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
                      showEditModal(item.id)
                    }}
                  >
                    Edit Quantity
                  </p>
                  <p 
                    className="cursor-pointer bg-yellow-500 p-2 mx-2 rounded-lg" 
                    onClick={() => {
                      showMoveModal(item.id)
                    }}
                  >
                    Move Inventory
                  </p>
                  <p 
                    className="cursor-pointer bg-red-500 p-2 mx-2 rounded-lg" 
                    onClick={() => handleDelete(item.id)}
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