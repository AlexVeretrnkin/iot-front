import { TextProps } from './text.props';

export type SelectProps = TextProps & {
    values: Record<string, string>;
}
