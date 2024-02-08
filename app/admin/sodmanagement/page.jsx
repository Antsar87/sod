import NewSod from './(components)/NewSod';
import TableComponent from './(components)/TableComponent';

const fetchingData = async () => {
  const fetchData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sods`, {
    cache: 'no-store',
  });
  const dataJson = fetchData.json();

  return dataJson;
};



const SodManagement = async () => {
  const data = await fetchingData();

  console.log(data);

  return (
    <div className="container max-w-4xl pt-10">

      <NewSod />
      
      <TableComponent data={data}/>
    </div>
  );
};

export default SodManagement;
