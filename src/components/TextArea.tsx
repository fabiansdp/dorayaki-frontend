import React from "react";
import "../styles/style.css";

interface Props {
  title: string;
  value: string | undefined;
  setValue: (newValue: string) => void;
  disabled?: boolean;
}

const TextArea: React.FC<Props> = ({
  title,
  value,
  setValue,
  disabled = false
}) => {
  return (
    <div className="text-area my-3">
    <div className="title">{title}</div>
      <textarea
        name="text-area"
        value={value}
        placeholder={title}
        className={disabled ? "disabled" : ""}
        disabled={disabled}
        onChange={(evt) =>
          setValue(evt.target.value)
        }
      />
    </div>
  );
};

export default TextArea;