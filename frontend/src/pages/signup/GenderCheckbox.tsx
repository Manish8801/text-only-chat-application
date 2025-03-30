import { IGenderCheckboxProps } from "../../prop_types/prop-types";

const GenderCheckbox = ({ onChange }: IGenderCheckboxProps) => {
  return (
    <div className="flex gap-4">
      <label className={`label gap-1 cursor-pointer`}>
        Male
        <input
          type="radio"
          value="male"
          name="gender"
          className="checkbox size-5 checkbox-info"
          onChange={onChange}
        />
      </label>
      <label className={`label gap-1 cursor-pointer`}>
        Female
        <input
          type="radio"
          name="gender"
          value="female"
          className="checkbox duration-75 size-5 checkbox-info"
          onChange={onChange}
        />
      </label>
      <label className={`label gap-1 cursor-pointer`}>
        Other
        <input
          type="radio"
          name="gender"
          value="other"
          className="checkbox size-5 checkbox-info duration-0"
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default GenderCheckbox;
