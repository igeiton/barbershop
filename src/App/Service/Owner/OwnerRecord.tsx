import { Divider, Paper } from '@mui/material';
import { useState } from 'react';
import Options from './Options/Options';

export default function OwnerRecord({ record, handleUpdateRecord }: any) {
    const [newRecord, setNewRecord] = useState({
        id: record.id,
        recordStart: record.recordStart,
        recordEnd: record.recordEnd,
    });
    const [editMode, setEditMode] = useState(false);

    return (
        <Paper
            elevation={6}
            className="record flex-col"
            key={record.recordStart}
        >
            <div className="w-full flex flex-col gap-[10px]">
                <div className="flex justify-between">
                    <span>Start on:</span>
                    <div className="flex items-center gap-1">
                        {editMode && (
                            <button
                                onClick={() =>
                                    setNewRecord({
                                        ...newRecord,
                                        recordStart: newRecord.recordStart - 1,
                                    })
                                }
                            >
                                -
                            </button>
                        )}

                        <span className="underline">
                            {newRecord.recordStart}:00
                        </span>

                        {editMode && (
                            <button
                                onClick={() =>
                                    setNewRecord({
                                        ...newRecord,
                                        recordStart: newRecord.recordStart + 1,
                                    })
                                }
                            >
                                +
                            </button>
                        )}
                    </div>
                </div>

                <Divider />

                <div className="flex justify-between">
                    <span>End on:</span>
                    <div className="flex items-center gap-1">
                        {editMode && (
                            <button
                                onClick={() =>
                                    setNewRecord({
                                        ...newRecord,
                                        recordEnd: newRecord.recordEnd - 1,
                                    })
                                }
                            >
                                -
                            </button>
                        )}

                        <span className="underline">
                            {newRecord.recordEnd}:00
                        </span>

                        {editMode && (
                            <button
                                onClick={() =>
                                    setNewRecord({
                                        ...newRecord,
                                        recordEnd: newRecord.recordEnd + 1,
                                    })
                                }
                            >
                                +
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <Options
                editMode={editMode}
                setEditMode={setEditMode}
                save={() => {
                    setEditMode(false);
                    handleUpdateRecord(newRecord);
                }}
                cancel={() =>
                    setNewRecord({
                        id: record.id,
                        recordStart: record.recordStart,
                        recordEnd: record.recordEnd,
                    })
                }
            />
        </Paper>
    );
}