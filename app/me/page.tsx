import ProfileSummary from "./_components/ProfileSummary";
import TabContents from "./_components/TabContents";
import Nav from "./_components/Nav";

const DashboardLayout = () => {
  return (
    <div className="relative bg-neutral-50 dark:bg-background">
      <Nav />
      <ProfileSummary />
      <TabContents />
    </div>
  );
};

export default DashboardLayout;
