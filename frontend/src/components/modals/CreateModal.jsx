/* eslint-disable jsx-a11y/label-has-associated-control */
import '../../css/Modal.css';
import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { FaCircleNotch } from 'react-icons/fa';
import { versions } from '../../dummyData/values';
import { exercises } from '../../dummyData/exercises';
import { selectStyle } from '../../css/selectStyle';

const CreateModal = ({ triggerModal, toggleToast }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted] = useState(null);
  const [values, setValues] = useState({
    name: '',
    exercise: null,
    exerId: '',
    thumbnailUrl: '',
    actionDescription: '',
    versions: [],
  });

  const handleChange = (e) => {
    e.preventDefault();
    console.log('EEEEE', e);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSelectExercise = (e) => {
    setValues({ ...values, exercise: e.value });
  };

  const handleSelectVersions = (e) => {
    // Convert selected options to array of strings
    const selectedVersions = e.map((option) => option.value);
    setValues({ ...values, versions: selectedVersions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${window.env.BASE_BE_URL}/movements/`, values);
      console.log('axios done');
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
    <div className="p-6 space-y-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            name="name"
            onChange={handleChange}
            type="text"
            value={values.name}
            id="name"
            className="form-input"
            required
          />
        </div>
        <div className="relative z-10 mb-6 w-full group">
          <label htmlFor="exercise" className="form-label">
            Exercise
          </label>
          {/* Using existing exercises on create for now */}
          <Select
            defaultValue="exercise"
            id="exercise"
            name="exercise"
            options={exercises}
            className="form-input border-0 p-0"
            classNamePrefix="select"
            styles={selectStyle}
            value={
              exercises.find((option) => option.value === values.exercise) ||
              null
            }
            onChange={handleSelectExercise}
          />
        </div>
        <div className="relative mb-6 w-full group">
          <label htmlFor="versions" className="form-label">
            Versions
          </label>
          {/* Using existing versions on create for now */}
          <Select
            id="versions"
            defaultValue="eg: 1.1.1, 1.5.1"
            isMulti
            allowSelectAll
            name="versions"
            options={versions}
            className="form-input border-0 p-0"
            classNamePrefix="select"
            value={values.versions.map((version) => ({
              value: version,
              label: version,
            }))}
            styles={selectStyle}
            onChange={handleSelectVersions}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="exerId" className="form-label">
            Exer id
          </label>
          <input
            type="text"
            name="exerId"
            value={values.exerId}
            id="exerId"
            className="form-input"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="thumbnailUrl" className="form-label">
            Thumbnail URL
          </label>
          <input
            type="url"
            name="thumbnailUrl"
            value={values.thumbnailUrl}
            id="thumbnailUrl"
            className="form-input"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="actionDescription" className="form-label">
            Description
          </label>
          <textarea
            id="actionDescription"
            name="actionDescription"
            value={values.actionDescription}
            className="form-input"
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? (
            <FaCircleNotch className="animate-spin-slow" size="28" />
          ) : submitted ? (
            'Success'
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  );
};

export { CreateModal };
