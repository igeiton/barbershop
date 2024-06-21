import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { months2_0 } from './Actions/Dates';
import { MenuItemSX, MenuListProps, MenuSX } from './DatePicker';

interface IProps {
    selectedMonth: number;
    onChange: (value: number) => void;
}

export default function Month2_0({ selectedMonth, onChange }: IProps) {
    // hooks
    const [isOpen, setOpen] = useState(false);

    return (
        <div>
            <Button
                variant="contained"
                id="basic-button-month"
                onClick={() => setOpen(true)}
                sx={{ width: '100%' }}
            >
                {months2_0[selectedMonth - 1]}
            </Button>

            <Menu
                open={isOpen}
                onClose={() => setOpen(false)}
                anchorEl={document.getElementById('basic-button-month')!}
                MenuListProps={MenuListProps}
                sx={MenuSX}
            >
                {months2_0.map((month, index) => (
                    <MenuItem
                        sx={{
                            ...MenuItemSX,
                            ...(selectedMonth === index + 1 && {
                                bgcolor: '#E3E3E3',
                            }),
                        }}
                        key={index}
                        onClick={() => {
                            setOpen(false);
                            onChange(index);
                        }}
                    >
                        {month}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
