'use client';
import CellCustom from './CellCustom';
import { Table } from '@/components/Table';

const columns = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Sq Ft Price',
    accessorKey: 'squareFeetInPallet',
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
