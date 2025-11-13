import React from "react";
export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">About Blink Micro Blog</h1>

      <div className="prose prose-lg text-gray-700 space-y-6">
        <p>
          Blink Micro Blog is a platform dedicated to sharing short-form, high-quality content on various topics. Our mission is to make blogging
          accessible and enjoyable for everyone.
        </p>

        <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
        <p>
          We believe in the power of ideas. Our platform empowers writers to share their thoughts, experiences, and expertise with a global audience
          in a simple and elegant way.
        </p>

        <h2 className="text-2xl font-bold text-gray-900">Why Blink?</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Simple and intuitive interface</li>
          <li>Fast and reliable platform</li>
          <li>Community-driven content</li>
          <li>Focus on quality over quantity</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900">Get Started</h2>
        <p>Join thousands of writers and readers today. Start sharing your stories with the world!</p>
      </div>
    </div>
  );
}
