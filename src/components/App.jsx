import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, KEY, PARAMS } from './PixabayApi';
import Notiflix from 'notiflix';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGalery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import LoadMoreBtn from './Button/Button';
import Modal from './Modal/Modal';
import SpinnerLoader from './Loader/Loader';

const App = () => {
  const [hits, setHits] = useState([]);
  const [nameF, setName] = useState('');
  const [pageF, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  });

  const getValue = (name = '', page = 1) => {
    try {
      axios
        .get(`${BASE_URL}?key=${KEY}&q=${name}&page=${page}&${PARAMS}`)
        .then(response => {
          if (!response.data.hits.length) {
            Notiflix.Notify.failure('No images found!');
          } else if (name === nameF) {
            setLoading(true);

            setHits([...hits, ...response.data.hits]);
            setPage(pageF + 1);
          } else {
            setLoading(true);

            setHits(response.data.hits);
            setName(name);
            setPage(2);
          }
        });
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const toggleModal = (largeImageURL, tags, id) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const loadMore = () => {
    getValue(nameF, pageF);
  };
  return (
    <div>
      <Searchbar onSubmitHandle={getValue} />

      {!loading && <SpinnerLoader />}

      {hits && (
        <ImageGallery>
          <ImageGalleryItem articles={hits} onImage={toggleModal} />
        </ImageGallery>
      )}

      {showModal && (
        <Modal onClose={toggleModal} url={largeImageURL} alt={tags} />
      )}

      {hits.length > 0 && <LoadMoreBtn onButtonClick={() => loadMore()} />}
    </div>
  );
};

export default App;
