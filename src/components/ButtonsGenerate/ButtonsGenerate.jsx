import { Button } from "antd";
import { HeartOutlined, SkinOutlined, UploadOutlined } from "@ant-design/icons";

export function ButtonsGenerate({generatedModel, generatePhoto, handleUploadClick, saveLook }) {
  return (
    <div className="buttonGroup">
      <Button
        variant="outlined"
        color="default"
        icon={<HeartOutlined />}
        onClick={handleUploadClick}
      >
        Upload new photo
      </Button>
      {generatedModel ? (
        <Button variant="solid" color="default" icon={<UploadOutlined />} onClick={saveLook}>
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
  );
}
