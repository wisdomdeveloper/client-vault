import NavigationBar from "@/components/NavigationBar";
import ProtectedRoute from "@/components/ProtecttedRoute";
import Page from "@/features/dashboardcontent/Page";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div className="h-full w-full">
        <div>
          <NavigationBar />
        </div>
        <div className="h-[200vh]">
          <Page />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
