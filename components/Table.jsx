'use client';

import { useState } from 'react';
/* eslint-disable react/prop-types */
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';

// import right from '../assets/icons/move-right.svg';
// import sort from '../assets/icons/Sort.svg';

export const Table = ({ columns, data = [] }) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="">
      <header className="my-5 flex gap-5 justify-between flex-col md:flex-row md:items-center">
        <div className="relative flex-1 max-w-sm">
          <input
            id="search"
            type="search"
            placeholder="Search"
            className="inline-block w-full border-2 rounded px-3 py-1 text-lg placeholder:font-roboto border-b-gray-300"
            onChange={(e) => setFiltering(e.target.value)}
          />
        </div>

      </header>

      <table className="w-full border-collapse border-spacing-0">
        {/* Head */}
        <thead className="bg-slate-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center gap-2 justify-between py-2 px-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                    <span className="group-hover:opacity-100 opacity-0 transition-opacity">
                      {/* <img src={sort} alt="asc-desc" /> */}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Head */}

        {/* Body */}
        <tbody className='bg-white'>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={`border-b border-b-gray-300 even:bg-blue-300 even:text-white`}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={`py-3 px-3`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* Body */}
      </table>

      <footer className="flex justify-between mt-5">
        <div className="flex items-center gap-2">
          {table.getCanPreviousPage() && (
            <button
              className="btn inline-flex px-3 gap-3"
              onClick={() => table.previousPage()}
            >
              {/* <img src={right} alt="" className="rotate-180" />  */}
              Prev Page
            </button>
          )}

          {table.getCanNextPage() && (
            <button
              className="btn inline-flex px-3 gap-3"
              onClick={() => table.nextPage()}
            >
              Next Page
              {/* <img src={right} alt="" /> */}
            </button>
          )}
        </div>

        <form
          className="flex gap-3 items-center"
          onSubmit={(e) => {
            e.preventDefault();
            table.setPageIndex(e.target.page.value);
          }}
        >
          <span>Página</span>

          <input
            type="number"
            name="page"
            id="page"
            min="0"
            className="inline-block rounded border w-12 py-1 text-center border-b-gray-300"
          />

          <span>de {table.getPageCount()}</span>
        </form>
      </footer>
    </div>
  );
};
