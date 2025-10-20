import React from "react";
import { PhotoItem } from "../photoItem/PhotoItem";
import "./SelectedClothes.css";
import { Shoes } from "../shoes/Shoes";

export function SelectedClothes({
  photos,
  selectClothingItem,
  shoes,
  setShoes,
}) {
  return (
    <div className="selectedClothes">
      <div className="wardrobe">
        <p className="title">Wardrobe</p>
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
      </div>
      <Shoes value={shoes} setValue={setShoes} />
    </div>
  );
}
