import React from "react";
import "../styles/style.css";

interface Props {
  title: string;
  setValue: (newValue: File) => void;
  disabled?: boolean;
}

const FileInput: React.FC<Props> = ({
  title,
  setValue,
  disabled= true
}) => {
  return (
    <div className="text-area my-3">
    <div className="title">{title}</div>
      <input 
        type="file" 
        onChange={(e) => (e.target.files && e.target.files.length ? setValue(e.target.files[0]) : null)} 
        disabled={disabled}
        accept='image/png, image/jpeg'
      />
    </div>
  );
};

export default FileInput;