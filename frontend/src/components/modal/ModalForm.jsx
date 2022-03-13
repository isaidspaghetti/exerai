// /* eslint-disable jsx-a11y/label-has-associated-control */
// import React, { useState } from 'react';
// import { Formik } from 'formik';
// import Select from 'react-select';
// import { exercises, versions } from '../../data/values';
// // import { selectStyle } from '../../css/selectStyle.js';

// const ModalForm = () => {
//   const validate = () => {
//     // do validate data here
//     const errors = {};
//     return errors;
//   };
//   const handleSubmit = async () => {
//     setIsLoading(true);
//     console.log('handleSubmit called');
//   };

//   return (
//     <Formik
//       initialValues={{
//         name: 'Name',
//         exercise: 'exercise id',
//         versions: 'Versions (separate by comma)',
//         exerId: 'ExerId',
//         thumbnailUrl: 'Thumbnail URL',
//         actionDescription: 'Movement Description',
//       }}
//       validate={(values) => validate(values)}
//       onSubmit={(values) => handleSubmit(values)}
//     >
//         {({
//           values,
//           errors,
//           touched,
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           isSubmitting,
//         }) => (
//         <form onSubmit={handleSubmit}>
//           <div className="mb-6">
//             <label htmlFor="name" className="form-label">Name</label>
//               <input type="name" id="name" className="form-input" placeholder="Movement name" required />
//           </div>
//           <div className="relative z-10 mb-6 w-full group">
//             <label htmlFor="exercise" className="form-label">Exercise</label>
//             {/* Using existing exercises on create for now */}
//             <Select
//               defaultValue="exercise"
//               // isMulti
//               name="exercise"
//               options={exercises}
//               className="form-input border-0 p-0"
//               classNamePrefix="select"
//               styles={selectStyle}
//             />
//           </div>
//             <div className="relative z-10 mb-6 w-full group">
//             <label htmlFor="version" className="form-label">Versions</label>
//             {/* Using existing versions on create for now */}
//             <Select
//               defaultValue="eg: 1.1.1, 1.5.1"
//               isMulti
//               allowSelectAll
//               name="version"
//               options={versions}
//               className="form-input border-0 p-0"
//               classNamePrefix="select"
//               styles={selectStyle}
//             />
//             </div>
//           <div className="mb-6">
//             <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
//             <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Repeat password</label>
//             <input type="password" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
//           </div>
//           <div className="flex items-start mb-6">
//             <div className="flex items-center h-5">
//               <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
//             </div>
//             <div className="ml-3 text-sm">
//               <label htmlFor="terms" className="font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
//             </div>
//           </div>

//           <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
//         </form>

//         )}
//       {/* <button type="submit" className="sidebar-icon group mt-0 mr-0" disabled={!name && !version}>
//         {isLoading ? <FaCircleNotch className="animate-spin-slow" size="28" /> : <FaSearch size="28" />}
//       </button> */}
//     </Formik>

//   );
// };

// export { ModalForm };
