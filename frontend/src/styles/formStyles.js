// Consistent form styling for Material-UI components

export const formFieldStyles = {
  marginBottom: 3,
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#fafafa',
    '& fieldset': {
      borderColor: '#e0e0e0',
      borderWidth: '2px',
    },
    '&:hover fieldset': {
      borderColor: 'var(--bright-teal)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--bright-teal)',
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'var(--text-primary)',
    fontWeight: 500,
    '&.Mui-focused': {
      color: 'var(--bright-teal)',
    },
  },
  '& .MuiInputBase-input': {
    padding: '16px 14px',
    fontSize: '1rem',
  },
};

export const buttonStyles = {
  primary: {
    backgroundColor: 'var(--bright-teal)',
    color: 'white',
    borderRadius: '12px',
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 4px 12px rgba(78, 205, 196, 0.3)',
    '&:hover': {
      backgroundColor: '#45B7B8',
      boxShadow: '0 6px 16px rgba(78, 205, 196, 0.4)',
      transform: 'translateY(-2px)',
    },
    '&:disabled': {
      backgroundColor: '#ccc',
      color: '#666',
      boxShadow: 'none',
    },
  },
  secondary: {
    backgroundColor: 'var(--dark-teal)',
    color: 'white',
    borderRadius: '12px',
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#2C5F5F',
    },
  },
};

export const cardStyles = {
  backgroundColor: 'var(--card-bg)',
  borderRadius: 'var(--border-radius)',
  boxShadow: 'var(--shadow)',
  padding: '2rem',
};
