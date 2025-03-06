import type React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import OverviewTab from "./tabs/Overview";
import MyBooksTab from "./tabs/MyBooks";
import ReviewsTab from "./tabs/Reviews";
import SettingsTab from "./tabs/Settings";

const tabs = ["Overview", "My Books", "Reviews", "Settings"];

const TabContents = () => {
  return (
    <div className="-mt-8 container mx-auto px-4 md:px-6">
      <TabGroup>
        <TabList className="p-1.5 rounded-md bg-zinc-950">
          <div className="grid grid-cols-4 justify-between gap-0.5 bg-[#0f0f0f] p-1 *:py-2.5 rounded-md">
            {tabs.map((tab) => (
              <Tab
                key={tab}
                className="text-center text-sm font-medium rounded text-gray-400 data-[selected]:text-white data-[selected]:bg-zinc-800 data-[selected]:border-b-2 data-[selected]:border-b-zinc-700/60 outline-none"
              >
                {tab}
              </Tab>
            ))}
          </div>
        </TabList>
        <TabPanels className="mt-6">
          <TabPanel>
            <OverviewTab />
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
