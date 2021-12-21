import { Control, FieldValues } from 'react-hook-form';

export type TextProps = {
    name: string;
    control: Control<FieldValues, object>;
    label: string;
    variant: string;
    placeholder: string;
    props?: any;
}
