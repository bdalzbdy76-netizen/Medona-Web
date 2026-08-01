function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
}) {
  return (
    <div className="form-field">
      {label && <label className="form-field__label">{label}</label>}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-field__input"
      />
    </div>
  );
}

export default Input;
