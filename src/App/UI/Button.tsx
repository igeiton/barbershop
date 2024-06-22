import { Button } from '@mui/joy';

interface IProps {
    loading?: boolean;
    children: React.ReactNode;
    onClick: () => void;
}

export default function CustomButton({
    loading = false,
    children,
    onClick,
}: IProps) {
    return (
        <Button
            loading={loading}
            variant="solid"
            sx={{ padding: '10px 20px' }}
            onClick={onClick}
        >
            {children}
        </Button>
    );
}
