import { Divider, Paper } from '@mui/material';
import { useState } from 'react';
import { IRecord } from '../Day';
import ChangeTime from './Options/ChangeTime';
import Options from './Options/Options';
import UserCard from './UI/UserCard';

interface IProps {
    record: IRecord;
    changeTime: (newRecord: INewRecord) => void;
    deleteRecord: (id: number) => void;
}

export interface INewRecord {
    id: number;
    recordStart: number;
    recordEnd: number;
}

export default function OwnerRecord({
    record,
    changeTime,
    deleteRecord,
}: IProps) {
    // hooks
    const [newRecord, setNewRecord] = useState<INewRecord>({
        id: record.id,
        recordStart: record.recordStart,
        recordEnd: record.recordEnd,
    });

    const [editMode, setEditMode] = useState<boolean>(false);

    return (
        <Paper
            elevation={6}
            className="record animate-[fading_1500ms_ease-out]"
            key={record.id}
            sx={PaperSX}
        >
            <div className="w-full flex flex-col gap-[10px]">
                <UserCard record={record} />

                <div className="container">
                    <ChangeTime
                        title="Начало"
                        editMode={editMode}
                        newRecord={newRecord}
                        setNewRecord={setNewRecord}
                        rse="recordStart"
                    />

                    <Divider sx={{ bgcolor: '#E3E3E3', opacity: 0.5 }} />

                    <ChangeTime
                        title="Конец"
                        editMode={editMode}
                        newRecord={newRecord}
                        setNewRecord={setNewRecord}
                        rse="recordEnd"
                    />
                </div>
            </div>

            <Options
                editMode={editMode}
                setEditMode={setEditMode}
                save={() => {
                    setEditMode(false);
                    changeTime(newRecord);
                }}
                cancel={() =>
                    setNewRecord({
                        id: record.id,
                        recordStart: record.recordStart,
                        recordEnd: record.recordEnd,
                    })
                }
                remove={() => {
                    deleteRecord(record.id);
                }}
            />
        </Paper>
    );
}

const PaperSX = {
    bgcolor: 'transparent',
    borderRadius: '10px',
    color: 'white',
};
