import styles from "./FilterBarMakeField.module.css";

const FILTER_KEY = "make";

function FilterBarMakeField({
  filterValues,
  onChange,
  value,
}: {
  filterValues: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}) {
  return (
    <div className={styles.FilterBarMakeField}>
      <label htmlFor={FILTER_KEY}>{FILTER_KEY}</label>
      <select
        id={FILTER_KEY}
        name={FILTER_KEY}
        value={value}
        onChange={onChange}
        aria-label={`${FILTER_KEY} selection`}
      >
        <option value="" disabled hidden>
          Select a {FILTER_KEY}
        </option>
        {filterValues.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBarMakeField;
