import { ImageModal } from 'components/Modal/Modal';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    isImageModalOpen: false,
  };

  toggleImageModal = () => {
    this.setState(prevState => ({
      isImageModalOpen: !prevState.isImageModalOpen,
    }));
  };

  render() {
    const { img, largeImg, alt } = this.props;

    return (
      <>
        <img
          src={img}
          alt={alt}
          className="ImageGalleryItem-image"
          onClick={this.toggleImageModal}
        />
        <ImageModal
          isOpen={this.state.isImageModalOpen}
          largeImg={largeImg}
          alt={alt}
          onClose={this.toggleImageModal}
        />
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
