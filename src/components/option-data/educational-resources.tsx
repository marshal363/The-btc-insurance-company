"use client";

interface Resource {
  title: string;
  description: string;
  link: string;
}

export function EducationalResources() {
  const resources: Resource[] = [
    {
      title: "Understanding Options Data",
      description: "Learn how to interpret options data and use it to inform your trading decisions.",
      link: "#understanding-options"
    },
    {
      title: "Implied Volatility Explained",
      description: "Discover how implied volatility affects option pricing and what it tells us about market sentiment.",
      link: "#implied-volatility"
    },
    {
      title: "Put/Call Ratio Analysis",
      description: "Understand what the put/call ratio means and how to use it as a market sentiment indicator.",
      link: "#put-call-ratio"
    },
    {
      title: "Options Greeks 101",
      description: "Learn about delta, gamma, theta, vega, and rho, and how they affect option prices.",
      link: "#options-greeks"
    }
  ];

  return (
    <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm">
      <h2 className="text-xl font-bold mb-4">Educational Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource, index) => (
          <div key={index} className="border rounded-lg p-4 hover:border-blue-200 transition-colors duration-200">
            <h3 className="font-semibold mb-2">{resource.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
            <a 
              href={resource.link} 
              className="text-sm text-blue-600 hover:underline flex items-center"
            >
              Read more 
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
} 