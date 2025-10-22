import React from "react";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./PhotoItem.css";

export function PhotoItem({
  id,
  src,
  name,
  description,
  selectClothingItem,
  className = "photoItem",
}) {
  const removeSelectedCloth = () => {
    selectClothingItem(id, false);
  };

  return (
    <div className={className}>
      <div
        style={{
          width: "163px",
          backgroundColor: "#F6F6F6",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src={src} alt={name} height="184px" width="auto" />
      </div>
      <Button
        shape="default"
        icon={<DeleteOutlined />}
        onClick={() => removeSelectedCloth(id)}
      />

      <p className="small timesNewRoman nameBrand">{name}</p>
      <p className="small descriptionBrand">{description}</p>
    </div>
  );
}
