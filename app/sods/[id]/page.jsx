import React from 'react';

export async function generateStaticParams() {
  const sods = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sods`);
  const sodsJson = await sods.json();

  return sodsJson.map((item) => ({ id: item._id }));
}

const sod = async (id) => {
  const sod = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sods/${id}`);
  const sodJson = await sod.json();

  return sodJson;
};

const SinglePage = async ({ params }) => {
  const data = await sod(params.id);

  console.log(data);

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <figure>
        <img
          src={data.image[0].cloudinary_url}
          alt={data.name}
          loading="lazy"
        />
      </figure>

      <article>
        <h2 className="text-3xl capitalize font-bold mb-3">{data.name}</h2>

        <h3 className="text-2xl mb-5">
          Enter number of pallets for pricing{' '}
          <span className="text-base block">
            500 sqft of sod per pallet Description
          </span>
        </h3>

        <p className='mb-5'>{data.description}</p>

        <div className="flex gap-3 mb-5">
          <input
            type="number"
            placeholder="Qty"
            min={0}
            className="input w-full max-w-20 bg-transparent text-black border-black placeholder:text-black"
          />

          <button className="btn bg-transparent text-black text-base border-black">
            Add Cart
          </button>
        </div>
      </article>
    </div>
  );
};

export default SinglePage;
