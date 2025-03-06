import type React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

const tabs = ["Overview", "My Books", "Reviews", "Settings"];

const TabActions = () => {
  return (
    <TabGroup>
      <TabList className="p-1.5 rounded-md bg-zinc-950">
        <div className="grid grid-cols-4 justify-between gap-0.5 bg-[#101014] p-1 *:py-2.5 rounded-md">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              className="text-center text-sm font-medium rounded text-gray-400 data-[selected]:text-white data-[selected]:bg-zinc-800 focus:!ring-none"
            >
              {tab}
            </Tab>
          ))}
        </div>
      </TabList>
      <TabPanels>
        <TabPanel>Content 1</TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
        <TabPanel>Content 4</TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

export default TabActions;
