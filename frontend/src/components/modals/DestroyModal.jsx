/* eslint-disable jsx-a11y/label-has-associated-control */
import '../../css/Modal.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCircleNotch } from 'react-icons/fa';
import { ModalTypes } from '../../constants/constants';

const DestroyModal = ({
  triggerModal, modalType, toggleToast, id,
}) => {
  console.log('Modal called...trigerModal', modalType);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted] = useState(null);
  const [values, setValues] = useState({
    name: null,
    exercise: null,
    exerId: null,
    thumbnailUrl: null,
    actionDescription: null,
    versions: [],
  });

  useEffect(() => {
    console.log('VALUES', values);
  }, [values]);

  const handleChange = (e) => {
    e.preventDefault();
    console.log('EEEEE', e);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSelectExercise = (e) => {
    setValues({ ...values, exercise: e.value });
  };

  const handleSelectVersions = (e) => {
    setValues({ ...values, versions: [...values.versions, e[0].label] });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.delete(`${process.env.BASE_BE_URL}/movement/${id}`);
      toggleToast();
      triggerModal();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
    console.log('handleSubmit called');
  };

  return (
      <div id="defaultModal" className="flex overflow-y-auto overflow-x-hidden z-10 justify-center items-center h-modal md:h-full md:inset-0">
        <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
            <div className="flex flex-col relative rounded-lg items-center shadow bg-gray-700">
              <p className="text-red-500 text-bold text-lg center">Are you sure you want to delete this item from the database?</p>
              <div className="flex">
                <button type="button" className="submit-button m-3 w-40" onClick={() => triggerModal(ModalTypes.HIDE)}>Cancel</button>
                <button type="submit" className="submit-button m-3 w-40 bg-red-500" onClick={(e) => handleDelete(e)}>
                  {isLoading ? <FaCircleNotch className="animate-spin-slow" size="28" /> : submitted ? 'Success' : 'Delete'}
                </button>
              </div>
            </div>
        </div>
      </div>
  );
};

export { DestroyModal };
