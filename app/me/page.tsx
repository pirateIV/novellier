import { redirect } from "next/navigation";
import { getUserData } from "@/shared/auth";
import Nav from "./_components/Nav";
import ProfileSummary from "./_components/ProfileSummary";
import TabContents from "./_components/TabContents";
import { cookies } from "next/headers";

const DashboardLayout = async () => {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/auth/sign-in");
  }

  try {
    const user = await getUserData(token);
    console.log(user.error)
    if (!token || user.error) {
      console.log("Invalid user data, redirecting");
      redirect("/auth/sign-in");
    }

    console.log(user)

    return (
      <div className="relative min-h-screen bg-neutral-800 dark:bg-background pb-5">
        <Nav />
        <ProfileSummary user={user} />
        <TabContents user={user} />
      </div>
    );
  } catch (error) {
    console.log(error);
    redirect("/auth/sign-in");
  }
};

export default DashboardLayout;
