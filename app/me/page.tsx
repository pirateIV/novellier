import { redirect } from "next/navigation";
import { getUserData } from "@/shared/auth";
import Nav from "./_components/Nav";
import ProfileSummary from "./_components/ProfileSummary";
import TabContents from "./_components/TabContents";

const DashboardLayout = async () => {
  const user = await getUserData();

  if (user.error) {
    redirect("/auth/sign-in");
  }

  console.log(user)

  return (
    <div className="relative bg-neutral-50 dark:bg-background">
      <Nav />
      <ProfileSummary user={user} />
      <TabContents user={user} />
  </div>
  );
};

export default DashboardLayout;
