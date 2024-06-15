import { Alert, Snackbar } from '@mui/material';

export default function Snack({ message, open, onClose }: any) {
    return (
        <Snackbar open={open} onClose={onClose} autoHideDuration={3000}>
            <Alert severity="error" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
