import React from "react";

interface Props {
  image : string
}

const HeroImg : React.FC<Props> = ({image}) => {
  return (
    <div className="flex justify-center content-center mt-10" >
      <img 
        className="flex-shrink"
        src={image} 
        alt="Doremon Hero Image" 
      />
    </div>
  );
};

export default HeroImg;