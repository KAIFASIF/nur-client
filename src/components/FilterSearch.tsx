import React from "react";
import RHFTextField from "../libraries/form/RHFTextField";
import Button from "./Button";

interface filterSearchProps {
  placeholder: string;
  clearFilter: () => void;
  resetFilter: () => void;
  onSubmit: () => void;
}
const FilterSearch: React.FC<filterSearchProps> = ({
  placeholder,
  clearFilter,
  resetFilter,
  onSubmit,
}) => {
  return (
    <div className="grid  sm:grid-cols-12 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <RHFTextField name="search" placeholder={placeholder} />
      <RHFTextField
        name="startDate"
        type="date"
        shrinkLabel="From Date"
        InputLabelProps={{ shrink: true }}
      />
      <RHFTextField
        name="endDate"
        type="date"
        shrinkLabel="To Date"
        InputLabelProps={{ shrink: true }}
      />

      <div className="flex gap-4">
        <Button
          label="Clear"
          className="btn btn-primary-outline"
          onClick={clearFilter}
        />
        <Button
          label="Reset"
          className="btn btn-primary-outline"
          onClick={resetFilter}
        />
        <Button label="Submit" className="btn btn-primary" onClick={onSubmit} />
      </div>
    </div>
  );
};

export default React.memo(FilterSearch);
