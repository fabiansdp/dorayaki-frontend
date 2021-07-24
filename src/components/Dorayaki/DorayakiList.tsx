import React, { useEffect, useState } from "react";
import { createDorayaki, getDorayakis } from "../../utils/dorayaki";
import DorayakiCard from "./DorayakiCard";
import FilledButton from "../FilledButton";
import Modal from "../Modal";
import InputField from "../InputField";
import TextArea from "../TextArea";

const DorayakiList : React.FC = () => {
  const [dorayakis, setDorayakis] = useState<Dorayaki[]>([]);
  const [rasa, setRasa] = useState<string | undefined>();
  const [deskripsi, setDeskripsi] = useState<string | undefined>();
  const [edited, setIsEdited] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    setIsEdited(false)
    getDorayakis()
    .then((response) => setDorayakis(response.data))
  }, [edited])

  const resetFields = () => {
    setRasa(undefined)
    setDeskripsi(undefined)
  }

  const handleSubmit = () => {
    if (rasa && deskripsi) {
      createDorayaki({
        rasa: rasa,
        deskripsi: deskripsi,
        gambar: "Path"
      })
      .then(() => {
        setIsEdited(true)
        setShowModal(false)
      })
      .catch((err) => setError(err.message))
    }
  }

  const dorayakiModal = () => {
    return (
      <Modal setShow={setShowModal} title={`Add Dorayaki Variant`}>
        <div>
          <InputField value={rasa} setValue={setRasa} isEdit={true} title="Rasa" />
          <TextArea value={deskripsi} setValue={setDeskripsi} disabled={false} title="Deskripsi" />
          <input type="file" />
        </div>
        <div className="flex justify-center text-base font-bold text-white p-2">
          <FilledButton 
            name="Cancel"
            submit={false}
            handleClick={() => {
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
    )
  }
  
  return (
    <>
      {showModal ? dorayakiModal() : null}
      <div className="p-2 text-center">
        <FilledButton 
          width="200px"
          name="+ Add Dorayaki"
          submit={false}
          handleClick={() => {
            resetFields()
            setShowModal(!showModal)
          }}
        />
        <div className="mt-5 flex flex-wrap justify-center items-center">
          {dorayakis.map((dorayaki, index) => (
            <DorayakiCard 
              key={index}
              id={dorayaki.id}
              name={dorayaki.rasa}
              description={dorayaki.deskripsi}
              setIsEdited={setIsEdited}
              setError={setError}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default DorayakiList;