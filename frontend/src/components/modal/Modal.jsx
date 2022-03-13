/* eslint-disable jsx-a11y/label-has-associated-control */
import '../../css/Modal.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import Select from 'react-select';
import { FaCircleNotch } from 'react-icons/fa';
import env from 'dotenv';
import { exercises, versions } from '../../dummyData/values';
import { selectStyle } from '../../css/selectStyle';

const Modal = ({ toggleModal }) => {
  console.log('Modal called...');
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    // do validate data here
    const errors = {};
    return errors;
  };

  const handleSubmit = async (values) => {
    console.log("handling submit',", values);
    setIsLoading(true);
    try {
      const response = await axios.post(`${env.BASE_BE_URL}/create`, { values });
      console.log('res data', response.data);
      doSetResults(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
    console.log('handleSubmit called');
  };

  return (
      <div id="defaultModal" aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden z-10 fixed justify-center items-center h-modal md:h-full md:inset-0">
        <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative rounded-lg shadow bg-gray-700">
                <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                    <h3 className="text-xl font-semibold lg:text-2xl text-tiffany-500">
                      Create a Movement
                    </h3>
                    <button type="button" className="text-tiffany-500 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white" onClick={() => toggleModal()}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </button>
                </div>
                <div className="p-6 space-y-6">
                  <Formik
                    initialValues={{
                      name: 'Name',
                      exercise: 'exercise id',
                      versions: 'Versions (separate by comma)',
                      exerId: 'ExerId',
                      thumbnailUrl: 'Thumbnail URL',
                      actionDescription: 'Movement Description',
                    }}
                    validate={(values) => validate(values)}
                    onSubmit={(values) => handleSubmit(values)}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-6">
                        <label htmlFor="name" className="form-label">Name</label>
                          <input type="name" id="name" className="form-input" required />
                      </div>
                      <div className="relative z-10 mb-6 w-full group">
                        <label htmlFor="exercise" className="form-label">Exercise</label>
                        {/* Using existing exercises on create for now */}
                        <Select
                          defaultValue="exercise"
                          // isMulti
                          name="exercise"
                          options={exercises}
                          className="form-input border-0 p-0"
                          classNamePrefix="select"
                          styles={selectStyle}
                        />
                      </div>
                      <div className="relative mb-6 w-full group">
                        <label htmlFor="version" className="form-label">Versions</label>
                        {/* Using existing versions on create for now */}
                        <Select
                          defaultValue="eg: 1.1.1, 1.5.1"
                          isMulti
                          allowSelectAll
                          name="version"
                          options={versions}
                          className="form-input border-0 p-0"
                          classNamePrefix="select"
                          styles={selectStyle}
                        />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="exerId" className="form-label">Exer id</label>
                        <input type="text" id="exerId" className="form-input" required />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="thumbnailUrl" className="form-label">Thumbnail URL</label>
                        <input type="url" id="thumbnailUrl" className="form-input" />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="actionDescription" className="form-label">Description</label>
                        <textarea id="actionDescription" className="form-input" />
                      </div>
                      <button type="submit" className="submit-button">{isLoading ? <FaCircleNotch className="animate-spin-slow" size="28" /> : 'Submit'}</button>
                    </form>
                    )}
                  </Formik>
                </div>
            </div>
        </div>
      </div>
  );
};

export { Modal };
