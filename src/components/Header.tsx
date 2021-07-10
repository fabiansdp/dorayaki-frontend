import React from "react";

interface Props {
  title: string
}

const Header : React.FC<Props> = ({title}) => {
  return (
    <>
      <div className="text-center p-4">
        <h1 className="text-4xl">{title}</h1>
      </div>
    </>
  )
}

export default Header;