import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function LoanForm(props) {

    const cancelButtonRef = useRef(null)

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loanType, setLoanType] = useState('Car');
    const [showAlert, setShowAlert] = useState(false);
    const [amountInterest, setAmountInterest] = useState(0);


    const handleSubmit = () => {

        let today = new Date();
        let startDateFormat = new Date(startDate.split('/')[2] + "-" + startDate.split('/')[1] + "-" + startDate.split('/')[0])
        let endDateFormat = new Date(endDate.split('/')[2] + "-" + endDate.split('/')[1] + "-" + endDate.split('/')[0])
        if (firstName == '') {
            setShowAlert(true);
            let firstNameDOM = document.getElementById('first-name');
            console.log(firstNameDOM);
            firstNameDOM.className = 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2 border-red-500';

            return;
        }
        if (lastName == '') {
            setShowAlert(true);

            return;
        }
        if (email == '') {
            setShowAlert(true);

            return;
        }
        if (amount == '') {
            setShowAlert(true);

            return;
        }
        if (startDate == '' || startDateFormat.getTime() === today.getTime() || startDateFormat.getTime() < today.getTime()) {
            console.log('time')
            setShowAlert(true);

            return;
        }
        if (endDate == '' || endDateFormat.getTime() === today.getTime() || endDateFormat.getTime() < today.getTime()) {
            console.log('time end')
            setShowAlert(true);
            return;
        }

        let currentData = [...props.data];

        let splitedStartDate = startDate.split('-');
        let splitedEndDate = endDate.split('-');
        const newLoan = {
            "FirstName": firstName,
            "LastName": lastName,
            "Email": email,
            "loanId": `Loan_${splitedStartDate[2]}/${splitedStartDate[1]}/${splitedStartDate[0]}`,
            "StartDate": `${splitedStartDate[2]}/${splitedStartDate[1]}/${splitedStartDate[0]}`,
            "EndDate": `${splitedEndDate[2]}/${splitedEndDate[1]}/${splitedEndDate[0]}`,
            "Amount": amountInterest,
            "Currency": currency,
            "InterestRate": "0.25%",
            "LoanType": loanType
        }

        currentData.push(newLoan);
        var jsonData = JSON.stringify(currentData);

        sessionStorage.setItem('data', jsonData);
        props.setData(currentData);

        setAmount('');
        setCurrency('SGD');
        setStartDate('');
        setEndDate('');
        setLoanType('Car');
        props.setTrigger(false);
    };

    useEffect(() => {
        // Set a timeout to hide the alert after 5 seconds
        const timeoutId = setTimeout(() => {
            setShowAlert(false);
        }, 5000);

        // Clear the timeout when the component unmounts
        return () => clearTimeout(timeoutId);
    }, [showAlert]); // Empty dependency array ensures that this effect runs only once when the component mounts

    const callInterestCalculate = () => {
        let startDateFormat = new Date(startDate.split('/')[2] + "-" + startDate.split('/')[1] + "-" + startDate.split('/')[0])
        let endDateFormat = new Date(endDate.split('/')[2] + "-" + endDate.split('/')[1] + "-" + endDate.split('/')[0]);
        // Calculate the number of days between start and end dates
        let daysDiff = Math.ceil((endDateFormat - startDateFormat) / (1000 * 60 * 60 * 24));

        // Calculate the interest for the given period
        console.log(Math.ceil(daysDiff/30), amount);
        // Calculate the total amount to be paid
        let totalAmount = parseFloat((parseFloat(amount) + (parseFloat(amount) * 0.0025 * Math.ceil(daysDiff/30)))).toFixed(2)

        setAmountInterest(totalAmount)
    }

    useEffect(() => {
        if (startDate != "" && endDate != "" && amount != "") {
            callInterestCalculate();
        }
    }, [startDate, endDate, amount])




    if (props.trigger) {

        return (

            <Transition.Root show={props.trigger} as={Fragment}>

                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={props.setTrigger}>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">

                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">


                                            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                                {showAlert ?
                                                    <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
                                                        <strong className="block font-medium text-red-800"> Something went wrong </strong>

                                                        <p className="mt-2 text-sm text-red-700">
                                                            Ensure that all information are fill
                                                        </p>
                                                    </div> : null}
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    New Loan
                                                </Dialog.Title>
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
                                                                                <input
                                                                                    type="text"
                                                                                    name="first-name"
                                                                                    id="first-name"
                                                                                    autoComplete="given-name"
                                                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                                                                                    onChange={(e) => setFirstName(e.target.value)}
                                                                                    style={{border:"1px solid #d1d5db"}}
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        <div className="sm:col-span-3">
                                                                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                                                Last name
                                                                            </label>
                                                                            <div className="mt-2">
                                                                                <input
                                                                                    type="text"
                                                                                    name="last-name"
                                                                                    id="last-name"
                                                                                    autoComplete="family-name"
                                                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                                                                                    onChange={(e) => setLastName(e.target.value)}
                                                                                    style={{border:"1px solid #d1d5db"}}
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        <div className="sm:col-span-6">
                                                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                                                Email address
                                                                            </label>
                                                                            <div className="mt-2">
                                                                                <input
                                                                                    id="email"
                                                                                    name="email"
                                                                                    type="email"
                                                                                    autoComplete="email"
                                                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                                    style={{border:"1px solid #d1d5db"}}
                                                                                />
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
                                                                            <input
                                                                                type="number"
                                                                                name="amount"
                                                                                id="amount"
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                                                                                value={amount}
                                                                                onChange={(e) => setAmount(e.target.value)}
                                                                                style={{border:"1px solid #d1d5db"}}

                                                                            />
                                                                            <p className='text-sm text-gray-500'>Amount with interest: {amountInterest}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="sm:col-span-1">
                                                                        <label htmlFor="currency" className="block text-sm font-medium leading-6 text-gray-900">
                                                                            Currency
                                                                        </label>




                                                                        <div className="mt-2">
                                                                            {/* <input
                                                                                type="text"
                                                                                name="currency"
                                                                                id="currency"
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                value={currency}
                                                                                onChange={(e) => setCurrency(e.target.value)}
                                                                            />   */}
                                                                            <select
                                                                                id="currency"
                                                                                name="currency"
                                                                                autoComplete="country-name"
                                                                                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                                                                                onChange={(e) => setCurrency(e.target.value)}
                                                                                style={{border:"1px solid #d1d5db", backgroundColor:"transparent"}}

                                                                            >
                                                                                <option value={"USD"}>USD</option>
                                                                                <option value={"SGD"}>SGD</option>
                                                                            </select>

                                                                        </div>
                                                                    </div>
                                                                    <div className="sm:col-span-3">
                                                                        <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900">
                                                                            Start Date
                                                                        </label>
                                                                        <div className="mt-2">
                                                                            <input
                                                                                type="date"
                                                                                name="startDate"
                                                                                id="startDate"
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                                                                                value={startDate}
                                                                                onChange={(e) => setStartDate(e.target.value)}
                                                                                style={{border:"1px solid #d1d5db", backgroundColor:"transparent", width:"100%"}}

                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="sm:col-span-3">
                                                                        <label htmlFor="endDate" className="block text-sm font-medium leading-6 text-gray-900">
                                                                            End Date
                                                                        </label>
                                                                        <div className="mt-2">
                                                                            <input
                                                                                type="date"
                                                                                name="endDate"
                                                                                id="endDate"
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                                                                                value={endDate}
                                                                                onChange={(e) => setEndDate(e.target.value)}
                                                                                style={{border:"1px solid #d1d5db", backgroundColor:"transparent", width:"100%"}}

                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="sm:col-span-3">
                                                                        <label htmlFor="interestRate" className="block text-sm font-medium leading-6 text-gray-900">
                                                                            Loan Type
                                                                        </label>
                                                                        <select
                                                                            id="currency"
                                                                            name="currency"
                                                                            autoComplete="country-name"
                                                                            className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                                                                            onChange={(e) => setLoanType(e.target.value)}
                                                                            style={{border:"1px solid #d1d5db", backgroundColor:"transparent"}}

                                                                        >
                                                                            <option value={"Car"}>Car</option>
                                                                            <option value={"Gold"}>Gold</option>
                                                                            <option value={"Personal"}>Personal</option>
                                                                            <option value={"Home"}>Home</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="sm:col-span-3">
                                                                        <label htmlFor="interestRate" className="block text-sm font-medium leading-6 text-gray-900">
                                                                            Interest Rate
                                                                        </label>
                                                                        <div className="mt-2">
                                                                            <p>0.25%</p>
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
                                            style={{ backgroundColor: "#059669" }}
                                            onClick={() => handleSubmit()}
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={() => props.setTrigger(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        )

    }
}
