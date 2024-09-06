import { useCallback, useState, useEffect, useRef } from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [number, setnumallowed] = useState(false);
  const [character, setcharallowed] = useState(false);
  const [Password, setpassallowed] = useState("")
  const passwordref= useRef(null);

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ";
    if (setnumallowed) str += "1234567890"
    if (setcharallowed) str += "!@#$/?&()_+{}"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setpassallowed(pass)
  }, [length, number, character, setpassallowed]);

  useEffect(() => { passwordgenerator() }, [length, character, number, passwordgenerator])

  const copypasswordtoclipboard = useCallback(() => 
    { passwordref.current?.select();
      window.navigator.clipboard.writeText(Password) }, [Password])
  return (
    <>
      <div className='text-center w-full  shadow-md px-4 py-3 my-9
       rounded-lg text-black bg-gray-700'>
        <h1 className='text-white text-center rounded-md my-3'> Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
            value={Password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordref}
          />
          <button onClick={copypasswordtoclipboard}

            type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-kl px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Copy </button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range" min={6} max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setlength(e.target.value) }}
            />
            <lable>Length:{length}</lable>
            <input type='checkbox' defaultChecked={number}
              id="numberinput"
              onChange={(e) => {
                setnumallowed((prev) => !prev);

              }} />
            <lable>number</lable>
             <input type='checkbox'
              defaultChecked={character}
              id="charcinput"
              onChange={(e) => { setcharallowed((prev) => !prev); }} />
            <lable>character</lable>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
