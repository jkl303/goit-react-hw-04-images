import 'styles.css';
import { fetchImgs } from 'pixabay';
import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    q: null,
    page: 1,
    isLoading: false,
    error: null,
    imgs: [],
    total: 1,
  };

  search = q => {
    this.setState({
      q,
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate = async (_, prevState) => {
    const { q, page } = this.state;

    if (prevState.q !== q || prevState.page !== page) {
      try {
        this.setState({
          isLoading: true,
        });
        const imgs = await fetchImgs(q, page);
        if (imgs.totalHits === 0) {
          alert(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          page > 1
            ? this.setState(prevState => ({
                imgs: [...prevState.imgs, ...imgs.hits],
                total: imgs.totalHits,
              }))
            : this.setState({ imgs: imgs.hits, total: imgs.totalHits });
        }
      } catch {
        this.setState({
          error: 'Something went wrong. Please try again.',
        });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  };

  toggleImageModal = () => {
    this.setState(prevState => ({
      isImageModalOpen: !prevState.isImageModalOpen,
    }));
  };

  render() {
    const { imgs, error, page, isLoading, total } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.search}></Searchbar>
        <ImageGallery>
          {this.state.imgs.map(img => (
            <li className="ImageGalleryItem" key={img.id}>
              <ImageGalleryItem
                img={img.webformatURL}
                largeImg={img.largeImageURL}
                alt={img.tags}
              ></ImageGalleryItem>
            </li>
          ))}
          {isLoading && <Loader></Loader>}
          {error && <p>{error}</p>}
        </ImageGallery>
        {imgs.length > 0 && page < total / 12 && (
          <Button onClick={this.loadMore}></Button>
        )}
      </div>
    );
  }
}
