import { Box, Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';
import React, { FC } from 'react';
import { SelectProps } from '../../models/props/select.props';

const BaseSelect: FC<SelectProps> = (
    {
        name,
        control,
        label,
        variant = 'outlined',
        placeholder = '',
        props = {},
        values
    },
) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field : { onChange, value = Object.values(values)[0] } }) => (
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>
                    <Select
                        fullWidth
                        value={value}
                        label={label}
                        variant={variant}
                        placeholder={placeholder}
                        onChange={onChange}
                        labelId="demo-simple-select-filled-label"
                        {...props}
                    >
                        {Object.entries(values).map(([key, value], idx) =>
                            <MenuItem value={value} key={idx + value}>{key}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            )}
        />
    );
};

export default BaseSelect;
