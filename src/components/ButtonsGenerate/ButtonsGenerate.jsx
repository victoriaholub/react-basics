import { Button } from "antd";
import { SkinOutlined, UploadOutlined } from "@ant-design/icons";

export function ButtonsGenerate({
  generatedModel,
  generatePhoto,
  handleUploadClick,
  saveLook,
  isSelectedOptionsForBuildSame,
}) {
  return (
    <div className="buttonGroup">
      <Button
        variant="outlined"
        color="default"
        icon={<UploadOutlined />}
        onClick={handleUploadClick}
      >
        Upload new photo
      </Button>
      {!generatedModel || !isSelectedOptionsForBuildSame ? (
        <Button
          variant="solid"
          color="default"
          icon={<SkinOutlined />}
          onClick={() => generatePhoto()}
        >
          Try On
        </Button>
      ) : (
        <Button
          variant="solid"
          color="default"
          icon={<UploadOutlined />}
          onClick={saveLook}
        >
          Save Look
        </Button>
      )}
    </div>
  );
}
