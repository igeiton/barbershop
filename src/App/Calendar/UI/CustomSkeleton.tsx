import { Skeleton } from '@mui/material';

export default function CustomSkeleton() {
    return (
        <div className="w-full min-h-[100%]">
            <Skeleton
                animation="wave"
                variant="rectangular"
                sx={{ width: '100%', height: '100%', borderRadius: '10px' }}
            />
        </div>
    );
}
