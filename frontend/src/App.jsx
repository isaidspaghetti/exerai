import React, { useCallback, useState } from 'react';
import { ContentContainer } from './components/ContentContainer';
import { SideBar } from './components/SideBar';
import { SearchBar } from './components/SearchBar';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const doSetSearchResults = useCallback((results) => {
    console.log('dosetresults');
    // Using a callback here for state, larger app would obviously benefit from reducers, redux, recoil, etc
    setSearchResults(results);
  }, [searchResults]);

  const toggleModal = () => {
    console.log('togglemodal called');
    setShowModal(!showModal);
  };

  return (
    <div className="flex w-full bg-primary-500">
      <SideBar showAll={() => doSetSearchResults(null)} />
      <div className="flex flex-col w-full ml-5 mr-20">
        <SearchBar doSetResults={(v) => doSetSearchResults(v)} />
        <ContentContainer searchResults={searchResults} doSetSearchResults={doSetSearchResults} />
      </div>
    </div>
  );
}

export { App };
