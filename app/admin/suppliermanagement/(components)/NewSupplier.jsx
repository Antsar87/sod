'use client';
import { useRef, useState } from 'react';
import LoadingComponent from '@/components/LoadingComponent';
import Modal from '@/components/Modal';
import { toast } from 'react-toastify';
import axios from 'axios';
import { revalidate } from '@/components/revalidate';
import { getError } from '@/utilities/getError';

const NewSupplier = ({ editData }) => {
  const form = useRef();
  const modalId = `newSupplier-${editData?._id}`;

  console.log(editData);

  const handleSubmit = async (formData) => {
    const dataForm = {
      name: formData.get('name'),
      squareFeetInPallet: formData.get('squareFeetInPallet'),
    };

    try {
      let message;

      if (editData?._id) {
        message = await axios.put(`/suppliers/${editData?._id}`, dataForm);
      } else {
        message = await axios.post('/suppliers', dataForm);
      }

      console.log(message);
      await revalidate('admin/suppliermanagement');
      toast.success(message.data.message);
      form.current.reset();
      document.getElementById(modalId).close();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Modal
      showBtn={!editData?._id}
      id={modalId}
      btnText={'New Supplier'}
      onClose={() => {
        form.current.reset();
      }}
    >
      <form ref={form} className="rounded-lg bg-white" action={handleSubmit}>
        <input
          name="name"
          placeholder="name"
          type="name"
          className="input mb-5"
          required
          defaultValue={editData?.name}
        />

        <input
          name="squareFeetInPallet"
          placeholder="Sq Ft Price"
          type="number"
          className="input mb-5"
          required
          defaultValue={editData?.squareFeetInPallet}
        />
        <LoadingComponent className="btn w-full" />
      </form>
    </Modal>
  );
};

export default NewSupplier;
