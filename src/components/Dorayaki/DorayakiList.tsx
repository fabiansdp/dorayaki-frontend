import React, { useEffect, useState } from "react";
import { createDorayaki, getDorayakis } from "../../utils/dorayaki";
import DorayakiCard from "./DorayakiCard";
import FilledButton from "../FilledButton";
import Modal from "../Modal";
import InputField from "../InputField";
import TextArea from "../TextArea";
import FileInput from "../FileInput";
import Alert from "../Alert";
import { Dorayaki } from "../../interfaces/dorayaki";

const DorayakiList : React.FC = () => {
  const [dorayakis, setDorayakis] = useState<Dorayaki[]>([]);
  const [rasa, setRasa] = useState<string | undefined>();
  const [deskripsi, setDeskripsi] = useState<string | undefined>();
  const [image, setImage] = useState<File | null>(null);
  const [edited, setIsEdited] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    if (rasa && deskripsi && image) {
      createDorayaki({
        rasa: rasa,
        deskripsi: deskripsi,
        gambar: image
      })
      .then(() => {
        setIsEdited(true)
        setShowModal(false)
      })
      .catch((err) => setError(err.message))
    } else {
      setError("Ada field kosong")
    }
  }

  const dorayakiModal = () => {
    return (
      <Modal setShow={setShowModal} title={`Add Dorayaki Variant`}>
        <div className="p-3 m-3">
          <InputField value={rasa} setValue={setRasa} isEdit={true} title="Rasa" />
          <TextArea value={deskripsi} setValue={setDeskripsi} title="Deskripsi" />
          <FileInput setValue={setImage} disabled={false} title="Upload foto" />
        </div>
        <div className="flex justify-center text-base font-bold text-white p-2">
          <FilledButton 
            name="Cancel"
            submit={false}
            handleClick={() => {
              setError(null)
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
        {showModal && error && <Alert error={error} setError={setError} />}
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
        {!showModal && error && <Alert error={error} setError={setError} />}
        <div className="mt-5 flex flex-wrap justify-center items-center">
          {dorayakis.map((dorayaki, index) => (
            <DorayakiCard 
              key={index}
              id={dorayaki.id}
              name={dorayaki.rasa}
              description={dorayaki.deskripsi}
              gambar={dorayaki.gambar}
              setIsEdited={setIsEdited}
              setError={setError}
              error={error}
            />
          ))}
          {!dorayakis.length && <p>Tidak ada dorayaki</p>}
        </div>
      </div>
    </>
  )
}

export default DorayakiList;