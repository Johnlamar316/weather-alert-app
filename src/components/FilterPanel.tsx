import React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AlertSeverity, AlertStatus, severityOptions, statusOptions } from 'types/enum';
import { useAppDispatch, useAppSelector } from 'states/hooks';
import { clearFilters, setFilters } from '../states';
import { cleanFilterFunc } from '../utils';
import { FilterWrapper, StyledButton } from './common/styled';

interface Props {
  onChange: (filters: Record<string, string>) => void;
}

const FilterPanel: React.FC<Props> = ({ onChange }) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.global);
  const { start, end, severity, status } = filters;

  //removes empty string
  const queryParams = cleanFilterFunc(filters as Record<string, string>);

  const handleApply = () => {
    dispatch(setFilters(filters));
    onChange(queryParams);
  };

  const handleClear = () => {
    dispatch(clearFilters());
    onChange({});
  };

  return (
    <FilterWrapper>
      <DatePicker
        label="Start Date"
        value={start ? dayjs(filters.start) : null}
        onChange={(date) => dispatch(setFilters({ ...filters, start: date?.toISOString() || '' }))}
        slotProps={{ textField: { size: 'small' } }}
      />

      <DatePicker
        label="End Date"
        value={end ? dayjs(filters.end) : null}
        onChange={(date) => dispatch(setFilters({ ...filters, end: date?.toISOString() || '' }))}
        slotProps={{ textField: { size: 'small' } }}
      />

      <TextField
        label="Severity"
        select
        value={severity}
        onChange={(e) =>
          dispatch(setFilters({ ...filters, severity: e.target.value as AlertSeverity }))
        }
        size="small"
        sx={{ minWidth: 100 }}
      >
        {severityOptions.map((option: AlertSeverity | '') => (
          <MenuItem key={option} value={option}>
            {option || 'All'}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Status"
        select
        value={status}
        onChange={(e) =>
          dispatch(setFilters({ ...filters, status: e.target.value as AlertStatus }))
        }
        size="small"
        sx={{ minWidth: 100 }}
      >
        {statusOptions.map((option: AlertStatus | '') => (
          <MenuItem key={option} value={option}>
            {option || 'All'}
          </MenuItem>
        ))}
      </TextField>

      <Box sx={{ display: 'flex', gap: 1, marginLeft: 'auto' }}>
        <StyledButton variant="contained" size="medium" onClick={handleApply}>
          Apply
        </StyledButton>

        <StyledButton variant="outlined" size="medium" onClick={handleClear}>
          Clear
        </StyledButton>
      </Box>
    </FilterWrapper>
  );
};

export default FilterPanel;
