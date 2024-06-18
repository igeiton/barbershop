import { TextField } from '@mui/material';

interface IProps {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    [key: string]: any;
}

export default function CustomInput({
    name,
    value,
    onChange,
    type = 'text',
    ...props
}: IProps) {
    return (
        <div>
            <TextField
                label={name.toUpperCase()}
                autoComplete="off"
                type={type}
                className="input"
                value={value}
                onChange={onChange}
                {...props}
            />
        </div>
    );
}
