'use client';
import { Table } from '@/components/Table';
import CellCustom from './CellCustom';

const columns = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Price',
    accessorKey: 'price',
  },
  {
    header: 'Provider',
    accessorFn: (row) => `${row?.providerInfo?.name}`,
  },

  {
    header: 'Actions',
    cell: (info) => <CellCustom info={info} />,
  },
];

const TableComponent = ({ data }) => {
  return <Table data={data} columns={columns} />;
};

export default TableComponent;
