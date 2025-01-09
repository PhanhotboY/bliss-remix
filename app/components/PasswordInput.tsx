// hooks
import { useState, useEffect } from 'react';

// utils
import PropTypes from 'prop-types';

const PasswordInput = ({
  id,
  label = 'Password',
  isInvalid,
  ...props
}: {
  id: string;
  label?: string;
  isInvalid?: boolean;
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = (e: any) => {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    props.value === '' && setIsPasswordVisible(false);
  }, [props.value]);

  return (
    <div className='field-wrapper'>
      <label className='field-label' htmlFor={id}>
        {label}
      </label>
      <div className='relative'>
        <input
          className={'field-input !pr-10'}
          id={id}
          name={id}
          type={isPasswordVisible ? 'text' : 'password'}
          autoComplete='current-password'
          {...props}
        />
        <button
          className='field-btn'
          onClick={togglePasswordVisibility}
          type='button'
          aria-label='Toggle password visibility'
        >
          <i
            className={`icon icon-eye${
              isPasswordVisible ? '-slash-regular' : '-regular'
            }`}
          />
        </button>
      </div>
    </div>
  );
};

PasswordInput.propTypes = {
  innerRef: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  isInvalid: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default PasswordInput;
