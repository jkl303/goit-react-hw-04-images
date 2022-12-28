import 'styles.css';
import { fetchImgs } from 'pixabay';
import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export class App extends Component {
  state = { q: null, page: 1, isLoading: false, error: null, imgs: [] };

  search = (e) => {console.log(e.target.elements.input.value);
    e.preventDefault();
    this.setState({
      q: e.target.elements.input.value,
    });
  };

  loadMore() {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  }

  fetch = async () => {
    try {
      this.setState({ isLoading: true });
      const imgs = await fetchImgs(this.state.q, this.state.page);
      this.setState({ imgs: imgs.hits });
    } catch {
      this.setState({
        error: 'Something went wrong. Try again',
      });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidUpdate = (_, prevState) => {
    if (prevState.imgs !== this.state.imgs) {
      const imgs = this.fetch();
      this.setState({ imgs })
     }
  };

  render() {
    const { imgs, error, isLoading } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.search}></Searchbar>
        <ImageGallery>
          {this.state.imgs.map(img => (
            <li className="ImageGalleryItem" key={img.id}>
              <ImageGalleryItem
                src={img.webformatURL}
                alt={img.tags}
              ></ImageGalleryItem>
            </li>
          ))}
          {isLoading && <Loader></Loader>}
          {error && <p>{error}</p>}
        </ImageGallery>
        {imgs.length > 0 && <Button onClick={this.loadMore}></Button>}
      </div>
    );
  }
}
