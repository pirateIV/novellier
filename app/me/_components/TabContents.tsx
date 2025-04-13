import type React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { User } from "@/shared/types";
import OverviewTab from "./tabs/Overview";
import MyBooksTab from "./tabs/MyBooks";
import ReviewsTab from "./tabs/Reviews";
import SettingsTab from "./tabs/Settings";

const tabs = ["Overview", "My Books", "Reviews", "Settings"];

const TabContents = ({ user }: { user: User }) => {
  return (
    <div className="-mt-8 lg:container mx-auto sm:px-4 md:px-6">
      <TabGroup>
        <TabList className="p-1.5 rounded-md bg-white dark:bg-zinc-950">
          <div className="grid grid-cols-4 justify-between gap-0.5 bg-neutral-100 dark:bg-neutral-900 p-1 *:py-2.5 rounded-md">
            {tabs.map((tab) => (
              <Tab
                key={tab}
                className="text-center text-xs md:text-sm font-medium rounded text-gray-600 dark:text-gray-300 data-[selected]:text-gray-900 data-[selected]:bg-white dark:data-[selected]:text-gray-50 dark:data-[selected]:bg-zinc-800 data-[selected]:shadow-sm dark:data-[selected]:border-b-zinc-700/60 outline-none"
              >
                {tab}
              </Tab>
            ))}
          </div>
        </TabList>
        <TabPanels className="mt-6">
          <TabPanel>
            <OverviewTab user={user} />
          </TabPanel>
          <TabPanel>
            <MyBooksTab />
          </TabPanel>
          <TabPanel>
            <ReviewsTab />
          </TabPanel>
          <TabPanel>
            <SettingsTab />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default TabContents;
