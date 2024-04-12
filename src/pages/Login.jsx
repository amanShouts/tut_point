import { useState } from "react"

export default function Login(){

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return(
    <div className="h-full bg-slate-800 flex justify-center items-center">
      <div className="border-white rounded-md border-1 w-full  xs:w-1/2 sm:w-1/2 h-1/2 flex flex-col justify-center gap-8 p-4">
        <input type='text' placeholder="username/mail" value={username} className="min-w-[400px] mx-auto p-2 rounded-md" />
        <input type="password" placeholder="password" value={password} className="min-w-[400px] mx-auto p-2 rounded-md"  />
      </div>
    </div>
  )
}