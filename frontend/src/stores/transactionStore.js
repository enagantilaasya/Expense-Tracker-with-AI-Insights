import axios from "axios";

const API =
"http://localhost:1971/transaction";


// ADD
export const addTransaction =
async (transactionObj) => {

  try {

    const res =
      await axios.post(

        `${API}/input`,

        transactionObj,

        {
          withCredentials: true,
        }

      );

    return res.data;

  }

  catch (err) {

    console.log(
      "Add Transaction Error",
      err.response?.data ||
      err.message
    );

  }

};


// GET
export const fetchTransactions =
async () => {

  try {

    const res =
      await axios.get(

        `${API}/all-transactions`,

        {
          withCredentials: true,
        }

      );

    return res.data.payload || [];

  }

  catch (err) {

    console.log(
      "Fetch Transaction Error",
      err
    );

    return [];

  }

};


// DELETE
export const deleteTransaction =
async (id) => {

  try {

    const res =
      await axios.delete(

        `${API}/delete/${id}`,

        {
          withCredentials: true,
        }

      );

    return res.data;

  }

  catch (err) {

    console.log(
      "Delete Transaction Error",
      err
    );

  }

};