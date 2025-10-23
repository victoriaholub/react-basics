import React, { useState } from "react";
import ClothingItem from "../clothing-item/ClothingItem.jsx";
import { Button } from "antd";
import { SkinOutlined } from "@ant-design/icons";
import LookBuilder from "../lookBuilder/LookBuilder.jsx";
import Banner from "../../assets/banner.png";
import "./MainPage.css";
import {
  womenModelDescriptionTop,
  womenModelDescriptionBottom
} from "../../assets/clothes/woman/index.js";
import {
  menModelDescriptionBottom,
  menModelDescriptionTop
} from "../../assets/clothes/man/index.js";

const topClothesDescription =
  "A versatile and comfortable top designed to suit any occasion.";
const bottomClothesDescription =
  "A comfortable and stylish bottom designed for everyday wear.";

const womenClothes1 = womenModelDescriptionTop.map((el, ind) => ({
  ...el,
  id: ind,
  isSelected: false,
  variant: "top",
  description: topClothesDescription,
}));
const womenClothes2 = womenModelDescriptionBottom.map((el, ind) => ({
  ...el,
  id: ind + 10,
  isSelected: false,
  variant: "bottom",
  description: bottomClothesDescription,
}));

;



const menClothes1 = menModelDescriptionTop.map((el, ind) => ({
  ...el,
  id: ind,
  isSelected: false,
  variant: "top",
  description: topClothesDescription,
}));
const menClothes2 = menModelDescriptionBottom.map((el, ind) => ({
  ...el,
  id: ind + 10,
  isSelected: false,
  variant: "bottom",
  description: bottomClothesDescription,
}));

const clothes = {
  men: [...menClothes1, ...menClothes2],
  women: [...womenClothes1, ...womenClothes2],
};


export default function MainPage() {
  const [totalSelectedClothes, setTotalSelectedClothes] = useState(0);
  const [isBuildLookSelected, setisBuildLookSelected] = useState(false);
  const [selectedClothes, setSelectedClothes] = useState([]);
  const [gender, setGender] = useState("women");
  const [clothesState, setClothesState] = useState(clothes[gender]);

  const selectClothingItem = (itemId, isSelected) => {
    setClothesState((prevState) =>
      prevState.map((item) => {
        if (item.id === itemId) {
          return { ...item, isSelected };
        }
        if (
          isSelected &&
          item.variant ===
            prevState.find((clothing) => clothing.id === itemId)?.variant
        ) {
          return { ...item, isSelected: false };
        }
        return item;
      })
    );

    setSelectedClothes((prevSelected) => {
      const selectedItem = clothesState.find(
        (clothing) => clothing.id === itemId
      );
      if (!selectedItem) return prevSelected;

      if (isSelected) {
        const updated = [
          ...prevSelected.filter((c) => c.variant !== selectedItem.variant),
          { ...selectedItem, isSelected: true },
        ];
        setTotalSelectedClothes(updated.length);
        if (updated.length !== 2) {
          setIsBtnVisible(true);
        }
        return updated;
      } else {
        const updated = prevSelected.filter((c) => c.id !== itemId);
        setTotalSelectedClothes(updated.length);
        if (updated.length !== 2) {
          setIsBtnVisible(true);
        }
        return updated;
      }
    });
  };

  const [isBtnVisible, setIsBtnVisible] = useState(true);

  const toggleBuildLookTab = (value) => {
    setisBuildLookSelected(value);
    if (value === true && totalSelectedClothes === 2) {
      setIsBtnVisible(false);
    }
  };

  const toggleClothes = (gender) => {
    setGender(gender);
    setClothesState(clothes[gender]);
    setSelectedClothes([]);
    setTotalSelectedClothes(0);
  };

  return (
    <div className="mainPage">
      {/* main */}
      <div>
        <div className="banner">
          <img src={Banner} width="1035px" />
          <div>
            <div className="genderButtons">
              <Button
                type="text"
                className="genderButton"
                style={{
                  background: gender === "women" ? "#000" : "none",
                  color: gender === "women" ? "#fff" : "#000",
                }}
                onClick={() => toggleClothes("women")}
              >
                Women
              </Button>
              <Button
                type="text"
                style={{
                  background: gender === "men" ? "#000" : "none",
                  color: gender === "men" ? "#fff" : "#000",
                }}
                onClick={() => toggleClothes("men")}
              >
                Men
              </Button>
            </div>
          </div>
        </div>
        <div className="mainSection">
          <div className="headerSection">
            <div>
              <p className="medium roboto">
                <span className="mainMenu">Women /</span> New Arrivals
              </p>
              <h1>New Arrivals</h1>
              <h3 className="timesNewRoman">
                Style Yourself with Personalized AI
              </h3>
            </div>

            {isBtnVisible && (
              <Button
                className="buildLookButton"
                variant="outlined"
                color="default"
                icon={<SkinOutlined />}
                onClick={() => toggleBuildLookTab(true)}
              >
                Build Look ({totalSelectedClothes})
              </Button>
            )}
          </div>

          <div className="clothesList">
            {clothesState.map((item) => (
              <ClothingItem
                key={item.id}
                id={item.id}
                itemSelected={item.isSelected}
                photo={item}
                selectClothingItem={selectClothingItem}
              />
            ))}
          </div>
        </div>
      </div>

      {isBuildLookSelected ? (
        <div>
          <LookBuilder
            initialClothes={clothesState}
            clothes={selectedClothes}
            toggleBuildLookTab={toggleBuildLookTab}
            selectClothingItem={selectClothingItem}
            gender={gender}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
