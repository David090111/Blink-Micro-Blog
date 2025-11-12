import { useState } from 'react'
import logo from "../assets/logo.png";
import { Login } from './Login.jsx';
import { Register } from './Register.jsx';

export const Header = () => {
  const [showLoginRegister, setShowLoginRegister] = useState(false);
  const [switchPage, setSwitchPage] = useState(true);
  
  // const [searchedValue, setSearchedValue] = useState('');

  return (
    <>
      <div className='flex gap-2 items-center h-16 border-b border-gray-300 px-2'>
        <div className='items-center flex'>
          <button >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M20.6 17.51a.5.5 0 0 1 0 .98l-.1.01h-17a.5.5 0 0 1 0-1h17zm0-6a.5.5 0 0 1 0 .98l-.1.01h-17a.5.5 0 0 1 0-1h17zm0-6a.5.5 0 0 1 0 .98l-.1.01h-17a.5.5 0 0 1 0-1h17z"></path></svg>
          </button>
        </div>
        <div className='mx-2 font-bold text-3xl flex items-center flex-shrink-0'>
          <img src={logo} alt="Logo" className="inline-block w-8 h-8" />
          <p className='whitespace-nowrop'>link Micro Blog</p>
        </div>
        <div className='flex bg-gray-200 rounded-4xl p-1 ml-4'>
          <div className='pl-2 pr-4'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M4.092 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0m6.95-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .79-.79l-3.73-3.73A8.05 8.05 0 0 0 11.042 3z" clip-rule="evenodd"></path></svg>
          </div>
          <input className='border-hidden outline-0' placeholder='Search' type="text" />
        </div>
        <div className='ml-auto flex items-center'>
          <button className='flex'>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"></path><path stroke="currentColor" d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"></path></svg>
            </div>
            <p>Write</p>
          </button>
          <button>
            <div className='mx-8'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" d="M15 18.5a3 3 0 1 1-6 0"></path><path stroke="currentColor" stroke-linejoin="round" d="M5.5 10.532V9a6.5 6.5 0 0 1 13 0v1.532c0 1.42.564 2.782 1.568 3.786l.032.032c.256.256.4.604.4.966v2.934a.25.25 0 0 1-.25.25H3.75a.25.25 0 0 1-.25-.25v-2.934c0-.363.144-.71.4-.966l.032-.032A5.35 5.35 0 0 0 5.5 10.532Z"></path></svg>
            </div>
          </button>
          <button className='mr-4 bg-red-300 rounded-3xl p-2 w-24' onClick={() => {setShowLoginRegister(true), setSwitchPage(true)}}>Sign in</button>
        </div>
      </div>
      
      {showLoginRegister && (
        switchPage ?
          <Login onSwitch={() => setSwitchPage(false)} onClose={() => setShowLoginRegister(false)}/> :
          <Register onSwitch={() => setSwitchPage(true)} onClose={() => setShowLoginRegister(false)}/>
      )}

    </>
  )
}
