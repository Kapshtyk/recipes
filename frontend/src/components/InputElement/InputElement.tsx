import React, { useEffect, useState } from 'react'

import { IInput } from '.'

const InputElement: React.FC<IInput> = ({
  name,
  label,
  type,
  value,
  inputStyles,
  labelStyles,
  containerStyles,
  ...rest
}) => {
  const [lableVisibility, setLabelVisibility] = useState<boolean>(false)
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true)

  useEffect(() => {
    if (value.length > 0) {
      setLabelVisibility(true)
    } else {
      setLabelVisibility(false)
    }
  }, [value])

  useEffect(() => {
    if (type === 'password') {
      setPasswordVisibility(false)
    }
  }, [type])

  return (
    <div className={containerStyles}>
      <label
        style={{ display: lableVisibility ? 'block' : 'none' }}
        className={labelStyles}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className={inputStyles}
        id={name}
        type={passwordVisibility ? 'text' : 'password'}
        {...rest}
      ></input>
      {type === 'password' && (
        <button
          style={{
            position: 'absolute',
            right: '25px'
          }}
          type="button"
          tabIndex={-1}
          onClick={() => setPasswordVisibility(!passwordVisibility)}
        >
          {passwordVisibility ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              fillOpacity="0.5"
              className="bi bi-eye-slash-fill"
              viewBox="0 0 16 16"
            >
              <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
              <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              fillOpacity="0.5"
              className="bi bi-eye-fill"
              viewBox="0 0 16 16"
            >
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
            </svg>
          )}
        </button>
      )}
    </div>
  )
}

export { InputElement }
