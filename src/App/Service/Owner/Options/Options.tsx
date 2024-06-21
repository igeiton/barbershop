import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';

interface IProps {
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    cancel: () => void;
    save: () => void;
    remove: () => void;
}

export default function Options({
    editMode,
    setEditMode,
    cancel,
    save,
    remove,
}: IProps) {
    return (
        <div className="options">
            <SpeedDial
                ariaLabel="Options"
                direction="down"
                icon={
                    <SpeedDialIcon
                        icon={<EditIcon />}
                        openIcon={<CloseIcon />}
                    />
                }
                open={editMode}
                onClick={() => {
                    setEditMode(!editMode);
                    cancel();
                }}
                FabProps={FabPropsSX}
            >
                <SpeedDialAction
                    icon={<DoneIcon sx={IconButtonSX} />}
                    title="Сохранить"
                    onClick={save}
                    sx={SpeedDialActionColored('green')}
                />

                <SpeedDialAction
                    icon={<DeleteForeverIcon sx={IconButtonSX} />}
                    title="Удалить"
                    onClick={remove}
                    sx={SpeedDialActionColored('red')}
                />
            </SpeedDial>
        </div>
    );
}

const IconButtonSX = {
    color: 'white',
};

const FabPropsSX = {
    sx: {
        borderRadius: '10px',
        opacity: 0.75,
        bgcolor: 'orange',
        '&:hover': { bgcolor: 'orange' },
    },
};

function SpeedDialActionColored(color: string) {
    return {
        bgcolor: color,
        '&:hover': { bgcolor: color, opacity: 0.5 },
        borderRadius: '10px',
    };
}
