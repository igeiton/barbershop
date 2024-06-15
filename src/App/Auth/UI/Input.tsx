import { TextField } from '@mui/material';

export default function CustomInput({
    name,
    value,
    onChange,
    type = 'text',
    ...props
}: any) {
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
