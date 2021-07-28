import React from "react";
import Modal from "./Modal";
import FilledButton from "./FilledButton";
import Alert from "./Alert";

interface Props {
  setShow: (show : boolean) => void;
  handleSubmit: () => void;
  error: string | null;
  setError: (newValue: string | null) => void;
}

const ConfirmModal : React.FC<Props> = ({setShow, handleSubmit, error, setError}) => {
  return (
    <Modal setShow={setShow} title="Confirm Delete">
      <h1 className="text-lg m-2">Apakah anda yakin?</h1>
      <div className="flex justify-center text-base font-bold text-white p-2">
        <FilledButton 
          name="Cancel"
          submit={false}
          handleClick={() => {
            setShow(false)
            setError(null)
          }}
        />
        <FilledButton 
          name="Delete"
          submit={true}
          background="#4CAF50"
          handleClick={handleSubmit}
        />
      </div>
      {error && <Alert error={error} setError={setError}/>}
    </Modal>
  )
}

export default ConfirmModal;