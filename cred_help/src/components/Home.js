import React from 'react'
import banking from '../assets/banking.png'

const Home = () => {
  return (
    <div className='flex justify-around pt-10 items-center'>
      {/* left div */}
      <div className='w-1/2 flex flex-col p-16'>
        <div className='font-semibold text-2xl'>ONLINE CREDIT AMOUNT PREDICTION</div>
        <p className='text-md text-slate-700 leading-8 py-7'>Welcome to our Credit Amount Prediction website! Discover your potential loan amount with our 
          advanced prediction feature. Plus, interact with our intuitive chatbot for personalized assistance 
          and financial insights.
        </p>
      </div>

      {/* right image */}
      <div className='w-1/2'>
        <img src={banking}></img> 
      </div>

    </div>
  )
}

export default Home