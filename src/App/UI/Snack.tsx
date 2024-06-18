import { Alert, Snackbar } from '@mui/material';

interface IProps {
    message: string;
    open: boolean;
    severity: 'success' | 'error' | 'info' | 'warning';
    onClose: () => void;
}

export default function Snack({ message, open, severity, onClose }: IProps) {
    return (
        <Snackbar open={open} onClose={onClose} autoHideDuration={3000}>
            <Alert severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
