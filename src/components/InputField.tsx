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
        className={isEdit ? `` : `border-white`}
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