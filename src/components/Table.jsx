import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  getFormData,
  saveFormData,
} from "../services/api";
import toast from "react-hot-toast";
import { getErrorMessage } from "../functions";

const Table = ({ setLoggedInUser, loggedInUser }) => {
  console.log(loggedInUser)
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    accountName: "",
    sentInvitation: 0,
    connections: 0,
    noOfBotFileNames: 0,
    id: loggedInUser.id
  });


  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Replace 'API_ENDPOINT' with your actual API endpoint
      const response = await getFormData(loggedInUser);
      setData(response);
    } catch (error) {
      const err = getErrorMessage(error);
      if (err?.includes("Unauthorized")) {
        setLoggedInUser(null);
      }
      toast.error(err);
    }
  };



  const handleSave = async () => {
    try {
      if (!formData.accountName) {
        return toast.error("Account name is required");
      }
      if (
        formData.connections < 0 ||
        formData.noOfBotFileNames < 0 ||
        formData.sentInvitation < 0
      ) {
        return toast.error(`Values cann't be negative`);
      }

      const res = await saveFormData(formData);
      toast.success(res.message);
  
      // Refetch data after save
      await fetchData();

      // Reset form and editing state
      setFormData({
        accountName: "",
        sentInvitation: 0,
        connections: 0,
        noOfBotFileNames: 0,
        id:loggedInUser.id
      });
     
    } catch (error) {
      const err = getErrorMessage(error);
      if (err?.includes("Unauthorized")) {
        setLoggedInUser(null);
      }
      toast.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Data Table</h2>
      <table className="min-w-full border-collapse border border-green-800">
        <thead>
          <tr className="bg-green-500 text-white">
            <th className="border border-green-600 p-2">Account Name</th>
            <th className="border border-green-600 p-2">Sent Invitations</th>
            <th className="border border-green-600 p-2">Connections</th>
            <th className="border border-green-600 p-2">
              No. of Bot File Names
            </th>
            <th className="border border-green-600 p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td className="border border-green-600 p-2">
                {item.accountName}
              </td>
              <td className="border border-green-600 p-2">
                { item.sentInvitation[item.sentInvitation.length-1] === -1 ? "Absent" : item.sentInvitation[item.sentInvitation.length-1]}
              </td>
              <td className="border border-green-600 p-2">
                {item.connections[item.sentInvitation.length-1] === -1 ? "Absent" : item.connections[item.sentInvitation.length-1]}
              </td>
              <td className="border border-green-600 p-2">
                {item.noOfBotFileNames[item.sentInvitation.length-1] === -1
                  ? "Absent"
                  : item.noOfBotFileNames[item.sentInvitation.length-1]}
              </td>
              <td className="border border-green-600 p-2 space-x-2">
              {format(new Date(item.Dates[item.sentInvitation.length-1]), 'MMM d yyyy')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 p-4 border border-green-800 rounded">
        <h2 className="text-xl font-bold mb-2">Add/Edit Entry</h2>
        <form>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-600">
              Account Name:
              <input
                type="text"
                value={formData.accountName}
                onChange={(e) =>
                  setFormData({ ...formData, accountName: e.target.value })
                }
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-600">
              Sent Invitations:
              <input
                type="number"
                value={formData.sentInvitation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sentInvitation: parseInt(e.target.value, 10),
                  })
                }
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-600">
              Connections:
              <input
                type="number"
                value={formData.connections}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    connections: parseInt(e.target.value, 10),
                  })
                }
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              No. of Bot File Names:
              <input
                type="number"
                value={formData.noOfBotFileNames}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    noOfBotFileNames: parseInt(e.target.value, 10),
                  })
                }
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Table;
