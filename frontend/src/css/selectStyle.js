const selectStyle = {
  option: (base) => ({
    ...base,
    color: '#2BB9B3',
  }),
  singleValue: (base) => ({
    ...base,
    color: '#2BB9B3',
  }),
  control: (base, state) => ({
    ...base,
    color: '#2BB9B3',
    background: '#374151',
    borderRadius: state.isFocused ? '.5rem' : '.5rem',
    borderColor: state.isFocused ? '#007AFF' : '#8F9094',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '0.5rem',
    marginTop: 0,
  }),
  menuList: (base) => ({
    ...base,
    background: '#374151',
    border: 'rounded',
    padding: '.625rem',
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9000,
  }),
};

export { selectStyle };
