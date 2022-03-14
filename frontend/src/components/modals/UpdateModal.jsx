/* eslint-disable jsx-a11y/label-has-associated-control */
import '../../css/Modal.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { FaCircleNotch } from 'react-icons/fa';
import { versions } from '../../dummyData/values';
import { exercises } from '../../dummyData/exercises.js';
import { selectStyle } from '../../css/selectStyle';

// TODO: This modal could be combined with the CreateModal, but modularized here for product definition branching
const UpdateModal = ({ triggerModal, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted] = useState(null);
  const [changesMade, setChangesMade] = useState(false);
  const [values, setValues] = useState({
    name: null,
    exercise: null,
    exerId: null,
    thumbnailUrl: null,
    actionDescription: null,
    versions: [],
  });

  useEffect(() => { console.log('values', values); }, [values]);
  const fetchMovement = async () => {
    console.log('fetch movement');
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.BASE_BE_URL}/movement/${id}`);
      setValues(response.data);

      console.log('responses', response.data);
      handleSelectExercise({ value: response.data.exercise, label: response.data.exercise_name });
      // handleSelectVersions(response.data.versions);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    console.log('updatemodal useeffect calleedd');
    fetchMovement();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
    setChangesMade(true); // TODO: obviously not a final solution for validation
  };

  const handleSelectExercise = (e) => {
    console.log('handle select exercisee', e);
    setValues({ ...values, exercise: e.value });
  };

  const handleSelectVersions = (e) => {
    setValues({ ...values, versions: [...values.versions, e[0].label] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`${process.env.BASE_BE_URL}/movement/${id}`, values);
      console.log('axios done');
      // toggleToast();
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
            <label htmlFor="name" className="form-label">Name</label>
              <input name="name" onChange={handleChange} type="text" value={values.name} id="name" className="form-input" required />
          </div>
          <div className="relative z-10 mb-6 w-full group">
            <label htmlFor="exercise" className="form-label">Exercise</label>
            {/* Using existing exercises on create for now */}
            <Select
              defaultValue="exercise"
              id="exercise"
              name="exercise"
              options={exercises}
              className="form-input border-0 p-0"
              classNamePrefix="select"
              styles={selectStyle}
              // value={options ? options.find(option => option.value === field.value) : ''}
              // onChange={(option: Option) => form.setFieldValue(field.name, option.value)}
              value={values.exercises}
              onChange={handleSelectExercise}
            />
          </div>
          <div className="relative mb-6 w-full group">
            <label htmlFor="versions" className="form-label">Versions</label>
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
              value={values.versions.label}
              styles={selectStyle}
              onChange={handleSelectVersions}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="exerId" className="form-label">Exer id</label>
            <input type="text" name="exerId" value={values.exerId} id="exerId" className="form-input" required onChange={handleChange} />
          </div>
          <div className="mb-6">
            <label htmlFor="thumbnailUrl" className="form-label">Thumbnail URL</label>
            <input type="url" name="thumbnailUrl" value={values.thumbnailUrl} id="thumbnailUrl" className="form-input" onChange={handleChange} />
          </div>
          <div className="mb-6">
            <label htmlFor="actionDescription" className="form-label">Description</label>
            <textarea id="actionDescription" name="actionDescription" value={values.actionDescription} className="form-input" onChange={handleChange} />
          </div>
          <button type="submit" disabled={isLoading || !changesMade} className="submit-button">{isLoading ? <FaCircleNotch className="animate-spin-slow" size="28" /> : submitted ? 'Success' : 'Submit'}</button>
        </form>
    </div>
  );
};

export { UpdateModal };
