import './css/App.css';
import React, { useCallback, useState } from 'react';
import { ContentContainer } from './components/ContentContainer';
import { SideBar } from './components/SideBar';
import { SearchBar } from './components/SearchBar';
import { Modal } from './components/modals/Modal';
import { Toasty } from './components/Toasty';
import { ModalTypes } from './constants/constants';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [showModal, setShowModal] = useState(false); // Great spot for typescript and/or redux state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Movement Created!');
  const [selectedCard, setSelectedCard] = useState(null);

  const doSetSearchResults = useCallback(
    (results) => {
      console.log('dosetresults');
      // Using a callback here for state, larger app would obviously benefit from reducers, redux, recoil, etc
      setSearchResults(results);
    },
    [searchResults],
  );

  const triggerModal = (type, id) => {
    console.log('triggerModal called, type:', type, id);
    setShowModal(type);
    setSelectedCard(id);
  };

  const toggleToast = (message = 'Movement Created!') => {
    setToastMessage(message);
    setShowToast(true);
    console.log('show toast');
    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const hideToast = () => {
    setShowToast(false);
  };

  return (
    <div className="flex w-full bg-primary-500">
      <SideBar
        showAll={() => doSetSearchResults(null)}
        triggerModal={() => triggerModal(ModalTypes.CREATE)}
      />
      <div className="flex flex-col w-full ml-5 mr-20">
        <SearchBar doSetResults={(v) => doSetSearchResults(v)} />
        {showToast && <Toasty toggleToast={hideToast} message={toastMessage} />}
        <ContentContainer
          searchResults={searchResults}
          doSetSearchResults={doSetSearchResults}
          triggerModal={(type, id) => triggerModal(type, id)}
        />
        {showModal && (
          <Modal
            triggerModal={() => triggerModal(ModalTypes.HIDE)}
            modalType={showModal}
            toggleToast={() => toggleToast()}
            selectedCard={selectedCard}
          />
        )}
      </div>
    </div>
  );
}

export { App };
