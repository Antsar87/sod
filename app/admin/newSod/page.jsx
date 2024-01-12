'use client';

import LoadingComponent from '@/components/LoadingComponent';
import { getError } from '@/utilities/getError';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const NewSod = () => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      const { data } = await axios.post('/sods', formData);
      console.log(data);
      toast.success(data.message);
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  };

  const onChangeFile = (file) => {
    const fileList = Array.from(file.target.files);

    setFiles(fileList);
  };
  return (
    <div className="max-w-lg mx-auto mt-10">
      {' '}
      <form
        className="shadow-xl px-3 py-5 rounded-lg bg-white"
        action={handleSubmit}
      >
        <input
          name="name"
          placeholder="name"
          type="name"
          className="input mb-5"
          disabled={loading}
          required
        />
        <input
          name="description"
          placeholder="description"
          type="text"
          className="input mb-5"
          required
          disabled={loading}
        />

        <input
          name="price"
          placeholder="price"
          type="number"
          className="input mb-5"
          required
          disabled={loading}
        />

        <input
          name="provider"
          placeholder="provider"
          type="text"
          className="input mb-5"
          required
          disabled={loading}
        />

        <input
          name="uploadImages"
          type="file"
          accept="image/*"
          className="file-input w-full mb-5"
          multiple
          required
          disabled={loading}
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

        <button className="btn w-full" disabled={loading}>
          <LoadingComponent isLoading={loading} />
        </button>
      </form>
    </div>
  );
};

export default NewSod;
