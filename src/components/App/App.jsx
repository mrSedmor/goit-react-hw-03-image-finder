import { Component } from 'react';
import { createPortal } from 'react-dom';
import { queryImages } from 'services/api';
import { Searchbar, ImageGallery, Button, Loader, Modal } from 'components';

const modalRootRef = document.getElementById('modal-root');
console.log(modalRootRef);

export default class App extends Component {
  state = {
    images: [],
    isLoading: false,
    hasMoreImages: false,
    isModalVisible: false,
    imageURL: '',
    alt: '',
  };

  loadImages = async query => {
    try {
      this.setState({ isLoading: true });
      if (query) {
        this.setState({ hasMoreImages: false, images: [] });
        window.scrollTo(0, 0);
      }
      const queryResult = await queryImages(query);
      const { hasMoreImages, images } = queryResult;

      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        hasMoreImages,
      }));
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onQuery = async query => {
    this.loadImages(query);
  };

  loadMore = async () => {
    this.loadImages();
  };

  handleGalleryClick = ({ imageURL, alt }) => {
    console.log(imageURL, alt);
    this.setState({ imageURL, alt, isModalVisible: true });
  };

  hideModal = () => {
    this.setState({ isModalVisible: false });
  };

  render() {
    const { isLoading, hasMoreImages, images, isModalVisible, imageURL, alt } =
      this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onQuery} />

        <ImageGallery images={images} onClick={this.handleGalleryClick} />

        {isLoading && <Loader />}

        {hasMoreImages && !isLoading && (
          <Button onClick={this.loadMore}>Load more</Button>
        )}

        {isModalVisible &&
          createPortal(
            <Modal onClose={this.hideModal}>
              <img src={imageURL} alt={alt} />
            </Modal>,
            modalRootRef
          )}
      </div>
    );
  }
}
