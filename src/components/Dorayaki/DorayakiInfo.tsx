import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { updateDorayaki } from "../../utils/dorayaki";
import InputField from "../InputField";
import FilledButton from "../FilledButton";
import TextArea from "../TextArea";
import FileInput from "../FileInput";

interface Props {
  dorayaki: Dorayaki;
  setReload: (arg: boolean) => void
}

const DorayakiInfo: React.FC<Props> = ({dorayaki, setReload}) => {
  const { VITE_BACKEND_URL }= import.meta.env;
  const { id } = useParams<{id: string}>();
  const [isEdit, setIsEdit] = useState(false);
  const [rasa, setRasa] = useState(dorayaki.rasa);
  const [deskripsi, setDeskripsi] = useState(dorayaki.deskripsi);
  const [path, setPath] = useState(`${VITE_BACKEND_URL}/file/${dorayaki.gambar}`)
  const [image, setImage] = useState<File | undefined>();
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    setPath(`${VITE_BACKEND_URL}/file/${dorayaki.gambar}`);
  }, [dorayaki])

  const handleSubmit = () => {
    updateDorayaki({
      rasa: rasa,
      deskripsi: deskripsi,
      gambar: image
    }, id)
    .then(() => {
      setIsEdit(false)
      setReload(true)
    })
    .catch((err) => setError(err.message))
  }

  return (
    <>
      <div className="block md:flex h-1/2 md:h-screen justify-center">
        <div className="p-3 md:p-5 h-full">
          <img 
            className="h-full"
            src={path}
            alt="Foto Dorayaki" 
          />
        </div>
        <div className="p-5 flex flex-col justify-center">
          <InputField value={rasa} setValue={setRasa} isEdit={isEdit} title="Rasa" />
          <TextArea value={deskripsi} setValue={setDeskripsi} disabled={!isEdit} title="Deskripsi" />
          <FileInput setValue={setImage} disabled={!isEdit} title="Upload foto" />
        </div>
      </div>
      <div className="flex justify-center">
        <FilledButton 
          name={!isEdit ? `Edit` : `Cancel`}
          submit={false}
          handleClick={() => setIsEdit(!isEdit)}
        />
        {isEdit && 
          <FilledButton 
            name="Submit"
            submit={true}
            handleClick={handleSubmit}
          />
        }
      </div>
    </>
  )
}

export default DorayakiInfo;