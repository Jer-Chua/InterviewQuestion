import React, {useContext, useRef, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function Parent() {
  const [data, setData] = useState([
    {
      "FirstName": "John",
      "LastName": "Doe",
      "Email": "JohnDoe@gmail.com",
      "loanId": "LoanABC",
      "StartDate": "09/11/2023",
      "EndDate": "11/12/2023",
      "Amount": 1000000,
      "Currency": "SGD",
      "InterestRate": "0.25%",
      "LoanType": "Car"
    }
  ])

  const [allDataPaid, setAllDataPaid] = useState([
    {
      "FirstName": "John",
      "LastName": "Doe",
      "Email": "JohnDoe@gmail.com",
      "loanId": "LoanABC",
      "StartDate": "09/11/2023",
      "EndDate": "11/12/2023",
      "Amount": 1000000,
      "Currency": "SGD",
      "InterestRate": "0.25%",
      "LoanType": "Car",
      "Paid on": "02/11/2023"
    }
  ])

  const [userRole, setUserRole] = useState('user');

  return <App data={data} setData={setData} setUserRole={setUserRole} userRole={userRole} allDataPaid={allDataPaid} setAllDataPaid={setAllDataPaid}/>; 
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Parent />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
