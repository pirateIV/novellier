import React from "react";

const ReviewsPage = ({ params }: { params: Promise<{ book: string }> }) => {
  const { book } = await params;
  return <div>{book}</div>;
};

export default ReviewsPage;
