/* eslint-disable jsx-a11y/label-has-associated-control */
import '../../css/Modal.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCircleNotch } from 'react-icons/fa';
import { ModalTypes } from '../../constants/constants';

const DestroyModal = ({
  triggerModal,
  modalType,
  toggleToast,
  id,
  removeMovement,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted] = useState(null);
  const [values] = useState({
    name: null,
    exercise: null,
    exerId: null,
    thumbnailUrl: null,
    actionDescription: null,
    versions: [],
  });

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.delete(`${window.env.BASE_BE_URL}/movements/${id}/`);
      removeMovement(id);
      toggleToast();
      triggerModal();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="defaultModal"
      className="flex overflow-y-auto overflow-x-hidden z-10 justify-center items-center h-modal md:h-full md:inset-0"
    >
      <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
        <div className="flex flex-col relative rounded-lg items-center shadow bg-gray-700">
          <p className="text-red-500 text-bold text-lg center">
            Are you sure you want to delete this item from the database?
          </p>
          <div className="flex">
            <button
              type="button"
              className="submit-button m-3 w-40"
              onClick={() => triggerModal(ModalTypes.HIDE)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button m-3 w-40 bg-red-500"
              onClick={(e) => handleDelete(e)}
            >
              {isLoading ? (
                <FaCircleNotch className="animate-spin-slow" size="28" />
              ) : submitted ? (
                'Success'
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DestroyModal };
