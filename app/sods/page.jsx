import Link from 'next/link';

const fetchingData = async () => {
  const fetchData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sods`);
  const dataJson = fetchData.json();

  return dataJson;
};

const sodsPage = async () => {
  const data = await fetchingData();

  console.log(data.length);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
        {data.map((item) => (
          <article
            className="card w-full bg-base-100 shadow-xl max-w-md mx-auto"
            key={item._id}
          >
            <figure>
              <img
                src={
                  item.image[0]?.cloudinary_url ||
                  'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
                }
                alt="Shoes"
                height={300}
                decoding="async"
                loading="lazy"
                className="w-full object-cover"
                style={{ height: '300px' }}
              />
            </figure>
            <div className="px-5 py-3">
              <h2 className="card-title text-2xl">{item.name}</h2>
              <p>
                <span className="">Supplier:</span> {item?.providerInfo?.name}
              </p>
              <p className="mb-3">
                {item?.providerInfo?.squareFeetInPallet} sqft of sod per pallet
              </p>

              <p className='mb-3'>{item.description}</p>

              {/* <div className="flex gap-3 mb-5">
                <input
                  type="number"
                  placeholder="Qty"
                  min={0}
                  className="input w-full max-w-20"
                />

                <button className="btn bg-transparent text-black text-base">
                  Add Cart
                </button>
              </div> */}

              <div className="card-actions">
                <Link
                  href={`/sods/${item._id}`}
                  className="btn bg-green-500 w-full"
                >
                  More info
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default sodsPage;
