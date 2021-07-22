import React from 'react';
import '../../styles/style.css';

interface Props {
  value: number | undefined;
  setValue: (newValue: number) => void;
  choices: Dorayaki[];
}

const SelectDorayaki: React.FC<Props> = ({
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
      <option>Select Dorayaki</option>
      {choices.map((choice, index) => (
        <option value={choice.id} key={index}>{choice.rasa}</option>
      ))}
    </select>
  );
};

export default SelectDorayaki;