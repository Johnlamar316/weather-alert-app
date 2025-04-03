import React from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { AlertFeature } from 'types/alert';
import { useNavigate } from 'react-router-dom';
import { formatToLocal } from '../utils';
import { Chip } from '@mui/material';
import { SeverityColor } from 'types/enum';
import { StyledDataGridContainer } from './common/styled';

/**
 * AlertsTable is a data table component that displays weather alert data.
 *
 * It uses the MUI `DataGrid` to render a responsive table with sorting, pagination,
 * and custom cell rendering for severity chips. Alerts can be clicked to navigate to a detailed page.
 *
 * param {AlertFeature[]} alerts - The array of alert features to display
 * param {boolean} loading - Whether the data is still being fetched
 *
 * @component
 * returns JSX.Element
 */

interface Props {
  alerts: AlertFeature[];
  loading: boolean;
}

const AlertsTable: React.FC<Props> = ({ alerts, loading }) => {
  const navigate = useNavigate();

  //DataGrid rows
  const rows = alerts.map((alert) => ({
    id: alert.properties.id,
    event: alert.properties.event,
    severity: alert.properties.severity,
    area: alert.properties.areaDesc,
    effective: formatToLocal(alert.properties.effective),
    expires: formatToLocal(alert.properties.expires),
    status: alert.properties.status,
  }));

  //DataGrid columns
  const columns: GridColDef[] = [
    { field: 'event', headerName: 'Event', flex: 1.5 },
    {
      field: 'severity',
      headerName: 'Severity',
      width: 130,
      renderCell: (params) => {
        const value = params.value as keyof typeof SeverityColor;
        if (SeverityColor[value] === 'default') {
          return (
            <Chip
              label={value}
              size="small"
              sx={{
                backgroundColor: '#607d8b',
                color: '#fff',
                fontWeight: 'bold',
              }}
            />
          );
        }
        return <Chip label={value} color={SeverityColor[value] ?? 'default'} size="small" />;
      },
    },
    { field: 'area', headerName: 'Area' },
    { field: 'effective', headerName: 'Effective', width: 180 },
    { field: 'expires', headerName: 'Expires', width: 180 },
    { field: 'status', headerName: 'Status', width: 120 },
  ];

  return (
    <StyledDataGridContainer>
      <DataGrid
        aria-label="Weather alerts table"
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[10, 20, 100]}
        onRowClick={(params: GridRowParams) => {
          //encoded the id to use in the URL
          const encodedId = encodeURIComponent(params.id.toString());
          navigate(`/alert/${encodedId}`);
        }}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          color: '#fff',
          borderRadius: 2,
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
            color: '#000',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
          '& .MuiDataGrid-row:hover': {
            cursor: 'pointer',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
        }}
      />
    </StyledDataGridContainer>
  );
};

export default AlertsTable;
