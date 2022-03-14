/* eslint-disable no-unused-vars */
import { React, useState } from 'react';
import { FaSearch, FaCircleNotch } from 'react-icons/fa';
import axios from 'axios';

const SearchBar = ({ doSetResults }) => {
  const [name, setName] = useState(null);
  const [version, setVersion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [emptyResults, setEmptyResults] = useState(false);

  const inputName = (e) => {
    setName(e.target.value);
  };

  const inputVersion = (e) => {
    setVersion(e.target.value);
  };

  const buildQueryString = () => {
    console.log('call buildstring');

    // Build a string to match the BE url params
    // There are more elegant ways to validate, this is a bit magic numbery and wouldn't be used in larger settings

    // if ((/.*[a-zA-Z].*/g).match(version)) {
    //   setValidationError({ message: 'Version should not have any letters' });
    //   return;
    // }
    const nameString = name && name.trim().replace(/[^a-zA-Z0-9]/g, '+'); // accept only alphnum, replace spaces with +
    console.log('nameString', nameString);
    const versionString = version && version.trim().replace(/:|\.|;|\s/g, '+');
    if (name && version) {
      return `/search/?name=${nameString}&version=${versionString}`;
    }
    return `/search/?${name ? `name=${nameString}` : `version=${versionString}`}`;
  };

  const handleSubmit = async (e) => {
    console.log('call submit');
    e.preventDefault();
    setEmptyResults(false);
    setIsLoading(true);

    const queryString = await buildQueryString();
    try {
      const response = await axios.get(`${process.env.BASE_BE_URL}${queryString}`);
      console.log('res data', response.data);
      // Handle no results: dont have to set global results here, just show a message. Reduces the callbacks bubble.
      if (!response.data.length) {
        console.log('setemptyresults');
        setEmptyResults(true);
      } else { doSetResults(response.data); }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="flex justify-center w-full h-12 mt-2" onSubmit={handleSubmit}>
        <input
          name="name-input"
          className="search-input w-8/12"
          type="text"
          onChange={inputName}
          placeholder="Search by movement name"
          value={name || ''}
        />
        <input
          name="version-input"
          className="search-input ml-5 w-3/12"
          type="text"
          onChange={inputVersion}
          placeholder="Search by version"
          value={version || ''}
        />
        <button type="submit" className="button-icon group mt-0 mr-0" disabled={!name && !version}>
          {isLoading ? <FaCircleNotch className="animate-spin-slow" size="28" /> : <FaSearch size="28" />}
        </button>
      </form>
      {validationError && <span className="search-errors">{`Error:${validationError}`}</span>}
      {emptyResults && <span className="search-errors">No results found</span>}
    </>
  );
};

export { SearchBar };
