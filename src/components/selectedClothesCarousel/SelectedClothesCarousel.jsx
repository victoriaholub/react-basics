import React, { useState } from "react";
import { Button, Radio } from "antd";
import { PhotoItem } from "../photoItem/PhotoItem";

import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import "./SelectedClothesCarousel.css";
import { Shoes } from "../shoes/Shoes";

export function SelectedClothesCarousel({ photos, shoes, setShoes, title, selectClothingItem }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="selectedClothesCarousel">
      <div>
        <Button
          type="text"
          icon={isOpen ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          onClick={() => setIsOpen(!isOpen)}
          className="wardrobeSection"
        >
          Hide {title}
        </Button>
      </div>

      {isOpen && (
        <div className="wardrobe">
          <div className="photoList">
            {photos.map((item) => (
              <PhotoItem
                id={item.id}
                src={item.src}
                name={item.name}
                description={item.description}
                selectClothingItem={selectClothingItem}
              />
            ))}
          </div>
          {!!shoes && <Shoes value={shoes} setValue={setShoes} />}
        </div>
      )}
    </div>
  );
}
