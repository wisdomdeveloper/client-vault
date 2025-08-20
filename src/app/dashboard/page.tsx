import TopBar from "@/components/SideBar";
import Page from "@/features/dashboardcontent/Page";

const Dashboard = () => {
  return (
    <div className="h-full w-full">
      <div>
        <TopBar />
      </div>
      <div className="h-full">
        <Page />
      </div>
    </div>
  );
};

export default Dashboard;
