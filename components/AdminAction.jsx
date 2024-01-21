'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '@/context';

import LoadingComponent from '@/components/LoadingComponent';
import { getError } from '@/utilities/getError';
import axios from 'axios';
import { toast } from 'react-toastify';
import { revalidate } from './revalidate';

const AdminAction = () => {
  const [show, setShow] = useState(false);
  const { state } = useContext(UserContext);

  useEffect(() => {
    if (state.userInfo.role === 'admin') {
      setShow(true);
      return;
    }

    setShow(false);
  }, [state.userInfo.role]);

  if (!show) {
    return null;
  }

  return (
    <li>
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="uppercase text-xl">
          Admin
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 bg-blue-300"
        >
          <li>
            <button
              onClick={() => document.getElementById('my_modal_1').showModal()}
            >
              Add sod
            </button>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>

      <NewSod />
    </li>
  );
};

const NewSod = () => {
  const [files, setFiles] = useState([]);
  const form = useRef();

  const handleSubmit = async (formData) => {
    try {
      const { data } = await axios.post('/sods', formData);
      await revalidate();
      console.log(data);
      toast.success('Sod created');
      form.current.reset();
      setFiles([]);
      document.getElementById('my_modal_1').close();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const onChangeFile = (file) => {
    const fileList = Array.from(file.target.files);

    setFiles(fileList);
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <button
          className="btn bg-red-400"
          onClick={() => {
            setFiles([]);
            form.current.reset();
            document.getElementById('my_modal_1').close();
          }}
        >
          Close
        </button>
        <div className="w-full mt-5">
          <form
            ref={form}
            className="rounded-lg bg-white"
            action={handleSubmit}
          >
            <input
              name="name"
              placeholder="name"
              type="name"
              className="input mb-5"
              required
            />

            <input
              name="price"
              placeholder="price"
              type="number"
              className="input mb-5"
              required
            />

            <input
              name="provider"
              placeholder="provider"
              type="text"
              className="input mb-5"
              required
            />

            <textarea
              name="description"
              placeholder="description"
              type="text"
              className="input mb-5"
              required
              rows={40}
            />

            <input
              name="uploadImages"
              type="file"
              accept="image/*"
              className="file-input w-full mb-5"
              multiple
              required
              onChange={onChangeFile}
            />

            {!!files.length && (
              <ul className="mb-10 flex">
                {files.map((item, idx) => (
                  <li className="flex-1" key={idx}>
                    <img
                      width="100%"
                      className="object-cover max-h-52"
                      src={URL.createObjectURL(item)}
                    />
                  </li>
                ))}
              </ul>
            )}

            <LoadingComponent className="btn w-full" />
            {/* <button  disabled={loading}></button> */}
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AdminAction;
