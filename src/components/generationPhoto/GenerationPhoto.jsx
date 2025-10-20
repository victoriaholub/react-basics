import React, { useEffect, useState } from "react";
import { HeartOutlined, SkinOutlined } from "@ant-design/icons";
import { SelectedClothesCarousel } from "../selectedClothesCarousel/SelectedClothesCarousel";
import { Client } from "@gradio/client";
import { Button, Progress } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export function GenerationPhoto({
  shoes,
  setShoes,
  selectedModel,
  photos,
  handleUploadClick,
  selectedOptionsForBuild,
  setSelectedOptionsForBuild,
  isSelectedModelFile,
  title,
  isGenerating = false,
  setSavedModels,
  selectClothingItem
}) {
  const [generatedModel, setGeneratedModel] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [shouldGenerate, setShouldGenerate] = useState(isGenerating);

  const generatePhoto = () => {
    if (selectedOptionsForBuild.model) {
      setShouldGenerate(true);
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
    if (!shouldGenerate) return;

    const generateP = async () => {
      setIsLoading(true);

      try {
        const isUploadedModel =
          typeof selectedOptionsForBuild.model !== "string";

        let model;
        if (isUploadedModel) {
          model = new Blob([selectedOptionsForBuild.model], {
            type: selectedOptionsForBuild.model.type,
          });
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
          shoes_option: shoes || "Leave as is",
        });

        setGeneratedModel({
          ...selectedOptionsForBuild,
          model: result.data[0].url,
          tabInd: 0,
          id: Math.random().toString(36).substr(2, 9),
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

  const modelSrc = isSelectedModelFile
    ? URL.createObjectURL(selectedModel)
    : selectedModel;

  const saveLook = () => {
    setSavedModels((prevState) => [...prevState, generatedModel]);
    const link = document.createElement("a");
    link.href = generatedModel.model;
    link.download = generatedModel.model;
    link.click();
  };

  return (
    <div className="selectedPhoto">
      {!!generatedModel?.model ? (
        <img src={generatedModel.model} width="520px" height="741px" />
      ) : (
        <img src={modelSrc} alt="Uploaded" width="520px" height="741px" />
      )}
      <div className="carouselLayout">
        {!isLoading ? (
          <SelectedClothesCarousel
            photos={photos}
            shoes={shoes}
            setShoes={setShoes}
            title={title}
            selectClothingItem={selectClothingItem}
          />
        ) : (
          <div className="loading">
            <Progress percent={100} showInfo={false} strokeColor={"#B5B5B5"} />
            <p className="big">Building your look...</p>
          </div>
        )}
      </div>

      <div className="buttonGroup">
        <Button
          variant="outlined"
          color="default"
          icon={<HeartOutlined />}
          onClick={handleUploadClick}
        >
          Upload new photo
        </Button>
        {!!generatedModel?.model ? (
          <Button
            variant="solid"
            color="default"
            icon={<UploadOutlined />}
            onClick={saveLook}
          >
            Save Look
          </Button>
        ) : (
          <Button
            variant="solid"
            color="default"
            icon={<SkinOutlined />}
            onClick={() => generatePhoto()}
          >
            Try On
          </Button>
        )}
      </div>
    </div>
  );
}
