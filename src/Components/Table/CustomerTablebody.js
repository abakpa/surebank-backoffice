const Tablebody = ({ customers }) => {
    return (
      <tbody className="text-sm">
        {customers.map((customer, index) => (
          <tr key={index} className="text-center">
            <td className="border border-gray-300 p-2">{customer.name}</td>
            <td className="border border-gray-300 p-2">{customer.address}</td>
            <td className="border border-gray-300 p-2">{customer.phone}</td>
            <td className="border border-gray-300 p-2">{customer.email}</td>
            <td className="border border-gray-300 p-2">{customer.branch}</td>
          </tr>
        ))}
      </tbody>
    );
  };
  
  export default Tablebody;
  