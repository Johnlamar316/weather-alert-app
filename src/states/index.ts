import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertSeverity, AlertStatus } from 'types/enum';

export interface AlertFilterState {
  start?: string;
  end?: string;
  severity?: AlertSeverity | '';
  status?: AlertStatus | '';
}

export const initialState: AlertFilterState = {
  start: '',
  end: '',
  severity: '',
  status: '',
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<AlertFilterState>) => {
      return { ...state, ...action.payload };
    },
    clearFilters: () => initialState,
  },
});

export const { setFilters, clearFilters } = globalSlice.actions;

export default globalSlice.reducer;
