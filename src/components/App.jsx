import 'styles.css';
import { fetchImgs } from 'pixabay';
import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export const App = () => {
  const [q, setQ] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imgs, setImgs] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getImgs = async () => {
      try {
        setIsLoading(true);
        const imgs = await fetchImgs(q, page);
        if (imgs.totalHits === 0) {
          alert(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          setTotal(imgs.totalHits);
          page > 1
            ? setImgs(prevImgs => [...prevImgs, ...imgs.hits])
            : setImgs(imgs.hits);
        }
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    if (q) getImgs();
  }, [q, page]);

  return (
    <div>
      <Searchbar
        onSubmit={q => {
          setQ(q);
          setPage(1);
        }}
      ></Searchbar>
      <ImageGallery>
        {imgs.map(img => (
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
        <Button onClick={() => setPage(prevPage => prevPage + 1)}></Button>
      )}
    </div>
  );
};
