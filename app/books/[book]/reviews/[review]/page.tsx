import React from "react";

type Params = Promise<{ review: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { review } = await params;
}

const Page = async ({ params }: { params: Params }) => {
  const { review } = await params;
  return <div className="text-3xl">{review}</div>;
};

export default Page;
