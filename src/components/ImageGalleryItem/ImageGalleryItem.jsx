import { ImageModal } from 'components/Modal/Modal';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ img, largeImg, alt }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const toggleModal = () => {
    setIsImageModalOpen(prevModalState => !prevModalState);
  };

  return (
    <>
      <img
        src={img}
        alt={alt}
        className="ImageGalleryItem-image"
        onClick={toggleModal}
      />
      <ImageModal
        isOpen={isImageModalOpen}
        largeImg={largeImg}
        alt={alt}
        onClose={toggleModal}
      />
    </>
  );
};

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
