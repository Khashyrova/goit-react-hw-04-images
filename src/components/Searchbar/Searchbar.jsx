import { useState } from 'react';
import s from './Searchbar.module.css';
import Notiflix from 'notiflix';
import svg from '../../search.svg';

const Searchbar = ({ onSubmitHandle }) => {
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);

  const handleChange = e => {
    const value = e.currentTarget.value;
    setName(`${value}`);
  };
  const reset = () => {
    setName('');
  };
  const handleSubmit = e => {
    e.preventDefault();

    if (name === '') {
      Notiflix.Notify.failure(
        'You have to enter something first to search for images!'
      );
      return;
    }
    onSubmitHandle({ name, page });
    reset();
  };
  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>
            <svg width="25" height="25">
              <use href={svg + '#icon'}></use>
            </svg>
          </span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
