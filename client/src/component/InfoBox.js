import { useState } from "react";
import InputBox from "./InputBox";
import classNames from "classnames";

function InfoBox({
  inImage,
  inTitle,
  inSubTitle,
  onImageChange,
  onTitleChange,
  onSubTitleChanged,
  className,
}) {
  const [imageMode, setImageMode] = useState(true);
  const [titleMode, setTitleMode] = useState(true);
  const [subTitleMode, setSubTitleMode] = useState(true);

  const [image, setImage] = useState(inImage);
  const [title, setTitle] = useState(inTitle);
  const [subTitle, setSubTitle] = useState(inSubTitle);

  const handleOnImageChange = (value) => {
    setImage(value);
  };
  const handleImageChange = () => {
    setImageMode(true);
    onImageChange(image);
  };

  const handleTitleChange = () => {
    setTitleMode(true);
    onTitleChange(title);
  };
  const handleOnTitleChange = (value) => {
    setTitle(value);
  };

  const handleSubTitleChange = () => {
    setSubTitleMode(true);
    onSubTitleChanged(subTitle);
  };
  const handleOnSubTitleChange = (value) => {
    setSubTitle(value);
  };
  const classes = classNames(className, "justify-center border");

  return (
    <div className={classes}>
      <div className="m-2 border" onDoubleClick={() => setImageMode(false)}>
        <img
          className="mx-auto rounded-full w-full"
          src={inImage}
          alt="display"
        />
        {imageMode || (
          <InputBox
            value={image}
            setValue={handleOnImageChange}
            placeholder={image}
            autoFocus
            onBlur={handleImageChange}
          />
        )}
      </div>
      {titleMode && (
        <div
          className="text-center m-2 border"
          onDoubleClick={() => setTitleMode(false)}
        >
          {inTitle || "Double click to Change"}
        </div>
      )}
      {titleMode || (
        <InputBox
          value={title}
          setValue={handleOnTitleChange}
          placeholder={title}
          autoFocus
          onBlur={handleTitleChange}
        />
      )}
      {subTitleMode && (
        <div
          className="text-center m-2 border"
          onDoubleClick={() => setSubTitleMode(false)}
        >
          {inSubTitle || "Double click to change"}
        </div>
      )}
      {subTitleMode || (
        <InputBox
          autoFocus
          placeholder={subTitle}
          value={subTitle}
          setValue={handleOnSubTitleChange}
          onBlur={handleSubTitleChange}
        />
      )}
    </div>
  );
}

export default InfoBox;
