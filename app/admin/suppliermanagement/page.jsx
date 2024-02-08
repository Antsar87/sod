import NewSupplier from './(components)/NewSupplier';
import TableComponent from './(components)/TableComponent';

const fetchingData = async () => {
  const fetchData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/suppliers`, {
    cache: 'no-store',
  });
  const dataJson = fetchData.json();

  return dataJson;
};

const SupplierManagent = async () => {
  const data = await fetchingData();

  console.log(data);

  return (
    <div className="container max-w-4xl pt-10">

      <NewSupplier />
      
      {/* <Table data={data} columns={columns} /> */}
      <TableComponent data={data}/>
    </div>
  );
};

export default SupplierManagent;
