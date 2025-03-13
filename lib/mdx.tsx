import { ClassAttributes, HTMLAttributes, JSX } from "react";
import { remark } from "remark";
import html from "remark-html";

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export const components = {
  em(
    properties: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLElement> &
      HTMLAttributes<HTMLElement>
  ) {
    return <i {...properties} />;
  },
};
