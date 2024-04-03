"use client";
import React, { useRef, useState } from "react";
import classes from "./meals.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imagerRef = useRef();
  const imagePickerHandler = () => {
    imagerRef.current.click();
  };
  const handleImageChange = (e) => {  
    const file = e.target.files[0];
    setPickedImage(file);
    if (!file) {
      setPickedImage(null);
      return;
    }

  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.control}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet </p>}
          {pickedImage && <Image src={URL.createObjectURL(pickedImage)} alt="Picked" fill />}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept=".jpg, .jpeg, .png"
          name={name}
          ref={imagerRef}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={imagePickerHandler}
        >
          Pick Image
        </button>
      </div>
    </div>
  );
}
