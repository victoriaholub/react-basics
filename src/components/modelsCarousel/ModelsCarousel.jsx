import React, { useState } from "react";
import { Button } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { ModelItem } from "../modelTab/ModelTab";
import "./ModelsCarousel.css";

export function ModelsCarousel({ models, chooseModel, selectedModel }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="selectedModelsCarousel">
      <div>
        <Button
          type="text"
          icon={isOpen ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          onClick={() => setIsOpen(!isOpen)}
          className="wardrobeSection"
        >
          Hide Models
        </Button>
      </div>

      {isOpen && (
        <div className="wardrobe">
          <div className="photoList">
            {models.map((item, index) => (
              <ModelItem
                imgSrc={item}
                chooseModel={chooseModel}
                selectedModel={selectedModel}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
