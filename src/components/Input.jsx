import React from "react";

export default function Input({
  placeholder,
  name,
  value,
  className,
  onChange,
  id,
  type,
}) {
  return (
    <>
      <input
        value={value}
        name={name}
        type={type}
        className={`form-control ${className}`}
        placeholder={placeholder}
        onChange={onChange}
        id={id}
      />
    </>
  );
}
