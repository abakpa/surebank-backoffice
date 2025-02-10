const Tablebody = ({ branches }) => {
    return (
        <tbody className="text-sm">
        {branches.map((branch, index) => (
          <tr key={index} className="border-b">
            <td className="border border-gray-300 p-2">{branch.name}</td>
            <td className="border border-gray-300 p-2">{branch.address}</td>
            {/* <td className="border border-gray-300 p-2">
              <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                Edit
              </button>
              <button className="bg-red-500 text-white px-2 py-1 lg:ml-2 mt-2 rounded hover:bg-red-600">
                Delete
              </button>
            </td> */}
          </tr>
        ))}
      </tbody>
    );
  };
  
  export default Tablebody;
  