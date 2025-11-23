"use client";

import Link from "next/link";

export default function SEOTestPage() {
  const quickTests = [
    {
      name: "Sitemap",
      url: "/sitemap.xml",
      description: "Check if sitemap is accessible",
    },
    {
      name: "Robots.txt",
      url: "/robots.txt",
      description: "Check robots.txt file",
    },
    {
      name: "Homepage",
      url: "/",
      description: "Test homepage SEO",
    },
    {
      name: "Country Example",
      url: "/countries/Albania",
      description: "Test country detail page SEO",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10">
          <h1 className="text-4xl font-bold text-white mb-2">SEO Testing Dashboard</h1>
          <p className="text-purple-200 mb-8">
            Test and verify your website's SEO implementation
          </p>

          {/* Quick Tests */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Quick Tests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickTests.map((test) => (
                <Link
                  key={test.name}
                  href={test.url}
                  target="_blank"
                  className="block backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {test.name}
                  </h3>
                  <p className="text-sm text-purple-300 mb-2">{test.description}</p>
                  <p className="text-xs text-purple-400 font-mono">{test.url}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Testing Instructions */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              How to Test
            </h2>
            <div className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10">
              <ol className="list-decimal list-inside space-y-3 text-white">
                <li>
                  <strong>View Page Source:</strong> Right-click any page → "View Page Source" → Check for meta tags and structured data
                </li>
                <li>
                  <strong>Test Sitemap:</strong> Visit <code className="bg-white/10 px-2 py-1 rounded">/sitemap.xml</code> to verify all pages are listed
                </li>
                <li>
                  <strong>Test Robots.txt:</strong> Visit <code className="bg-white/10 px-2 py-1 rounded">/robots.txt</code> to verify configuration
                </li>
                <li>
                  <strong>Use External Tools:</strong> Copy your live URL and test with tools below
                </li>
                <li>
                  <strong>Google Search Console:</strong> Set up and submit your sitemap for indexing
                </li>
              </ol>
            </div>
          </section>

          {/* External Tools */}
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              External SEO Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: "Google Rich Results Test",
                  url: "https://search.google.com/test/rich-results",
                  description: "Test structured data",
                },
                {
                  name: "PageSpeed Insights",
                  url: "https://pagespeed.web.dev/",
                  description: "Check performance & SEO",
                },
                {
                  name: "Schema Validator",
                  url: "https://validator.schema.org/",
                  description: "Validate Schema.org markup",
                },
                {
                  name: "Meta Tags Checker",
                  url: "https://metatags.io/",
                  description: "Preview social media tags",
                },
              ].map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-purple-300">{tool.description}</p>
                </a>
              ))}
            </div>
          </section>

          {/* SEO Checklist */}
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">SEO Checklist</h2>
            <div className="space-y-2">
              {[
                "Meta title and description on all pages",
                "Open Graph tags for social sharing",
                "Twitter Card tags",
                "Structured data (JSON-LD)",
                "Sitemap.xml accessible",
                "Robots.txt configured",
                "Canonical URLs set",
                "Mobile-responsive design",
                "Fast page load times",
                "HTTPS enabled (production)",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-white bg-white/5 rounded-lg p-3"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Back Link */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <Link
              href="/"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              ← Back to Countries
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
