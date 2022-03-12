import React, { useCallback, useState } from 'react';
import { ContentContainer } from './components/ContentContainer';
import { SideBar } from './components/SideBar';

function App() {
  const [searchResults, setSearchResults] = useState(null);

  const doSetSearchResults = useCallback((results) => {
    console.log('dosetresults');
    // Using a callback here for state, larger app would obviously benefit from reducers, redux, recoil, etc
    setSearchResults(results);
  }, [searchResults]);

  return (
    <div className="flex bg-primary-500">
      <SideBar showAll={() => doSetSearchResults(null)} />
      <ContentContainer searchResults={searchResults} doSetSearchResults={doSetSearchResults} />
    </div>
  );
}

export { App };
