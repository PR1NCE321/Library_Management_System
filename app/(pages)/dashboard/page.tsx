import Navbar from "@/app/(components)/Navbar";
import FetchBooks from "@/app/(actions)/fetchbooks";
import { accessSync } from "fs";

async function AdminDashboard() {
  const data = await FetchBooks();
  let totalbooks = data.length;
  let totalbooksborrowed = 0;
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if (element.status == "borrowed")
      totalbooksborrowed++;
  }
  return (
    <div>
      <Navbar role="Admin" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white shadow-md rounded-2xl p-4 text-red-500">Total Books : {totalbooks}</div>
          <div className="bg-white shadow-md rounded-2xl p-4 text-red-500">Active Users</div>
          <div className="bg-white shadow-md rounded-2xl p-4 text-red-500">Books Borrowed : {totalbooksborrowed}</div>
          <div className="bg-white shadow-md rounded-2xl p-4 text-red-500">Overdue Fines</div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard
