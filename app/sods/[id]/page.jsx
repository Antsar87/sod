import CalculateForm from '@/components/CalculateForm';
import CaruselComponent from '@/components/CaruselComponent';
import DepositModal from '@/components/DepositModal';
import VerifyModal from '@/components/VerifyModal';

export async function generateStaticParams() {
  const sods = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sods`);
  const sodsJson = await sods.json();

  return sodsJson.map((item) => ({ id: item._id }));
}

const sod = async (id) => {
  try {
    const sod = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sods/${id}`);
    const sodJson = await sod.json();
    return sodJson;
  } catch (error) {
    console.log(error);
  }
};

const SinglePage = async ({ params }) => {
  const data = await sod(params.id);

  console.log(data);

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <figure className='relative min-h-[25rem]'>
        {/* <img
          src={data.image[0].cloudinary_url}
          alt={data.name}
          loading="lazy"
        /> */}
        <CaruselComponent data={data.image} />
      </figure>

      <article>
        <h2 className="text-4xl capitalize font-bold mb-1">{data.name}</h2>

        <h3 className="text-xl mb-5">Insert sq ft needed</h3>

        <CalculateForm id={data._id} />

        <div className="mb-5">
          <p className="mb-5 font-bold">
            Price inclues Delivery and Installation
          </p>

          <p className="mb-5">{data.description}</p>

          <button className="btn border-0 rounded-sm shadow-md shadow-gray-600 bg-blue-500">
            Read More
          </button>
        </div>

        <p>
          Don't know how to measure sq ft?{' '}
          <a
            href="https://www.saratogasod.com/tips-resources/sod-calculator/"
            target="_blank"
            className="underline text-blue-400"
          >
            Click here
          </a>
        </p>
      </article>
    </div>
  );
};

export default SinglePage;
