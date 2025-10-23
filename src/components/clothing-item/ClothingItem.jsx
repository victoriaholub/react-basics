import React, { useState } from "react";
import { Rate } from "antd";
import { Button } from "antd";
import {
  HeartOutlined,
  SkinOutlined,
  CheckOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import "./ClothingItem.css";

export default function ClothingItem({
  photo,
  id,
  itemSelected,
  selectClothingItem,
}) {

  const handleSelectionToggle = () => {
    const newSelectionState = !itemSelected;
    selectClothingItem(id, newSelectionState);
  };

  return (
    <div className="clothingItem">
      <div className="photo">
        <img src={photo.src} height="336px" width="auto" alt="Clothing Item" />
      </div>
      <div className="selection">
        <Button shape="default" icon={<HeartOutlined />} />

        <Button
          icon={itemSelected ? <CheckOutlined /> : <SkinOutlined />}
          color="default"
          variant={itemSelected ? "solid" : "outlined"}
          onClick={() => handleSelectionToggle()}
        >
          Try On
        </Button>
      </div>
      <div>
        <p className="small sposnsored">
          Sponsored <InfoCircleOutlined />
        </p>
        <p className="brand medium timesNewRoman"> {photo?.brand}</p>
        <p className="model big"> {photo?.model} </p>

        <div>
          <Rate
            disabled
            defaultValue={4}
            style={{ color: "black", margin: "8px 0px" }}
          />
          <span>(5)</span>
        </div>

        <p className="big" style={{ color: "#F5222D" }}>
          {" "}
          {!!photo?.price ? photo.price : "$49.00"}{" "}
        </p>
      </div>
    </div>
  );
}
