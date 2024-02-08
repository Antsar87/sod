'use client';

import axios from 'axios';
import { revalidate } from '@/components/revalidate';
import { getError } from '@/utilities/getError';
import { Suspense, useState } from 'react';
import { toast } from 'react-toastify';
import NewSod from './NewSod';

const CellCustom = ({ info }) => {
  const [loading, setLoading] = useState(false);
  const rowData = info.row.original;

  const handleDelete = async () => {
    console.log(rowData);
    setLoading(true);

    try {
      const { data } = await axios.delete(`/sods/${rowData._id}`);
      await revalidate('/admin/sodmanagement');
      toast.success(data.message);
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    document.getElementById(`newSod-${rowData?._id}`).showModal();
  };

  console.log('aqui');

  return (
    <div className="flex gap-3">
      <button
        onClick={handleDelete}
        disabled={loading}
        className="disabled:opacity-25"
      >
        Delete
      </button>
      <button
        onClick={handleEdit}
        disabled={loading}
        className="disabled:opacity-25"
      >
        Edit
      </button>
      {/* {editForm._id && <NewSupplier editData={editForm} />} */}{' '}
      <Suspense fallback={<span className="loading"></span>}>
        <NewSod editData={rowData} />
      </Suspense>
    </div>
  );
};

export default CellCustom;
