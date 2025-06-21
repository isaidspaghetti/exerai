/* eslint-disable jsx-a11y/label-has-associated-control */
import '../../css/Modal.css';
import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { FaCircleNotch, FaExclamationCircle } from 'react-icons/fa';
import { versions } from '../../dummyData/values';
import { exercises } from '../../dummyData/exercises';
import { selectStyle } from '../../css/selectStyle';

const CreateModal = ({ triggerModal, toggleToast, prependMovement }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    name: '',
    exercise: null,
    exerId: '',
    thumbnailUrl: '',
    actionDescription: '',
    versions: [],
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!values.name) newErrors.name = 'Name is required';
    if (!values.exercise) newErrors.exercise = 'Exercise is required';
    if (!values.exerId) newErrors.exerId = 'Exer ID is required';
    if (!values.versions || values.versions.length === 0)
      newErrors.versions = 'At least one version is required';
    return newErrors;
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSelectExercise = (e) => {
    setValues({ ...values, exercise: e.value });
    if (errors.exercise) {
      setErrors({ ...errors, exercise: null });
    }
  };

  const handleSelectVersions = (e) => {
    // Convert selected options to array of strings
    const selectedVersions = e.map((option) => option.value);
    setValues({ ...values, versions: selectedVersions });
    if (errors.versions) {
      setErrors({ ...errors, versions: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${window.env.BASE_BE_URL}/movements/`,
        values,
      );
      if (prependMovement) {
        prependMovement(response.data);
      }
      toggleToast('Movement Created!');
      triggerModal();
    } catch (err) {
      if (err.response && err.response.data) {
        const errorContainer = err.response.data.details || err.response.data;
        const errorField = Object.keys(errorContainer)[0];
        const errorValue = errorContainer[errorField];
        let rawMessage = 'An unknown error occurred.';

        if (Array.isArray(errorValue)) {
          rawMessage = errorValue[0];
        } else if (typeof errorValue === 'string') {
          rawMessage = errorValue;
        }

        let finalMessage = `${errorField}: ${rawMessage}`;

        if (
          errorField === 'exerId' &&
          rawMessage.toLowerCase().includes('already exists')
        ) {
          finalMessage = 'The exercise ID must be unique.';
        }

        toggleToast(finalMessage);
      } else {
        toggleToast('An unexpected network error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isSubmitDisabled =
    isLoading ||
    !values.name ||
    !values.exercise ||
    !values.exerId ||
    !values.versions.length;

  return (
    <div className="p-6 space-y-6">
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-2 text-sm text-gray-500">
          <span className="text-red-600">*</span> Required fields
        </div>
        <div className="mb-6">
          <label htmlFor="name" className="form-label">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            name="name"
            onChange={handleChange}
            type="text"
            value={values.name}
            id="name"
            className={`form-input${errors.name ? ' border-red-500' : ''}`}
            required
          />
          {errors.name && (
            <span className="form-error flex items-center text-red-600 text-sm mt-1">
              <FaExclamationCircle className="mr-1" /> {errors.name}
            </span>
          )}
        </div>
        <div className="relative z-10 mb-6 w-full group">
          <label htmlFor="exercise" className="form-label">
            Exercise <span className="text-red-600">*</span>
          </label>
          {/* Using existing exercises on create for now */}
          <Select
            defaultValue="exercise"
            id="exercise"
            name="exercise"
            options={exercises}
            className={`form-input border-0 p-0${
              errors.exercise ? ' border-red-500' : ''
            }`}
            classNamePrefix="select"
            styles={selectStyle}
            value={
              exercises.find((option) => option.value === values.exercise) ||
              null
            }
            onChange={handleSelectExercise}
          />
          {errors.exercise && (
            <span className="form-error flex items-center text-red-600 text-sm mt-1">
              <FaExclamationCircle className="mr-1" /> {errors.exercise}
            </span>
          )}
        </div>
        <div className="relative mb-6 w-full group">
          <label htmlFor="versions" className="form-label">
            Versions <span className="text-red-600">*</span>
          </label>
          {/* Using existing versions on create for now */}
          <Select
            id="versions"
            defaultValue="eg: 1.1.1, 1.5.1"
            isMulti
            allowSelectAll
            name="versions"
            options={versions}
            className={`form-input border-0 p-0${
              errors.versions ? ' border-red-500' : ''
            }`}
            classNamePrefix="select"
            value={values.versions.map((version) => ({
              value: version,
              label: version,
            }))}
            styles={selectStyle}
            onChange={handleSelectVersions}
          />
          {errors.versions && (
            <span className="form-error flex items-center text-red-600 text-sm mt-1">
              <FaExclamationCircle className="mr-1" /> {errors.versions}
            </span>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="exerId" className="form-label">
            Exer id <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="exerId"
            value={values.exerId}
            id="exerId"
            className={`form-input${errors.exerId ? ' border-red-500' : ''}`}
            required
            onChange={handleChange}
          />
          {errors.exerId && (
            <span className="form-error flex items-center text-red-600 text-sm mt-1">
              <FaExclamationCircle className="mr-1" /> {errors.exerId}
            </span>
          )}
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
            className={`form-input${
              errors.thumbnailUrl ? ' border-red-500' : ''
            }`}
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
            className={`form-input${
              errors.actionDescription ? ' border-red-500' : ''
            }`}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="submit-button"
        >
          {isLoading ? (
            <FaCircleNotch className="animate-spin-slow" size="28" />
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  );
};

export { CreateModal };
