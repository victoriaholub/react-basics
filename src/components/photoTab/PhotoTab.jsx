import React, { useState } from "react";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import photoInput from "../../assets/photo-input.png";
import { SelectedClothes } from "../selectedClothes/SelectedClothes";


import "./PhotoTab.css";
import { GenerationPhoto } from "../generationPhoto/GenerationPhoto";

export function PhotoTab({
  photos,
  selectClothingItem,
  shoes,
  setShoes,
  setSavedModels,
  setActiveTabKey,
  selectedFromSavedModel
}) {
  const fileInputRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);


  const [selectedOptionsForBuild, setSelectedOptionsForBuild] = useState({
    model: selectedFromSavedModel[0]?.modelSample || null,
    top: selectedFromSavedModel[0]?.top || null,
    bottom: selectedFromSavedModel[0]?.bottom || null,
    shoes: selectedFromSavedModel[0]?.shoes || null,
  });

  const changeTabToModel = () => {
    setActiveTabKey(1)
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    
    setSelectedOptionsForBuild((prevState) => {
      return { ...prevState, model: e.target.files[0] };
    });
  };

  
  const clothes = !!selectedFromSavedModel.length ? [...selectedFromSavedModel[0]?.top, ...selectedFromSavedModel[0]?.bottom] : photos;
  const shoesSelected = !!selectedFromSavedModel.length ? selectedFromSavedModel[0]?.shoes : shoes
  return (
    <div className="photoTab">
      {
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      }

      {selectedFile ? (
        <GenerationPhoto
          shoes={shoes}
          setShoes={setShoes}
          selectedModel={selectedFile}
          photos={photos}
          handleUploadClick={handleUploadClick}
          selectedOptionsForBuild={selectedOptionsForBuild}
          setSelectedOptionsForBuild={setSelectedOptionsForBuild}
          isSelectedModelFile={true}
          title="Wardrobe"
          setSavedModels={setSavedModels}
          selectClothingItem={selectClothingItem}
        />
      ) : (
        <div>
          <div className="uploadPhoto">
            <img src={photoInput} alt="Upload preview" />
            <h3>Upload your photo to see how the clothes fit on you.</h3>
            <Button
              variant="solid"
              color="default"
              icon={<UploadOutlined />}
              onClick={handleUploadClick}
            >
              Upload Photo
            </Button>
            <p>
              Don’t have one right now? You can also <a onClick={changeTabToModel} >try them on a model</a>.
            </p>
          </div>

          <SelectedClothes
            photos={clothes}
            selectClothingItem={selectClothingItem}
            shoes={shoesSelected}
            setShoes={setShoes}
          />
        </div>
      )}
    </div>
  );
}
