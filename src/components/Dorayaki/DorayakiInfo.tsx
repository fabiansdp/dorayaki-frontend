import React, { useState } from "react";
import InputField from "../InputField";
import FilledButton from "../FilledButton";

interface Props {
  dorayaki: Dorayaki
}

const DorayakiInfo: React.FC<Props> = ({dorayaki}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [rasa, setRasa] = useState(dorayaki.rasa);
  const [deskripsi, setDeskripsi] = useState(dorayaki.deskripsi);

  return (
    <>
      <div className="block md:flex justify-center">
        <div className="p-3 md:p-5 flex justify-center">
          <img 
            className="w-3/4 min-w-0"
            src="/dorayaki.svg" 
            alt="Foto Dorayaki" 
          />
        </div>
        <div className="p-5 flex flex-col justify-center">
          <InputField value={rasa} setValue={setRasa} isEdit={isEdit} title="Rasa" />
          <InputField value={deskripsi} setValue={setDeskripsi} isEdit={isEdit} title="Deskripsi" />
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
            // handleClick={handleSubmit}
          />
        }
      </div>
    </>
  )
}

export default DorayakiInfo;