import { Menu, MenuItem } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';
import Snack from '../../../UI/Snack';

export default function Phone({ record }: any) {
    // hooks
    const [isOpen, setOpen] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);

    // functions
    const copyToClipboard = (value: string): void => {
        navigator.clipboard.writeText(value.replace(/\s/g, ''));
        setShowSnackbar(true);
    };

    return (
        <>
            <div
                className="flex underline cursor-pointer"
                id={record.id}
                onClick={() => setOpen(true)}
            >
                {record.user.phone}
            </div>

            <Menu
                open={isOpen}
                onClose={() => setOpen(false)}
                anchorEl={document.getElementById(record.id)!}
                sx={MenuSX}
            >
                <MenuItem
                    onClick={() => {
                        copyToClipboard(record.user.phone);
                        setOpen(false);
                    }}
                >
                    <ContentCopyIcon
                        sx={{
                            width: '15px',
                            height: '15px',
                        }}
                    />
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        window.open(
                            `tel:${record.user.phone.replace(/\s/g, '')}`
                        );
                        setOpen(false);
                    }}
                >
                    <CallIcon
                        sx={{
                            width: '15px',
                            height: '15px',
                        }}
                    />
                </MenuItem>
            </Menu>

            <Snack
                message={'Номер скопирован.'}
                severity="success"
                open={showSnackbar}
                onClose={() => setShowSnackbar(false)}
            />
        </>
    );
}

const MenuSX = {
    '.MuiMenu-root': {
        padding: '5px',
    },
    '.MuiMenu-list': {
        display: 'flex',
        padding: '5px',
        gap: '5px',
    },
    '.MuiMenu-paper': {
        borderRadius: '10px',
    },
    '.MuiMenuItem-root': {
        borderRadius: '10px',
    },
    '.Mui-focusVisible': {
        backgroundColor: 'white',
    },
};
