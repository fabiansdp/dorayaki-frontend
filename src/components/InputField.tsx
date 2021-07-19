import React from "react";

interface Props {
  type?: string;
  value: string | undefined;
  setValue: (newValue: string) => void;
  placeholder?: string;
  isEdit: boolean
}

const InputField: React.FC<Props> = ({
  type = "text",
  value,
  setValue,
  placeholder,
  isEdit
}) => {
  return (
    <div>
      <input
        className="inputBox"
        type={type}
        value={value}
        onChange={(evt) => {
          setValue(evt.target.value);
        }}
        placeholder={placeholder}
        disabled={isEdit ? false : true}
      />
    </div>
  );
};

export default InputField;