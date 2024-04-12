import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center bg-slate-400 m-0 p-2 h-full">
      <p className="w-1/3 text-4xl transition-all duration-500 rounded-lg">
        <Link to='/'>
          Student Portal
        </Link>
      </p>

      <p className="w-1/3 text-xl text-center hover:bg-slate-200 p-2 transition-all duration-500 rounded-lg">
        <Link to='/videos'>
          Videos
        </Link>
      </p>

      <p className="w-1/3 text-md text-right">Hi, username</p>
    </div>
  )
}