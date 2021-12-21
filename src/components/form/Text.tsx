import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Controller } from "react-hook-form";
import { DateTimePicker } from "@mui/lab";
import { TextField } from "@mui/material";

export const Text = ({ name, control, label, variant="outlined", placeholder="", props={}}) => {
  return (
      <Controller
        name={name}
        control={control}
        render={({ field : {onChange , value } }) => (
            <TextField
                value={value}
                label={label}
                variant={variant}
                placeholder={placeholder}
                onChange={onChange}
                {...props}
            />
        )}
      />
  );
};