import { Skeleton } from '@mui/material';

export default function CustomSkeleton({ children }: any) {
    return (
        <Skeleton
            animation={children === undefined ? 'wave' : false}
            variant="rectangular"
            sx={{
                minWidth: '100%',
                height: '100%',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {children}
        </Skeleton>
    );
}
