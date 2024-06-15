import { Button } from '@mui/material';

export default function CustomButton({ children, onClick }: any) {
    return (
        <Button
            variant="contained"
            sx={{ padding: '10px 20px' }}
            onClick={onClick}
        >
            {children}
        </Button>
    );
}
