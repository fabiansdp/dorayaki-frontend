import React from 'react';

interface Props {
  handleClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  name: string,
  submit: boolean,
  background?: string,
  width?: string,
  color?: string
}

const FilledButton : React.FC<Props> = ({handleClick, name, submit, background = "red", width, color = "white"}) => {
  return (
    <button
      className="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type={submit ? "submit" : "button"}
      style={{background: background, width: width, color: color}}
      onClick={handleClick}
    >
      {name}
    </button>
  )
}

export default FilledButton;