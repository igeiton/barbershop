import { Button } from '@mui/material';

interface IProps {
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    cancel: () => void;
    save: () => void;
}

export default function Options({
    editMode,
    setEditMode,
    cancel,
    save,
}: IProps) {
    return (
        <div className="flex w-full justify-around gap-5">
            {!editMode && (
                <Button
                    sx={{ flex: 1, maxWidth: '25%' }}
                    variant="contained"
                    color="warning"
                    onClick={() => setEditMode(!editMode)}
                >
                    Edit
                </Button>
            )}

            {editMode && (
                <>
                    <Button
                        sx={{ flex: 1, maxWidth: '25%' }}
                        variant="contained"
                        color="error"
                    >
                        Delete
                    </Button>

                    <Button
                        sx={{ flex: 1, maxWidth: '25%' }}
                        variant="contained"
                        color="warning"
                        onClick={() => {
                            setEditMode(!editMode);
                            cancel();
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        sx={{ flex: 1, maxWidth: '25%' }}
                        variant="contained"
                        color="success"
                        onClick={save}
                    >
                        Save
                    </Button>
                </>
            )}
        </div>
    );
}
