import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, removeUserSession, getToken } from '../utils/common';
import axios from 'axios';

const Dashboard = props => {
  const history = useNavigate();
  const user = getUser();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransaction] = useState([]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.post('https://jp-dev.cityremit.global/web-api/transaction-manager/v1/admin/dashboard/search', {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }).then(response => {
        setTransaction(response.data["data"])
      }).catch(error => {
        setLoading(false);
        if (error.response?.status === 403) setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  }, []);

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    history('/login');
  }

  return (
    <div>
      Welcome {user}!<br /><br />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button" onClick={handleLogout} value="Logout">
        Logout
      </button>
      <br />
      <br />
      <div>
        {
          transactions.length > 0 ?
            <>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {
                  transactions.length > 0 ?
                    <>
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Current Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Receive Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Receive Country
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Receiver Full Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Send Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Send Country
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Sender Full Name
                            </th>
                          </tr>
                        </thead>
                        <tbody>

                          {
                            transactions.map((data, index) => {
                              return (
                                <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data["Current Status"]}
                                  </th>
                                  <td className="px-6 py-4">
                                    {data["Receive Amount/受取金額"]}
                                  </td>
                                  <td className="px-6 py-4">
                                    {data["Receive Country/受取国"]}
                                  </td>
                                  <td className="px-6 py-4">
                                    {data["Receiver Full Name"]}
                                  </td>
                                  <td className="px-6 py-4">
                                    {data["Send Amount/送金額"]}
                                  </td>
                                  <td className="px-6 py-4">
                                    {data["Send Country/送金国"]}
                                  </td>
                                  <td className="px-6 py-4">
                                    {data["Sender Full Name"]}
                                  </td>
                                </tr>
                              )
                            })
                          }

                        </tbody>
                      </table>
                    </> :
                    <></>
                }

              </div>

            </>

            : <></>
        }
      </div>
    </div >

  );
}

export default Dashboard;