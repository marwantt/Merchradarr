export const metadata = {
  title: "MerchRadar Blog – Amazon Merch Tips, Strategies & Insights",
  description: "Get the latest Amazon Merch tips, niche research strategies, and Print on Demand insights from the MerchRadar blog.",
};

export default function BlogPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">MerchRadar Blog</h1>
      
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Tips, strategies, and insights for Amazon Merch sellers and Print on Demand entrepreneurs.
      </p>

      <div className="grid gap-8">
        {/* Featured Article */}
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded-full text-xs font-medium">
                Policy Guide
              </span>
              <span className="mx-2">•</span>
              <span>January 2025</span>
            </div>
            <h2 className="text-xl font-semibold mb-3">
              <a href="/blog/amazon-restricted-keywords-merch" className="hover:text-blue-600 dark:hover:text-blue-400">
                Amazon Restricted Keywords: The Ultimate Guide for Merch by Amazon Sellers
              </a>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Learn which restricted keywords Amazon bans in Merch by Amazon listings. Avoid rejections and suspensions
              with this comprehensive guide to safe alternatives and best practices.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">12 min read</span>
              <a href="/blog/amazon-restricted-keywords-merch" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                Read more →
              </a>
            </div>
          </div>
        </article>

        {/* Regular Articles */}
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>Research</span>
              <span className="mx-2">•</span>
              <span>January 2025</span>
            </div>
            <h2 className="text-xl font-semibold mb-3">
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
                How to Find Profitable Amazon Merch Niches in 2025
              </a>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Discover the latest strategies for identifying winning niches in the competitive Amazon Merch marketplace.
              Learn how to spot trends early and avoid oversaturated markets.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">5 min read</span>
              <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                Read more →
              </a>
            </div>
          </div>
        </article>

        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>Strategy</span>
              <span className="mx-2">•</span>
              <span>January 2025</span>
            </div>
            <h2 className="text-xl font-semibold mb-3">
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
                Seasonal Merch: Planning Your Amazon Merch Calendar
              </a>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Master the art of seasonal planning for Amazon Merch. Learn when to design,
              upload, and promote seasonal designs for maximum sales.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">4 min read</span>
              <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                Read more →
              </a>
            </div>
          </div>
        </article>

        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>Tips</span>
              <span className="mx-2">•</span>
              <span>January 2025</span>
            </div>
            <h2 className="text-xl font-semibold mb-3">
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
                Keyword Research for Amazon Merch: Beyond the Basics
              </a>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Advanced keyword research techniques specifically for Amazon Merch sellers. 
              Find long-tail keywords and low-competition opportunities.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">6 min read</span>
              <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                Read more →
              </a>
            </div>
          </div>
        </article>

        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>Case Study</span>
              <span className="mx-2">•</span>
              <span>January 2025</span>
            </div>
            <h2 className="text-xl font-semibold mb-3">
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
                From $0 to $10K: A Real Amazon Merch Success Story
              </a>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Follow the journey of a successful Amazon Merch seller who went from 
              complete beginner to earning $10,000+ monthly using strategic niche research.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">8 min read</span>
              <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                Read more →
              </a>
            </div>
          </div>
        </article>

        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>Tools</span>
              <span className="mx-2">•</span>
              <span>January 2025</span>
            </div>
            <h2 className="text-xl font-semibold mb-3">
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
                Essential Tools Every Amazon Merch Seller Needs
              </a>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              A comprehensive guide to the tools and software that can help you 
              streamline your Amazon Merch business and increase productivity.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">7 min read</span>
              <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                Read more →
              </a>
            </div>
          </div>
        </article>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          More articles coming soon! Subscribe to stay updated.
        </p>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="font-semibold mb-2">Get the Latest Tips</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Join our newsletter for Amazon Merch insights and strategies.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
