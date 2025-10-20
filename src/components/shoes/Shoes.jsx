import React from "react";
import { Radio } from "antd";
import "./Shoes.css";

export function Shoes({ value, setValue }) {
  const shoes = [
    { id: 1, label: "Leave as is", value: "Leave as is" },
    { id: 2, label: "Sneakers", value: "Nike Air Max 90 Sneakers" },
    { id: 3, label: "Boots", value: "Black Chelsea Boots" },
    { id: 4, label: "Slides", value: "Birkenstock Sandals" },
  ];

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <p className="title">Shoes</p>
      <Radio.Group value={value} options={shoes} onChange={onChange} />
    </div>
  );
}
