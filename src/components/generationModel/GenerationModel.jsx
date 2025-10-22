import React from "react";
import { Progress } from "antd";

export function GenerationModel({
  selectedModel,
  isSelectedModelFile,
  carouselComponent,
  isLoading,
  generatedModel,
}) {
  const modelSrc = isSelectedModelFile
    ? URL.createObjectURL(selectedModel)
    : selectedModel;

  return (
    <div className="selectedPhoto">
      <div style={{ backgroundColor: "#f6f6f6", height: "741px" }}>
        {!!generatedModel?.model ? (
          <img
            src={generatedModel.model}
            width="520px"
            height="741px"
            style={{ objectFit: "contain" }}
          />
        ) : (
          <img
            src={modelSrc}
            alt="Uploaded"
            width="520px"
            height="741px"
            style={{ objectFit: "contain" }}
          />
        )}
      </div>
      <div className="carouselLayout">
        {!isLoading ? (
          <>{carouselComponent}</>
        ) : (
          <div className="loading">
            <Progress percent={100} showInfo={false} strokeColor={"#B5B5B5"} />
            <p className="big">Building your look...</p>
          </div>
        )}
      </div>
    </div>
  );
}
