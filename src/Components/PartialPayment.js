import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function PartialPayemnt(props) {

    const cancelButtonRef = useRef(null)
    const [amount, setAmount] = useState(0);
    const closeModal = () => {
        props.setTrigger(false);
        // Add any additional logic you want to perform when the modal is closed
    };

    useEffect(() => {
        console.log(props.trigger)
    }, [props])

    return (
        <Fragment>
            {props.trigger && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" style={{ zIndex: 20 }}>
                    <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white-100 sm:mx-0 sm:h-10 sm:w-10">
                                            {/* <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                            </svg>

                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <h3 className="text-base font-semibold leading-6 text-gray-900">
                                                Partial Payment
                                            </h3>
                                            <div className="mt-2">
                                                <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Amount
                                                </label>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Amount will be paid via the same currency
                                                    </p>
                                                    <input
                                                        type="number"
                                                        name="amount"
                                                        id="amount"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                                                        value={amount}
                                                        onChange={(e) => setAmount(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={() => { props.setPartialPaymentAmount(amount); closeModal() }}
                                        style={{ backgroundColor: "white", color: "black", border: "1px solid #94a3b8" }}
                                    >
                                        Pay
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={closeModal}
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

    )
}
