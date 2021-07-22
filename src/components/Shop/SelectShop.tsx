import React from 'react';
import { ShopInfo } from '../../interfaces/shop';
import '../../styles/style.css';

interface Props {
  value: number | undefined;
  setValue: (newValue: number) => void;
  choices: ShopInfo[];
}

const SelectShop: React.FC<Props> = ({
  value,
  setValue,
  choices
}) => {
  return (
    <select
      className="inputBox"
      value={value}
      onChange={(e) => { 
        setValue(parseInt(e.target.value))
      }}>
      <option>Select Shop</option>
      {choices.map((choice, index) => (
        <option value={choice.id} key={index}>{choice.nama}</option>
      ))}
    </select>
  );
};

export default SelectShop;