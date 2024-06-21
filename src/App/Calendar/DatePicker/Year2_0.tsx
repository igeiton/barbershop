import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { years2_0 } from './Actions/Dates';
import { MenuItemSX, MenuListProps, MenuSX } from './DatePicker';

interface IProps {
    selectedYear: number;
    onChange: (value: number) => void;
}

export default function Year2_0({ selectedYear, onChange }: IProps) {
    // hooks
    const [isOpen, setOpen] = useState(false);

    return (
        <div>
            <Button
                variant="contained"
                id="basic-button-year"
                onClick={() => setOpen(true)}
                sx={{ width: '100%' }}
            >
                {selectedYear}
            </Button>

            <Menu
                open={isOpen}
                onClose={() => setOpen(false)}
                anchorEl={document.getElementById('basic-button-year')!}
                MenuListProps={MenuListProps}
                sx={MenuSX}
            >
                {years2_0().map((year, index) => (
                    <MenuItem
                        sx={{
                            ...MenuItemSX,
                            ...(selectedYear === year && {
                                bgcolor: '#E3E3E3',
                            }),
                        }}
                        key={index}
                        onClick={() => {
                            setOpen(false);
                            onChange(year);
                        }}
                    >
                        {year}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
