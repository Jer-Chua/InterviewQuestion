import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoanList from './Components/LoanList';
import LoanForm from './Components/LoanForm';
import LoanPayment from './Components/LoanPayment';
import NavBar from './Components/NavBar';
import Finances from './Components/Finances'

const Data = () => {
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

  useEffect(() => {
    console.log(data);
  }, [data])

  return (

  );
};

export default Data;
