import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center bg-slate-400 m-0 p-2 h-full">
      <p>
        <Link to='/'>
        Student Portal
        </Link>
      </p>

      <p>
        <Link to='/videos'>
          Videos
        </Link>
      </p>
      <p>username</p>
    </div>
  )
}