import React from 'react';

interface Props {
  handleClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  name: string,
  submit: boolean,
  background?: string,
  width?: string,
  color?: string
}

const FilledButton : React.FC<Props> = ({handleClick, name, submit, background = "red", width = "100px", color = "white"}) => {
  return (
    <button 
      onClick={handleClick}
      type={submit ? "submit" : "button"}
      style={{background: background, width: width, color: color}}
      className="p-2 my-5 text-white text-xs font-bold rounded-lg"
    >
      {name}
    </button>
  )
}

export default FilledButton;