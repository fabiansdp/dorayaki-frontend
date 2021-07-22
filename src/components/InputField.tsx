import React from "react";
import "../styles/style.css";

interface Props {
  type?: string;
  value: string | undefined;
  setValue: (newValue: string) => void;
  placeholder?: string;
  isEdit: boolean;
  title: string;
}

const InputField: React.FC<Props> = ({
  type = "text",
  value,
  setValue,
  placeholder,
  isEdit,
  title
}) => {
  return (
    <div>
      <div className="title">{title}</div>
      <input
        className="inputBox"
        style={{border: isEdit ? "" : "black"}}
        type={type}
        value={value}
        onChange={(evt) => {
          setValue(evt.target.value);
        }}
        placeholder={placeholder}
        disabled={isEdit ? false : true}
        min={0}
      />
    </div>
  );
};

export default InputField;