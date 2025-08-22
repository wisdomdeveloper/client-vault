import TopBar from "@/components/NavigationBar";
import Page from "@/features/dashboardcontent/Page";

const Dashboard = () => {
  return (
    <div className="h-full w-full">
      <div>
        <TopBar />
      </div>
      <div className="h-[200vh]">
        <Page />
      </div>
    </div>
  );
};

export default Dashboard;
