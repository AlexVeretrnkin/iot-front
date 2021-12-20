import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Controller } from "react-hook-form";
import { DateTimePicker } from "@mui/lab";
import { TextField, Stack } from "@mui/material";

export const DateTimeRange = ({ name, control, label, sx = {}, props={}, minDateTime=null, maxDateTime=null}) => {
  return (
      <Controller
        name={name}
        control={control}
        render={({ field : {onChange , value } }) => (
          <Stack direction="row">
            <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                value={value}
                label={label}
                onChange={onChange}
                minDateTime={minDateTime}
                maxDateTime={maxDateTime}
            />

            <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                value={value}
                label={label}
                onChange={onChange}
                minDateTime={minDateTime}
                maxDateTime={maxDateTime}
            />
          </Stack>
        )}
      />
  );
};