import ProtectedRoute from "@/components/ProtecttedRoute";
import Page from "@/features/dashboardcontent/Page";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div className="h-full bg-black w-full">
        <div className="">
          <Page />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
