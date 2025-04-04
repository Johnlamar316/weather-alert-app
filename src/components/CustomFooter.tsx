import React from 'react';
import { GridPagination } from '@mui/x-data-grid';
import { Box, TextField, MenuItem } from '@mui/material';

interface CustomFooterProps {
  limit: number | undefined;
  onLimitChange: (newLimit: number | undefined) => void;
}

export const CustomFooter: React.FC<CustomFooterProps> = ({ limit, onLimitChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
      }}
    >
      {/*  custom total selector */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <span>Total alert data:</span>
        <TextField
          select
          size="small"
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          sx={{ minWidth: 80 }}
        >
          {[10, 20, 50, 100, 200, 500].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      {/*Built-in pagination*/}
      <GridPagination />
    </Box>
  );
};
