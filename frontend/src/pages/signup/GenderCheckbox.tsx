const GenderCheckbox = () => {
  return (
    <div className="flex gap-4">
      <div className="form-control">
        <label className={`label gap-1 cursor-pointer`}>
          <span className="label-text">Male</span>
         <input type="radio" value="male" name="gender" className="checkbox size-5 checkbox-info" />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-1 cursor-pointer`}>
          <span className="label-text">Female</span>
         <input type="radio" value="female"  name="gender" className="checkbox duration-75 size-5 checkbox-info" />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
