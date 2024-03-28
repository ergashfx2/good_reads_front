import React, { useEffect, useState } from "react";
import { uploadImage } from "../../utils/FireBaseConfig";
import "./AddItemForm.css";

const ImageUploader = ({ handleImagesUrl, submitted }) => {
  const [images, setImages] = useState([]);
  const [droppedImageNames, setDroppedImageNames] = useState([]);
  const handleImageChange = (e) => {
    const uploaded_images = e.target.files;
    const imagesArray = [];

    for (let i = 0; i < uploaded_images.length; i++) {
      imagesArray.push(uploaded_images[i]);
    }
    const imageNames = imagesArray.map((file) => file.name);
    setDroppedImageNames(imageNames);

    setImages((prevImages) => [...prevImages, ...imagesArray]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const imagesArray = Array.from(files);
    setImages((prevImages) => [...prevImages, ...imagesArray]);
    const imageNames = imagesArray.map((file) => file.name);
    setDroppedImageNames(imageNames);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (submitted) {
        try {
          if (images) {
            let downloadURLs = [];
            for (const image of images) {
              const imageUrl = await uploadImage(image);
              downloadURLs.push(imageUrl);
            }
            handleImagesUrl(downloadURLs);
          } else {
            alert("No image selected.");
          }
        } catch (error) {
          alert(`Error uploading image: ${error}`);
        }
      }
    };

    fetchData();
  }, [submitted]);

  return (
    <div>
      <div className="form-group files">
        <label className={"fw-bold"}>Upload Your Book's images</label>
        <input
          type="file"
          className="form-control"
          multiple
          onChange={handleImageChange}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        />
      </div>
      {droppedImageNames && droppedImageNames.length > 0 && (
        <div className={"file-names border-3"}>
          {droppedImageNames.map((imageName, index) => (
            <span key={index} className="file-name">
              {imageName}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
