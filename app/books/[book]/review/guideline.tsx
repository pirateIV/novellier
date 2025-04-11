import React from "react";

const Guidelines = () => {
  return (
    <div className="mt-8 bg-white dark:bg-neutral-900 rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-medium mb-4">Review Guidelines</h3>
      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <li className="flex items-start">
          <span className="text-purple-500 mr-2">•</span>
          Focus on your experience with the book and why you did or didn't enjoy
          it
        </li>
        <li className="flex items-start">
          <span className="text-purple-500 mr-2">•</span>
          Avoid spoilers or use spoiler warnings when discussing key plot
          elements
        </li>
        <li className="flex items-start">
          <span className="text-purple-500 mr-2">•</span>
          Be respectful and constructive in your criticism
        </li>
        <li className="flex items-start">
          <span className="text-purple-500 mr-2">•</span>
          Your review will be visible to the community after submission
        </li>
      </ul>
    </div>
  );
};

export default Guidelines;
