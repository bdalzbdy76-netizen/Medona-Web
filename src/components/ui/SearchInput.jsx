import { Search } from "lucide-react";

function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="search-input">
      <Search size={18} className="search-input__icon" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={placeholder}
        className="search-input__field"
      />
    </div>
  );
}

export default SearchInput;
