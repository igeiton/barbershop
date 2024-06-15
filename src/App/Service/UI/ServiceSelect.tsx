import { Button } from '@mui/material';

export default function ServiceSelect({
    bgImage,
    active,
    onClick,
    children,
    ...props
}: any) {
    return (
        <div
            style={getBackground(bgImage)}
            className={`${
                active ? 'w-[75%]' : 'w-[25%]'
            } duration-300 ease-out`}
            onClick={onClick}
        >
            <Button
                variant={active ? 'outlined' : 'contained'}
                sx={{
                    backdropFilter: 'blur(2.5px)',
                    color: 'white',
                    borderColor: 'white',
                    ...(!active && { height: '100%', width: '100%' }),
                    '&:hover': {
                        borderColor: 'white',
                    },
                }}
                {...props}
            >
                {children}
            </Button>
        </div>
    );
}

function getBackground(bgImage: string) {
    if (bgImage === '') return { backgroundColor: 'transparent' };

    return {
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: '100px',
        display: 'flex',
        borderRadius: '5px',
        justifyContent: 'center',
        alignItems: 'center',
    };
}
