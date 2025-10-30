import Sidebar from "@/app/components/Sidebar";
import Dashboard from "@/components/Dashboard";

const Page = () => {
  return (
    <main className="flex h-screen w-screen">
      {/* Sidebar fixed width */}
      <Sidebar />

      {/* Dashboard grows to fill remaining space */}
      <div className="flex-1 ml-64 overflow-y-auto">
        <Dashboard />
      </div>
    </main>
  );
};

export default Page;
