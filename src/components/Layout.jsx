import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="max-w-screen max-h-screen">
      <div className="h-[100px]">
        <Navbar />
      </div>
      <div className="min-h-[calc(100vh-100px)] bg-slate-800 p-4 pb-36">
        {children}
      </div>
    </div>
  )
}