import React, { useEffect, useState } from 'react';

const Finances = (props) => {
    const [carAmount, setCarAmount] = useState(0);
    const [goldAmount, setGoldAmount] = useState(0);
    const [personalAmount, setPersonalAmount] = useState(0);
    const [homeAmount, setHomeAmount] = useState(0);

    useEffect(() =>{
        let carAmount = 0;
        let goldAmount = 0;
        let personalAmount = 0;
        let homeAmount = 0;

        for(let i = 0; i<props.data.length;i++){
            console.log(props.data[i].LoanType)
            if(props.data[i].LoanType == "Car"){
                console.log(props.data[i].Amount)
                carAmount = carAmount + props.data[i].Amount
            }
            else if(props.data[i].LoanType == "Gold"){
                goldAmount = goldAmount + props.data[i].Amount
            }
            else if(props.data[i].LoanType == "Personal"){
                personalAmount = personalAmount + props.data[i].Amount
            }
            else{
                homeAmount = homeAmount + props.data[i].Amount
            }
        }

        setCarAmount(carAmount);
        setGoldAmount(goldAmount);
        setPersonalAmount(personalAmount);
        setHomeAmount(homeAmount);
        console.log(props.data);
    },[props.data])
    return (

        <>
            <div className="border rounded-lg border-gray-300 p-4 m-4">
                <div className="flex justify-between m-4">
                    <div className="flex items-center">
                        <div>
                            <h2 className="text-2xl font-medium text-gray-900">Categories</h2>
                        </div>
                    </div>


                </div>


                <div className="overflow-x-auto mt-4">


                    <article
                        className="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6"
                    >
                        <div className="flex items-center gap-4">
                            <span className="hidden rounded-full bg-gray-100 p-2 text-gray-600 sm:block">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </span>

                            <div>
                                <p className="text-sm text-gray-500">Car</p>

                                <p className="text-2xl font-medium text-gray-900">${carAmount.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="inline-flex gap-2 rounded bg-green-100 p-1 text-green-600">
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
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>

                            <span className="text-xs font-medium"> 67.81% </span>
                        </div>
                    </article>

                    <article
                        className="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6"
                    >
                        <div className="flex items-center gap-4">
                            <span className="hidden rounded-full bg-gray-100 p-2 text-gray-600 sm:block">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>

                            </span>

                            <div>
                                <p className="text-sm text-gray-500">Gold</p>

                                <p className="text-2xl font-medium text-gray-900">${goldAmount.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="inline-flex gap-2 rounded bg-red-100 p-1 text-red-600">
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

                            <span className="text-xs font-medium"> 67.81% </span>
                        </div>
                    </article>
                    <article
                        className="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6"
                    >
                        <div className="flex items-center gap-4">
                            <span className="hidden rounded-full bg-gray-100 p-2 text-gray-600 sm:block">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>

                            </span>

                            <div>
                                <p className="text-sm text-gray-500">Personal</p>

                                <p className="text-2xl font-medium text-gray-900">${personalAmount.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="inline-flex gap-2 rounded bg-green-100 p-1 text-green-600">
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
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>

                            <span className="text-xs font-medium"> 67.81% </span>
                        </div>
                    </article>

                    <article
                        className="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6"
                    >
                        <div className="flex items-center gap-4">
                            <span className="hidden rounded-full bg-gray-100 p-2 text-gray-600 sm:block">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>

                            </span>

                            <div>
                                <p className="text-sm text-gray-500">Home</p>

                                <p className="text-2xl font-medium text-gray-900">${homeAmount.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="inline-flex gap-2 rounded bg-red-100 p-1 text-red-600">
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


                            <span className="text-xs font-medium"> 67.81% </span>
                        </div>
                    </article>
                </div>
            </div>

            <div className="border rounded-lg border-gray-300 p-4 m-4">
                <div className="flex justify-between m-4">
                    <div className="flex items-center">
                        <div>
                            <h2 className="text-2xl font-medium text-gray-900">Transfers</h2>
                        </div>
                    </div>


                </div>


                <div className="overflow-x-auto mt-4">
                    <article
                        className="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />


                            <div>
                                <p className="text-sm text-gray-500">Payment for Koi Drink</p>

                                <p className="text-2xl font-medium text-gray-900">$210.94</p>
                            </div>
                        </div>


                    </article>
                    <article
                        className="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />


                            <div>
                                <p className="text-sm text-gray-500">Payment for Cab</p>

                                <p className="text-2xl font-medium text-gray-900">$15.50</p>
                            </div>
                        </div>


                    </article>
                    <article
                        className="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                                alt=""
                            />


                            <div>
                                <p className="text-sm text-gray-500">Payment for Dinner</p>

                                <p className="text-2xl font-medium text-gray-900">$10.94</p>
                            </div>
                        </div>


                    </article>


                </div>
            </div>


        </>
    );
};

export default Finances;
