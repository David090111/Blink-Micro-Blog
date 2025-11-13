import React from "react";
import { Link, useParams } from "react-router-dom";

export default function StoryDetail() {
  const { id } = useParams();
  return (
    <section>
      <Link to="/stories" className="text-blue-600 hover:underline">
        ← Back to My Stories
      </Link>
      <h2 className="mt-4 text-2xl font-bold">Story #{id}</h2>
      <p className="mt-2 text-gray-700">This is where the story content for ID {id} would render.</p>
    </section>
  );
}
