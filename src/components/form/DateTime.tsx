import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Controller } from "react-hook-form";
import { DateTimePicker } from "@mui/lab";
import { TextField } from "@mui/material";

export const DateTime = ({ name, control, label, sx = {}, props={}, minDateTime=null, maxDateTime=null}) => {
  return (
      <Controller
        name={name}
        control={control}
        render={({ field : {onChange , value } }) => (
            <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                value={value}
                label={label}
                onChange={onChange}
                minDateTime={minDateTime}
                maxDateTime={maxDateTime}
            />
        )}
      />
  );
};