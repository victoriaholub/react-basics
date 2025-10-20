import React, { useState } from "react";

import "./OutfitTab.css";
import { Button } from "antd";
import { RightOutlined } from "@ant-design/icons";

function OutfitItem({
  // TODO: change type here
  type = "Model",
  outfitName = "Casual Outfit",
  photo,
  tabKey,
  openTab,
  id
}) {
  const openEditTab = (tabKey) => {
    openTab(tabKey, id);
  };

  return (
    <div className="outfitItem">
      <div>
        <img src={photo} height="82px" />
        <div className="itemInfo">
          <p>{type}</p>
          <p>{outfitName}</p>
        </div>
      </div>

      <Button
        type="text"
        icon={<RightOutlined />}
        onClick={() => openEditTab(tabKey)}
      />
    </div>
  );
}

// todo: change to modal
export function OutfitTab({
  selectClothingItem,
  initialClothes,
  savedModels,
  setActiveTabKey,
  openTab
}) {
  return (
    <div className="outfitTab">
      <h2>My Outfits</h2>
      {savedModels.map((item, idx) => {
        return (
          <OutfitItem
            key={item.id}
            id={item.id}
            photo={item.model}
            tabKey={item.tabInd}
            selectClothingItem={selectClothingItem}
            initialClothes={initialClothes}
            setActiveTabKey={setActiveTabKey}
            openTab={openTab}
          />
        );
      })}
    </div>
  );
}
