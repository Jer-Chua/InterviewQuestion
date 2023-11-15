import React, { useEffect, useState } from 'react';
import LoanPayment from './LoanPayment';

const LoanList = (props) => {
  const [viewLoanIndex, setViewLoanIndex] = useState(null);
  const [openLoan, setOpenLoan] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [alldataPaidAmount, setAllDataPaidAmount] = useState(0);
  const [switchRole, setSwitchRole] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [srcSet, setSrcSet] = useState("https://flagcdn.com/80x60/sg.png 2x");
  const [srcFlag, setSrcFlag] = useState("https://flagcdn.com/40x30/sg.png");

  const handleFlagClick = () => {
    setShowDropdown(!showDropdown);
  };

  const calculateConverRate = (newSrcSet, newSrcFlag) => {
    let totalAmountNew = 0;
    if (newSrcSet == srcSet) {
      setShowDropdown(false);
      return;
    }
    if (newSrcSet == "https://flagcdn.com/80x60/sg.png 2x") {
      let value = 0;
      for (let i = 0; i < props.data.length; i++) {
        if (props.data[i].Currency == "USD") {
          totalAmountNew = totalAmountNew + (props.data[i].Amount * 1.361).toFixed(2)
        }
        else {
          totalAmountNew = totalAmountNew + props.data[i].Amount;
        }
        

      }
      // totalAmountNew = (totalAmount * 1.361).toFixed(2);
    }
    else {
      totalAmountNew = (totalAmount * 0.73508).toFixed(2);
    }
    setSrcFlag(newSrcFlag);
    setSrcSet(newSrcSet);
    setTotalAmount(totalAmountNew)
    setShowDropdown(false);

  }

  useEffect(() => {
    let value = 0;
    for (let i = 0; i < props.data.length; i++) {
      if (props.data[i].Currency == "USD") {
        value = value + (props.data[i].Amount * 1.361).toFixed(2)
      }
      else {
        value = value + props.data[i].Amount;
      }

    }
    setTotalAmount(value);
  }, [props.data])

  useEffect(() => {
    let value = 0;
    for (let i = 0; i < props.allDataPaid.length; i++) {
      if (props.allDataPaid[i].Currency == "USD") {
        value = value + (props.allDataPaid[i].Amount * 1.361).toFixed(2)
      }
      else {
        value = value + props.allDataPaid[i].Amount;
      }

    }

    setAllDataPaidAmount(value);
  }, [props.allDataPaid])

  useEffect(() => {
    console.log(props.userRole)
    if (props.userRole == 'user') {
      setSwitchRole(false);
    }
    else {
      setSwitchRole(true);
    }
  }, [props.userRole])

  return (

    <>


      {switchRole == false ? <>
        <LoanPayment trigger={openLoan} setTrigger={setOpenLoan} viewLoanIndex={viewLoanIndex} data={props.data} setData={props.setData} allDataPaid={props.allDataPaid} setAllDataPaid={props.setAllDataPaid}></LoanPayment>
        <div className="border rounded-lg border-gray-300 p-4 m-4">
          <div className="flex justify-between m-4">
            <div className="flex items-center">
              <div>
                <h2 className="text-2xl font-medium text-gray-900">Current Loan</h2>

                <p className="text-gray-500">All Active Loans</p>
              </div>
            </div>

            <article className="rounded-lg border border-gray-100 bg-white p-4">
              <div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-500">Current Loan</p>
                  <div className="relative inline-block">
                    <img
                      className="ml-2 cursor-pointer"
                      src={srcFlag}
                      srcSet={srcSet}
                      width="20"
                      height="11"
                      alt="flag"
                      onClick={handleFlagClick}
                    />
                    {showDropdown && (
                      <div className="absolute mt-2 w-auto bg-white border border-gray-300 shadow-lg rounded-md" style={{ width: "130%" }}>
                        {/* Dropdown content goes here */}
                        <p className="p-2" onClick={() => { calculateConverRate("https://flagcdn.com/w40/us.png 2x", "https://flagcdn.com/w20/us.png") }}><img
                          src="https://flagcdn.com/w20/us.png"
                          srcSet="https://flagcdn.com/w40/us.png 2x"
                          width="64"
                          height="48"
                          alt="United States"
                        /></p>
                        <p className="p-2" onClick={() => { calculateConverRate("https://flagcdn.com/80x60/sg.png 2x", 'https://flagcdn.com/40x30/sg.png') }}><img
                          src="https://flagcdn.com/40x30/sg.png"
                          srcset="https://flagcdn.com/80x60/sg.png 2x,
    https://flagcdn.com/120x90/sg.png 3x"
                          width="64"
                          height="48"
                          alt="Singapore" /></p>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-2xl font-medium text-gray-900">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalAmount)}</p>
              </div>
              <div className="mt-1 flex gap-1 text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
                <p className="flex gap-2 text-xs">
                  <span className="font-medium">67.81%</span>
                  <span className="text-gray-500">Since last week</span>
                </p>
              </div>
            </article>
          </div>


          <div className="overflow-x-auto mt-4">


            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">

                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Loan ID
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Start Date
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    End Date
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Amount
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Interest Rate
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Loan Type
                  </th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {props.data.length != 0 ?
                  props.data.map((indivData, index) => (
                    <tr>
                      <td className="whitespace-nowrap px-4 py-2 flex justify-center items-center font-medium text-gray-900">
                        {indivData.loanId}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{indivData.StartDate}</td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{indivData.EndDate}</td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(indivData.Amount)} [{indivData.Currency}]</td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">0.25%</td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{indivData.LoanType}</td>
                      <td className="whitespace-nowrap px-4 py-2 flex justify-center items-center">
                        <button
                          className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                          onClick={() => { setViewLoanIndex(indivData); setOpenLoan(true) }}
                        >
                          View
                        </button>
                      </td>

                    </tr>
                  )) :
                  <p class="text-center w-full">
                    No Loan
                  </p>
                }



              </tbody>
            </table>
          </div>
        </div>
      </> :
        <>
          {/* <LoanPayment trigger={openLoan} setTrigger={setOpenLoan} viewLoanIndex={viewLoanIndex} data={props.data} setData={props.setData}></LoanPayment> */}
          <div className="border rounded-lg border-gray-300 p-4 m-4">
            <div className="flex justify-between m-4">
              <div className="flex items-center">
                <div>
                  <h2 className="text-2xl font-medium text-gray-900">All Current Loan</h2>
                  <p className="text-gray-500">All Active Loans</p>
                </div>
              </div>

              <article className="rounded-lg border border-gray-100 bg-white p-4">
                <div>
                  <p className="text-sm text-gray-500">Current Loan</p>
                  <p className="text-2xl font-medium text-gray-900">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalAmount)}</p>
                </div>
                <div className="mt-1 flex gap-1 text-red-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                    />
                  </svg>
                  <p className="flex gap-2 text-xs">
                    <span className="font-medium">67.81%</span>
                    <span className="text-gray-500">Since last week</span>
                  </p>
                </div>
              </article>
            </div>


            <div className="overflow-x-auto mt-4">


              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">

                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Loan ID
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Start Date
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      End Date
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Amount
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Interest Rate
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Loan Type
                    </th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {props.data.length != 0 ?
                    props.data.map((indivData, index) => (
                      <tr>
                        <td className="whitespace-nowrap px-4 py-2 flex justify-center items-center font-medium text-gray-900">
                          {indivData.loanId}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{indivData.StartDate}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{indivData.EndDate}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(indivData.Amount)} [{indivData.Currency}]</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">0.25%</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{indivData.LoanType}</td>
                        <td className="whitespace-nowrap px-4 py-2 flex justify-center items-center">
                          <button
                            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                            
                          >
                            Send Alert
                          </button>
                        </td>

                      </tr>
                    )) :
                    <p class="text-center w-full">
                      No Loan
                    </p>
                  }



                </tbody>
              </table>
            </div>
          </div>
          <div className="border rounded-lg border-gray-300 p-4 m-4">
            <div className="flex justify-between m-4">
              <div className="flex items-center">
                <div>
                  <h2 className="text-2xl font-medium text-gray-900">All Paid Loan</h2>
                  <p className="text-gray-500">All Paid Loans</p>
                </div>
              </div>

              <article className="rounded-lg border border-gray-100 bg-white p-4">
                <div>
                  <p className="text-sm text-gray-500">Paid Loan</p>
                  <p className="text-2xl font-medium text-gray-900">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(alldataPaidAmount)}</p>
                </div>
                <div className="mt-1 flex gap-1 text-red-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                    />
                  </svg>
                  <p className="flex gap-2 text-xs">
                    <span className="font-medium">67.81%</span>
                    <span className="text-gray-500">Since last week</span>
                  </p>
                </div>
              </article>
            </div>


            <div className="overflow-x-auto mt-4">


              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">

                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Loan ID
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Start Date
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      End Date
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Amount
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Interest Rate
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Loan Type
                    </th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {props.allDataPaid.length != 0 ?
                    props.allDataPaid.map((indivData, index) => (
                      <tr>
                        <td className="whitespace-nowrap px-4 py-2 flex justify-center items-center font-medium text-gray-900">
                          {indivData.loanId}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{indivData.StartDate}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{indivData.EndDate}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(indivData.Amount)} [{indivData.Currency}]</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">0.25%</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{indivData.LoanType}</td>
                        <td className="whitespace-nowrap px-4 py-2 flex justify-center items-center">

                        </td>

                      </tr>
                    )) :
                    <p class="text-center w-full">
                      No Loan
                    </p>
                  }



                </tbody>
              </table>
            </div>
          </div>
        </>}


    </>
  );
};

export default LoanList;
