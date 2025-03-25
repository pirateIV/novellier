import React from "react";

const ReviewsPage = async ({ params }: { params: Promise<{ book: string }> }) => {
  const { book } = await params;
  return <div>{book}</div>;
};

export default ReviewsPage;
