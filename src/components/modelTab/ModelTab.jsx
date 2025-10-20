import React, { useEffect, useState } from "react";

import { SelectedClothes } from "../selectedClothes/SelectedClothes";
import { menModel } from "../../assets/models/man/index";
import { womenModel } from "../../assets/models/woman/index";
import "./ModelTab.css";
import { ButtonsGenerate } from "../ButtonsGenerate/ButtonsGenerate";
import { GenerationModel } from "../generationModel/GenerationModel";
import { ModelsCarousel } from "../modelsCarousel/ModelsCarousel";
import { Client } from "@gradio/client";

export function ModelItem({
  imgSrc,
  title = "Model",
  chooseModel,
  selectedModel,
}) {
  return (
    <div
      className={selectedModel === imgSrc ? "modelItem selected" : "modelItem"}
      onClick={() => chooseModel(imgSrc)}
    >
      <img src={imgSrc} alt="Model" height="200px" />
      <p className="small">{title}</p>
    </div>
  );
}

export function ModelTab({
  photos,
  selectClothingItem,
  shoes,
  setShoes,
  gender,
  setSavedModels,
  selectedFromSavedModel
}) {
  const [modelImages, setModelImages] = useState(womenModel);
  const [selectedModel, setSelectedModel] = useState(!!selectedFromSavedModel?.length ? selectedFromSavedModel[0]?.modelSample : null);



  const fileInputRef = React.useRef(null);
  const [shouldGenerate, setShouldGenerate] = useState(false);
  const [selectedOptionsForBuild, setSelectedOptionsForBuild] = useState({
    model: selectedFromSavedModel[0]?.modelSample || null,
    top: selectedFromSavedModel[0]?.top || null,
    bottom: selectedFromSavedModel[0]?.bottom || null,
    shoes: selectedFromSavedModel[0]?.shoes || null,
  });


  const [isSelectedModelFile, setIsSelectedModelFile] = useState(false);
  const [generatedModel, setGeneratedModel] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratedModelTabOpen, setIsGeneratedModelTabOpen] = useState(false);

  const chooseModel = (modelUrl) => {
    setIsSelectedModelFile(false);
    setSelectedModel(modelUrl);
    setSelectedOptionsForBuild((prevState) => {
      return { ...prevState, model: modelUrl };
    });
  };


  const generatePhoto = () => {

    if (selectedOptionsForBuild.model) {

      setShouldGenerate(true);
      setIsGeneratedModelTabOpen(true);
    }
  };

  const handleFileChange = (e) => {
    setSelectedModel(e.target.files[0]);
    setIsSelectedModelFile(true);
    setIsGeneratedModelTabOpen(true);
    setSelectedOptionsForBuild((prevState) => {
      return { ...prevState, model: e.target.files[0] };
    });

  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    setSelectedOptionsForBuild((prevState) => {
      const top = photos.filter((photo) => photo.variant === "top");
      const bottom = photos.filter((photo) => photo.variant === "bottom");

      return { ...prevState, top, bottom, shoes };

    });

  }, [photos, shoes]);


  useEffect(() => {
    return gender === "women"
      ? setModelImages(womenModel)
      : setModelImages(menModel);
  }, [gender]);

  useEffect(() => {
    if (!shouldGenerate) return;

    const generateP = async () => {
      setIsLoading(true);

      const isUploadedModel = typeof selectedOptionsForBuild.model !== "string"
      try {
       
        
        
        let model;
        if (isUploadedModel) {
          model = new Blob([selectedOptionsForBuild.model], {
          type: selectedOptionsForBuild.model.type,
        });
        } else {
          const modelRes = await fetch(selectedOptionsForBuild.model)
          model = await modelRes.blob()
        }

        const res1 = await fetch(selectedOptionsForBuild.bottom[0].src);
        const bottom = await res1.blob();

        const res2 = await fetch(selectedOptionsForBuild.top[0].src);
        const top = await res2.blob();

        const shoes = selectedOptionsForBuild.shoes;

        const client = await Client.connect("https://136.113.181.106/gradio/");
        const result = await client.predict("/generate", {
          model_image: model,
          garment_image_1: top,
          garment_image_2: bottom,
          shoes_option: shoes,
        });

        setGeneratedModel({
          ...selectedOptionsForBuild,
          modelSample: !isUploadedModel && selectedOptionsForBuild.model,
          model: result.data[0].url,
          tabInd: 1,
          id: Math.random().toString(36).substr(2, 9)
        });
      } catch (error) {
        console.log(error);
        setShouldGenerate(false);
        setIsLoading(false);
      } finally {

        setShouldGenerate(false);
        setIsLoading(false);
      }
    };

    generateP();
  }, [shouldGenerate]);

  const saveLook = () => {
    setSavedModels((prevState) => [...prevState, generatedModel]);
    const link = document.createElement("a");
    link.href = generatedModel.model;
    link.download = generatedModel.model;
    link.click();
  };

  const clothes = !!selectedFromSavedModel.length ? [...selectedFromSavedModel[0]?.top, ...selectedFromSavedModel[0]?.bottom] : photos;
  const shoesSelected = !!selectedFromSavedModel.length ? selectedFromSavedModel[0]?.shoes : shoes


  return (
    <div className="modelTab">
      {
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      }
      {isGeneratedModelTabOpen ? (
        <GenerationModel
          selectedModel={selectedModel}
          isSelectedModelFile={isSelectedModelFile}
          carouselComponent={
            <ModelsCarousel
              models={modelImages}
              chooseModel={chooseModel}
              selectedModel={selectedModel}
            />
          }
          isLoading={isLoading}
          generatedModel={generatedModel}
        />
      ) : (
        <>
          <div className="modelItems">
            <p>Models</p>
            <div style={{ display: "flex" }}>
              {modelImages.map((img) => (
                <ModelItem
                  key={img}
                  imgSrc={img}
                  title="Model"
                  selectedModel={selectedModel}
                  chooseModel={chooseModel}
                />
              ))}
            </div>
          </div>

          <SelectedClothes
            photos={clothes}
            selectClothingItem={selectClothingItem}
            shoes={ shoesSelected}
            setShoes={setShoes}
          />
        </>
      )}
      <ButtonsGenerate
        generatedModel={generatedModel}
        generatePhoto={generatePhoto}
        handleUploadClick={handleUploadClick}
        saveLook={saveLook}
      />
    </div>
  );
}
