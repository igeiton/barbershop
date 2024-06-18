import { Button } from '@mui/material';

interface IProps {
    children: React.ReactNode;
    onClick: () => void;
}

export default function CustomButton({ children, onClick }: IProps) {
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
