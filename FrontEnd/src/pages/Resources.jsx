export default function Resources() {
  const resources = [
    {
      title: "React Documentation",
      description: "Official React docs to learn component-based development",
      link: "https://react.dev",
    },
    {
      title: "Tailwind CSS",
      description: "Utility-first CSS framework for rapid UI development",
      link: "https://tailwindcss.com",
    },
    {
      title: "Vite",
      description: "Next generation frontend tooling for faster development",
      link: "https://vitejs.dev",
    },
    {
      title: "JavaScript Guide",
      description: "Comprehensive guide to modern JavaScript",
      link: "https://javascript.info",
    },
    {
      title: "Web Design Tips",
      description: "Best practices for creating beautiful web interfaces",
      link: "https://www.smashingmagazine.com",
    },
    {
      title: "Git & GitHub",
      description: "Version control and collaboration guide",
      link: "https://github.com",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Resources</h1>
      <p className="text-gray-600 mb-12">Useful resources and tools for developers and writers</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 border border-gray-200 rounded-lg hover:shadow-lg hover:border-gray-300 transition-all"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
            <p className="text-gray-600">{resource.description}</p>
            <span className="text-blue-600 mt-4 inline-block">Learn more →</span>
          </a>
        ))}
      </div>
    </div>
  );
}
