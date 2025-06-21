export const selectStyle = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#222',
    color: '#fff',
    borderColor: '#444',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#222',
    color: '#fff',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#444' : '#222',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#333',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#444',
    color: '#fff',
  }),
};
