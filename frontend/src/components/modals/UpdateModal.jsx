/* eslint-disable jsx-a11y/label-has-associated-control */
import '../../css/Modal.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { FaCircleNotch } from 'react-icons/fa';
import { versions } from '../../dummyData/values';
import { exercises } from '../../dummyData/exercises';
import { selectStyle } from '../../css/selectStyle';

// TODO: This modal could be combined with the CreateModal, but modularized here for product definition branching
const UpdateModal = ({ triggerModal, toggleToast, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted] = useState(null);
  const [changesMade, setChangesMade] = useState(false);
  const isMountedRef = useRef(true);
  const [values, setValues] = useState({
    name: '',
    exercise: null,
    exerId: '',
    thumbnailUrl: '',
    actionDescription: '',
    versions: [],
  });

  useEffect(() => {
    console.log('values', values);
  }, [values]);

  const handleSelectExercise = (e) => {
    setValues({ ...values, exercise: e.value });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
    setChangesMade(true); // TODO: obviously not a final solution for validation
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
      await axios.put(`${window.env.BASE_BE_URL}/movements/${id}/`, values);
      if (isMountedRef.current) {
        setIsLoading(false);
        toggleToast();
        // Don't close modal automatically - let user close it manually
        // triggerModal();
      }
    } catch (err) {
      console.error(err);
      // Only set loading to false if there's an error and component is still mounted
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;

    const getMovement = async () => {
      try {
        const { data } = await axios.get(
          `${window.env.BASE_BE_URL}/movements/${id}/`,
        );
        // Only update state if component is still mounted
        if (isMounted) {
          // Convert null values to empty strings to avoid controlled/uncontrolled warnings
          const sanitizedData = {
            name: data.name || '',
            exercise: data.exercise || null,
            exerId: data.exerId || '',
            thumbnailUrl: data.thumbnailUrl || '',
            actionDescription: data.actionDescription || '',
            versions: data.versions || [],
          };
          setValues(sanitizedData);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getMovement();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
      isMountedRef.current = false;
    };
  }, [id]);

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
        <button
          type="submit"
          disabled={isLoading || !changesMade}
          className="submit-button"
        >
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

export { UpdateModal };
