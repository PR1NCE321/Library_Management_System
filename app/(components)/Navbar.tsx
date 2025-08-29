import Link from "next/link";


interface Props {
  role: string;
}

export default function Navbar({ role }: Props) {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="font-bold text-xl text-black">Library LMS</div>
      <div className="flex justify-between items-center ">
        <Link className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-700 hover:text-white" href="/dashboard">Dashboard</Link>
        <Link className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-700 hover:text-white" href="/books">Books</Link>
        <Link className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-700 hover:text-white" href="/books/add">Add Books</Link>

      </div>
      <div className="text-gray-600">Logged in as: {role}</div>
    </nav>
  );
}