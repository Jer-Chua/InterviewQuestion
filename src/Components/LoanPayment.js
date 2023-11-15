import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/solid';
import PartialPayment from './PartialPayment';

export default function LoanPayment(props) {

  const [partialPaymentTrigger, setPartialPaymentTrigger] = useState(false);
  const [partialPaymentAmount, setPartialPaymentAmount] = useState(0);

  const proceedFullPayment = () => {
    let currentLoan = { ...props.viewLoanIndex };
    let currentData = [...props.data]
    let allCurrentData = [...props.allDataPaid]
    for (let i = 0; i < currentData.length; i++) {
      if (currentData[i].loanId == currentLoan.loanId) {

        currentData.splice(i, 1);
        allCurrentData.push(currentLoan);
        props.setAllDataPaid(allCurrentData);
        props.setData(currentData);
        setPartialPaymentAmount(0);
        var jsonData = JSON.stringify(currentData);
        sessionStorage.setItem('data', jsonData)
        var jsonData = JSON.stringify(allCurrentData);
        sessionStorage.setItem('allData', jsonData)
        props.setTrigger(false);
        break;
      }
    }
  }

  const proceedPartialPayment = () => {
    let currentLoan = { ...props.viewLoanIndex };
    currentLoan.Amount = currentLoan.Amount - partialPaymentAmount;
    let currentData = [...props.data]
    let allCurrentData = [...props.allDataPaid]
    for (let i = 0; i < currentData.length; i++) {
      if (currentData[i].loanId == currentLoan.loanId) {
        if (currentLoan.Amount == 0) {
          currentData.splice(i, 1);
          allCurrentData.push(currentLoan);
          console.log(currentData);
        }
        else {
          currentData[i] = currentLoan;
        }
        props.setData(currentData);
        props.setAllDataPaid(allCurrentData);
        setPartialPaymentAmount(0);
        var jsonData = JSON.stringify(currentData);
        sessionStorage.setItem('data', jsonData)
        var jsonData = JSON.stringify(allCurrentData);
        sessionStorage.setItem('allData', jsonData)
        props.setTrigger(false);
        break;
      }
    }
  }

  useEffect(() => {
    if (partialPaymentAmount > 0) {
      proceedPartialPayment()
    }
    console.log(partialPaymentAmount)
  }, [partialPaymentAmount])

  if (props.trigger) {

    return (
      <>

        <Fragment>
          {props.trigger && (

            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
              <PartialPayment trigger={partialPaymentTrigger} setTrigger={setPartialPaymentTrigger} setPartialPaymentAmount={setPartialPaymentAmount}></PartialPayment>
              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">

                        <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                          <h3 className="text-base font-semibold leading-6 text-gray-900">
                            {props.viewLoanIndex.loanId}
                          </h3>
                          <div className="mt-2">
                            <form>
                              <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">

                                  <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                      <div className="sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                          First name
                                        </label>
                                        <div className="mt-2">
                                          <p>{props.viewLoanIndex.FirstName}</p>
                                        </div>
                                      </div>

                                      <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                          Last name
                                        </label>
                                        <div className="mt-2">
                                          <p>{props.viewLoanIndex.LastName}</p>
                                        </div>
                                      </div>

                                      <div className="sm:col-span-6">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                          Email address
                                        </label>
                                        <div className="mt-2">
                                          <p>{props.viewLoanIndex.Email}</p>
                                        </div>
                                      </div>

                                    </div>
                                  </div>
                                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
                                    <div className="sm:col-span-2">
                                      <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                                        Amount
                                      </label>
                                      <div className="mt-2">
                                        <p>{props.viewLoanIndex.Amount.toLocaleString()}</p>
                                      </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                      <label htmlFor="currency" className="block text-sm font-medium leading-6 text-gray-900">
                                        Currency
                                      </label>




                                      <div className="mt-2">
                                        <p>{props.viewLoanIndex.Currency}</p>

                                      </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                      <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900">
                                        Start Date
                                      </label>
                                      <div className="mt-2">
                                        <p>{props.viewLoanIndex.StartDate}</p>
                                      </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                      <label htmlFor="endDate" className="block text-sm font-medium leading-6 text-gray-900">
                                        End Date
                                      </label>
                                      <div className="mt-2">
                                        <p>{props.viewLoanIndex.EndDate}</p>
                                      </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                      <label htmlFor="interestRate" className="block text-sm font-medium leading-6 text-gray-900">
                                        Loan Type
                                      </label>
                                      <p>{props.viewLoanIndex.LoanType}</p>
                                    </div>
                                    <div className="sm:col-span-3">
                                      <label htmlFor="interestRate" className="block text-sm font-medium leading-6 text-gray-900">
                                        Interest Rate
                                      </label>
                                      <div className="mt-2">
                                        <p>{props.viewLoanIndex.InterestRate}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={() => proceedFullPayment()}
                        style={{backgroundColor:"#059669"}}
                      >
                        Full Payment
                      </button>
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={() => setPartialPaymentTrigger(true)}
                        style={{backgroundColor:"white", color:"black", border:"1px solid #94a3b8"}}
                      >
                        Partial Payment
                      </button>
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={() => props.setTrigger(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Fragment>

      </>
    )
  }
}
