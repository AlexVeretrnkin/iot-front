import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { TextProps } from '../../models/props/text.props';

export const Text: FC<TextProps> = ({ name, control, label, variant = 'outlined', placeholder = '', props = {} }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field : { onChange, value = '' } }) => (
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
