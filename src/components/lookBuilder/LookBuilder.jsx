import React, { useState } from "react";
import { Button, Tabs } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { PhotoTab } from "../photoTab/PhotoTab.jsx";
import { ModelTab } from "../modelTab/ModelTab.jsx";
import { OutfitTab } from "../outfitTab/OutfitTab.jsx";
import "./LookBuilder.css";


export default function LookBuilder({
  initialClothes,
  clothes,
  toggleBuildLookTab,
  selectClothingItem,
  gender,
}) {
  const [activeTabKey, setActiveTabKey] = useState(0);



  const [savedModels, setSavedModels] = useState([]);
  const [selectedFromSavedModel, setSelectedFromSavedModel] = useState([])
  const [shoes, setShoes] = useState("Leave as is");

const openTab = (key, selectedClothesSetting) => {
    setActiveTabKey(key);
    const selectedModel = savedModels.filter((model) => model.id === selectedClothesSetting)
    setSelectedFromSavedModel(selectedModel)
  };


  const tabs = [
    {
      title: "Photo",
      content: (
        <PhotoTab
          photos={clothes}
          selectClothingItem={selectClothingItem}
          shoes={shoes}
          setShoes={setShoes}
          setSavedModels={setSavedModels}
          setActiveTabKey={setActiveTabKey}
          key={activeTabKey == "0" ? "Tab1-active" : "Tab1"}
          selectedFromSavedModel={selectedFromSavedModel}
        />
      ),
    },
    {
      title: "Model",
      content: (
        <ModelTab
          photos={clothes}
          selectClothingItem={selectClothingItem}
          shoes={shoes}
          setShoes={setShoes}
          gender={gender}
          setSavedModels={setSavedModels}
          selectedFromSavedModel={selectedFromSavedModel}
          key={activeTabKey == "1" ? "Tab2-active" : "Tab2"}
        />
      ),
    },
    {
      title: "My Outfits",
      content: (
        <OutfitTab
          savedClothes={clothes}
          savedModels={savedModels}
          selectClothingItem={selectClothingItem}
          initialClothes={initialClothes}
         setActiveTabKey={setActiveTabKey}
         key={activeTabKey == "2" ? "Tab3-active" : "Tab3"}
         openTab={openTab}
        />
      ),
    },
  ];


  return (
    <div className="lookBuilder">
      <div className="headerSection">
        <div>
          <h1>Build your Outfit</h1>
          <h3 className="timesNewRoman">Style Yourself with Personalized AI</h3>
        </div>
        <Button
          shape="default"
          icon={<CloseOutlined />}
          onClick={() => toggleBuildLookTab(false)}
        ></Button>
      </div>

      <div>
        <Tabs
          onChange={openTab}
          type="card"
          activeKey={activeTabKey}
          className="builderTabs"
          items={tabs.map((tab, i) => {
            return {
              label: `${tab.title}`,
              key: i,
              children: tab.content,
            };
          })}
        />
      </div>
    </div>
  );
}
