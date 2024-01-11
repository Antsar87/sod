import ZipCodeForm from '@/components/ZipCodeForm';

export default function Home() {
  return (
    <main>
      <div className="zipCode text-center mt-20 py-20 md:py-44">
        <div className="container max-w-4xl">
          <h2 className="uppercase text-4xl mb-5 text-pretty font-bold">
            enter your zipcode to <span className="block">see if we serve your area</span>
          </h2>

          <ZipCodeForm />
        </div>
      </div>

      <div className="container max-w-6xl mt-10">
        <h3 className="uppercase text-4xl text-center font-bold">
          IT'S as easy as ...
        </h3>

        <div className="flex flex-col md:flex-row gap-5 mt-10">
          <div className="flex items-center gap-3 bg-green-500 px-5 py-2 text-white rounded-md flex-1">
            <span className="bg-blue-700  text-3xl px-5 py-1 rounded-md">
              1
            </span>

            <p className="text-2xl text-pretty font-medium">
              Enter your zip Code.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-green-500 px-5 py-2 text-white rounded-md flex-1">
            <span className="bg-blue-700  text-3xl px-5 py-1 rounded-md">
              2
            </span>

            <p className="text-2xl text-pretty font-medium">
              Select your type and quantity
            </p>
          </div>

          <div className="flex items-center gap-3 bg-green-500 px-5 py-2 text-white rounded-md flex-1">
            <span className="bg-blue-700  text-3xl px-5 py-1 rounded-md">
              3
            </span>

            <p className="text-2xl text-pretty font-medium">Get verified</p>
          </div>
        </div>
      </div>
    </main>
  );
}
