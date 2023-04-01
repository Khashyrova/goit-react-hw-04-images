import { Component, useState } from 'react';
import s from './ImageGalery.module.css';
const ImageGallery = ({ children }) => {
  return <ul className={s.ImageGallery}>{children}</ul>;
};

export default ImageGallery;
