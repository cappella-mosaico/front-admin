export const DomingoSelector = ({ value, handleChange }) => {
  return (                  
    <label htmlFor="inicio">
      Domingo:
      <input type="date"
             name="inicio"
             value={value}
             min="2023-04-23"
             max="2030-12-28"
             step="7"
             onChange={handleChange}
             required />
    </label>);
};
