/* eslint-disable jsx-a11y/label-has-associated-control */
import '../../css/Modal.css';
import React from 'react';
import { ModalTypes } from '../../constants/constants';
import { DestroyModal } from './DestroyModal';
import { UpdateModal } from './UpdateModal';
import { CreateModal } from './CreateModal';

const Modal = ({
  triggerModal,
  modalType,
  toggleToast,
  selectedCard, // TODO: selectedCard is a clunky way to get the id should id should be a url param instead
  prependMovement,
  removeMovement,
  updateMovement,
}) => {
  return (
    <div
      id="defaultModal"
      aria-hidden="true"
      className="flex overflow-y-auto overflow-x-hidden z-10 fixed justify-center items-center h-modal md:h-full md:inset-0"
    >
      <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative rounded-lg shadow bg-gray-700">
          <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold lg:text-2xl text-tiffany-500">
              {modalType === ModalTypes.CREATE
                ? 'Create a Movement'
                : modalType === ModalTypes.UPDATE
                ? 'Update Movement'
                : 'Delete Movement'}
            </h3>
            <button
              type="button"
              className="text-tiffany-500 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
              onClick={() => triggerModal()}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div>
            {/* Modal Body */}
            {/* Candidate for switch statement */}
            {modalType === ModalTypes.CREATE && (
              <CreateModal
                triggerModal={() => triggerModal(ModalTypes.HIDE)}
                toggleToast={toggleToast}
                prependMovement={prependMovement}
              />
            )}
            {modalType === ModalTypes.UPDATE && (
              <UpdateModal
                triggerModal={() => triggerModal(ModalTypes.HIDE)}
                toggleToast={() => toggleToast('Movement Updated!')}
                id={selectedCard}
                updateMovement={updateMovement}
              />
            )}
            {modalType === ModalTypes.DESTROY && (
              <DestroyModal
                toggleToast={() => toggleToast('Movement Deleted!')}
                triggerModal={() => triggerModal(ModalTypes.HIDE)}
                id={selectedCard}
                removeMovement={removeMovement}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Modal };
