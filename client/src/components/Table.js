import { DataGrid, GridToolbar } from '@mui/x-data-grid';

export default function ToolbarGrid({col, row, actions, isLoading}) {
  const rows = row.map(item => ({id: item._id, ...item}));
  return (
    <div style={{ height: '70vh', width: '100%' }}>
      <DataGrid
        columns={ col }
        rows={ rows }
        components={{
          Toolbar: GridToolbar,
        }}
        loading={ isLoading }
      />
    </div>
  );
}