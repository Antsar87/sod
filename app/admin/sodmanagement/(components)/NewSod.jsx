'use client';
import LoadingComponent from '@/components/LoadingComponent';
import Modal from '@/components/Modal';
import { revalidate } from '@/components/revalidate';
import { getError } from '@/utilities/getError';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { MdDeleteOutline } from 'react-icons/md';

const NewSod = ({ editData }) => {
  const modalId = `newSod-${editData?._id}`;

  const [imageToDelete, setImageToDelete] = useState([]);
  // const [image, SetImage] = useState(editData?.image || []);

  const [files, setFiles] = useState([]);
  const [options, setOptions] = useState([]);

  const form = useRef();

  const handleSubmit = async (formData) => {
    let message;

    try {
      if (editData?._id) {
        // Si el usuario esta editanco
        const imagesUploaded = editData?.image;
        const deletedImg = imagesUploaded.filter(
          (item) => !imageToDelete.includes(item.cloudinary_id)
        );

        formData.append('image', JSON.stringify(deletedImg));
        formData.append('imageToDelete', JSON.stringify(imageToDelete));

        console.log(deletedImg);

        message = await axios.put(`/sods/${editData?._id}`, formData);
      } else {
        message = await axios.post('/sods', formData);
      }
      console.log(message);
      await revalidate('/sods');
      await revalidate('/admin/sodmanagement');
      toast.success(message.data.message);
      form.current.reset();
      setFiles([]);
      document.getElementById(modalId).close();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const onChangeFile = (file) => {
    const fileList = Array.from(file.target.files);

    setFiles(fileList);
  };

  const handleDeleteImg = (id) => {
    setImageToDelete((prev) => [...prev, id]);
  };

  useEffect(() => {
    const fetchingOptions = async () => {
      try {
        const { data } = await axios('/suppliers');
        setOptions(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchingOptions();
  }, []);

  console.log(editData?.providerInfo);
  return (
    <Modal
      id={modalId}
      showBtn={!editData?._id}
      btnText={'New Sod'}
      onClose={() => {
        setFiles([]);
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
          name="price"
          placeholder="price"
          type="number"
          className="input mb-5"
          required
          defaultValue={editData?.price}
          step={'any'}
        />

        {!!options.length && (
          <select
            name="providerInfo"
            className="input mb-5"
            defaultValue={editData?.providerInfo?._id}
          >
            {options.map((item) => (
              <option value={item._id} key={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        )}

        <textarea
          name="description"
          placeholder="description"
          type="text"
          className="input mb-5"
          required
          rows={40}
          defaultValue={editData?.description}
        />

        <input
          name="uploadImages"
          type="file"
          accept="image/*"
          className="file-input w-full mb-5"
          multiple
          required={!editData?.image.length}
          onChange={onChangeFile}
        />

        {!!files.length && (
          <>
            <h2 className="text-xl mb-3">Images to upload</h2>

            <ul className="mb-5 flex gap-5 overflow-auto">
              {files.map((item, idx) => (
                <li className="relative h-[200px] w-[230px]" key={idx}>
                  <img
                    width={230}
                    // height={200}
                    className="object-cover h-full max-w-none"
                    src={URL.createObjectURL(item)}
                  />
                </li>
              ))}
            </ul>
          </>
        )}

        {!!editData?.image.length && (
          <>
            <h2 className="text-xl mb-3">Images Uploaded</h2>

            <ul className="mb-10 flex gap-5 overflow-auto">
              {editData?.image.map((item, idx) => (
                <li
                  className={`h-[200px] w-[230px] relative ${
                    imageToDelete.find((i) => i === item.cloudinary_id)
                      ? 'hidden'
                      : null
                  }`}
                  key={idx}
                >
                  <button
                    className="bg-red-600 text-white rounded-bl-md absolute top-0 right-0 p-1"
                    onClick={() => handleDeleteImg(item.cloudinary_id)}
                    type="button"
                  >
                    <MdDeleteOutline className="text-2xl" />
                  </button>

                  <img
                    width={230}
                    className="object-cover h-full max-w-none"
                    src={item.cloudinary_url}
                    decoding="async"
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>
          </>
        )}

        <LoadingComponent className="btn w-full" />
        {/* <button  disabled={loading}></button> */}
      </form>
    </Modal>
  );
};

export default NewSod;
