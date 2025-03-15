"use client";

import { MDXProvider } from "@mdx-js/react";
import { components } from "@/lib/mdx";

const BookDescription =  ({ description }: { description: string }) => {
  return (
    <MDXProvider components={components}>
      <div
        className="[&_a]:text-blue-500 [&_a]:underline [&_em]:text-sky-500 [&_strong]:text-gray-700 dark:[&_strong]:text-gray-100"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </MDXProvider>
  );
};

export default BookDescription;
