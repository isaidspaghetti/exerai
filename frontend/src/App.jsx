import './css/App.css';
import React, { useCallback, useState, useEffect } from 'react';
import { ContentContainer } from './components/ContentContainer';
import { SideBar } from './components/SideBar';
import { SearchBar } from './components/SearchBar';
import { Modal } from './components/modals/Modal';
import { Toasty } from './components/Toasty';
import { ModalTypes } from './constants/constants';
import axios from 'axios';

function App() {
  const [movements, setMovements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState(null);
  const [showModal, setShowModal] = useState(false); // Great spot for typescript and/or redux state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Movement Created!');
  const [selectedCard, setSelectedCard] = useState(null);

  const fetchMovements = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${window.env.BASE_BE_URL}/movements/`);
      setMovements(response.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovements();
  }, []);

  const prependMovement = (newMovement) => {
    setSearchResults(null); // Clear search to ensure the main list is visible
    setMovements((prev) => [newMovement, ...prev]);
    // Scroll to top to see the new movement
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeMovement = (movementId) => {
    setMovements((prev) => prev.filter((m) => m.id !== movementId));
  };

  const updateMovement = (updatedMovement) => {
    setMovements((prev) =>
      prev.map((m) => (m.id === updatedMovement.id ? updatedMovement : m)),
    );
  };

  const doSetSearchResults = useCallback(
    (results) => {
      // Using a callback here for state, larger app would obviously benefit from reducers, redux, recoil, etc
      setSearchResults(results);
    },
    [searchResults],
  );

  const triggerModal = (type, id) => {
    setShowModal(type);
    setSelectedCard(id);
  };

  const toggleToast = (message = 'Movement Created!') => {
    setToastMessage(message);
    setShowToast(true);
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
          movements={movements}
          isLoading={isLoading}
          searchResults={searchResults}
          triggerModal={(type, id) => triggerModal(type, id)}
        />
        {showModal && (
          <Modal
            triggerModal={() => triggerModal(ModalTypes.HIDE)}
            modalType={showModal}
            toggleToast={(message) => toggleToast(message)}
            selectedCard={selectedCard}
            prependMovement={prependMovement}
            removeMovement={removeMovement}
            updateMovement={updateMovement}
          />
        )}
      </div>
    </div>
  );
}

export { App };
