import { INewRecord } from '../OwnerRecord';
import { IconButton } from '@mui/material';

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

interface IProps {
    title: string;
    editMode: boolean;
    newRecord: INewRecord;
    setNewRecord: (INewRecord: INewRecord) => void;
    rse: string;
}

export default function ChangeTime({
    title,
    editMode,
    newRecord,
    setNewRecord,
    rse,
}: IProps) {
    return (
        <div className="flex flex-col justify-between">
            <span>{title}:</span>
            <div className="flex items-center justify-center gap-1">
                <IconButton
                    disabled={!editMode}
                    sx={{
                        transition: 'all 0.5s ease',
                        opacity: editMode ? 1 : 0,
                    }}
                    onClick={() =>
                        setNewRecord({
                            ...newRecord,
                            [rse]: newRecord[rse as keyof INewRecord] - 1,
                        })
                    }
                >
                    <ArrowCircleLeftIcon sx={IconButtonSX} />
                </IconButton>

                <span className="underline">
                    {newRecord[rse as keyof INewRecord]}:00
                </span>

                <IconButton
                    disabled={!editMode}
                    sx={{
                        transition: 'all 0.5s ease',
                        opacity: editMode ? 1 : 0,
                    }}
                    onClick={() =>
                        setNewRecord({
                            ...newRecord,
                            [rse]: newRecord[rse as keyof INewRecord] + 1,
                        })
                    }
                >
                    <ArrowCircleRightIcon sx={IconButtonSX} />
                </IconButton>
            </div>
        </div>
    );
}

const IconButtonSX = {
    color: 'white',
};
