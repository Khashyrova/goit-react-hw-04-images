import { Component, useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  });

  const getValue = ({ name, page }) => {
    setLoading(true);
    try {
      axios
        .get(`${BASE_URL}?key=${KEY}&q=${name}&page=${page}&${PARAMS}`)
        .then(response => {
          if (!response.data.hits.length) {
            Notiflix.Notify.failure('No images found!');
          } else if (name === nameF) {
            setHits({ ...hits, ...response.data.hits });
            setName(name);
            setPage(pageF + 1);
            console.log(nameF);
          } else {
            setHits(response.data.hits);
            setName(name);
            setPage(pageF + 1);
            console.log(nameF);
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
    console.log(nameF);
    getValue(nameF, pageF);
  };
  return (
    <div>
      <Searchbar onSubmitHandle={getValue} />

      {loading && <SpinnerLoader />}

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

// class AppClass extends Component {
//   state = {
//     hits: [],
//     name: '',
//     page: 1,
//     showModal: false,
//     loading: false,
//     largeImageURL: '',
//     tags: '',
//   };

//   toggleModal = (imageURL, tag, id) => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//       largeImageURL: imageURL,
//       tags: tag,
//     }));
//   };

//   getValue = ({ name, page }) => {
//     this.setState({ loading: true });
//     try {
//       axios
//         .get(`${BASE_URL}?key=${KEY}&q=${name}&page=${page}&${PARAMS}`)
//         .then(response => {
//           if (!response.data.hits.length) {
//             Notiflix.Notify.failure('No images found!');
//           } else if (name === this.state.name) {
//             this.setState(state => ({
//               hits: [...state.hits, ...response.data.hits],
//               name: name,
//               page: state.page + 1,
//             }));
//           } else {
//             this.setState(state => ({
//               hits: response.data.hits,
//               name: name,
//               page: state.page + 1,
//             }));
//           }
//         });
//     } catch (error) {
//       console.error(error.message);
//     } finally {
//       this.setState({
//         loading: false,
//       });
//     }
//   };

//   loadMore = () => {
//     this.getValue(this.state);
//   };

//   render() {
//     const { hits, showModal, loading, largeImageURL, tags } = this.state;
//     return (
//       <div>
//         <Searchbar onSubmit={this.getValue} />

//         {loading && <SpinnerLoader />}

//         {hits && (
//           <ImageGallery>
//             <ImageGalleryItem articles={hits} onImage={this.toggleModal} />
//           </ImageGallery>
//         )}

//         {showModal && (
//           <Modal onClose={this.toggleModal} url={largeImageURL} alt={tags} />
//         )}

//         {hits.length > 0 && (
//           <LoadMoreBtn onButtonClick={() => this.loadMore()} />
//         )}
//       </div>
//     );
//   }
// }
export default App;
