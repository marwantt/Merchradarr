import Link from "next/link";

export const metadata = {
  title: "About MerchRadar – Free Amazon Merch Research Tool",
  description: "Learn about MerchRadar, the free tool helping Amazon Merch sellers find profitable niches and grow their Print on Demand business.",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 prose prose-lg">
      <h1>About MerchRadar</h1>

      <p>
        MerchRadar is a <strong>free research tool</strong> designed specifically for 
        <strong> Merch by Amazon sellers</strong> and Print on Demand entrepreneurs. 
        Our mission is to make niche research faster, easier, and more effective.
      </p>

      <h2>Our Story</h2>
      <p>
        Founded by Amazon Merch sellers who experienced the frustration of 
        traditional research methods, MerchRadar was built to solve a simple problem: 
        <em> finding profitable niches shouldn&apos;t take hours</em>.
      </p>

      <p>
        We noticed that most sellers were spending countless hours manually searching 
        Amazon, scrolling through irrelevant products, and struggling to identify 
        which listings were actually Merch by Amazon designs. That&apos;s why we 
        created a tool that filters results to show only Merch on Demand products.
      </p>

      <h2>What Makes MerchRadar Different?</h2>
      <ul>
        <li>
          <strong>Merch-Only Results:</strong> Every search shows only Merch by Amazon 
          products, eliminating the noise of FBA and other seller types.
        </li>
        <li>
          <strong>Multi-Marketplace Support:</strong> Research niches across US, UK, 
          Germany, and France to find opportunities in different regions.
        </li>
        <li>
          <strong>Instant Results:</strong> No waiting, no downloads, no complex setup. 
          Just enter your keyword and get results immediately.
        </li>
        <li>
          <strong>Completely Free:</strong> We believe powerful tools should be 
          accessible to everyone, regardless of budget.
        </li>
      </ul>

      <h2>Our Values</h2>
      <p>
        At MerchRadar, we believe in:
      </p>
      <ul>
        <li><strong>Simplicity:</strong> Complex tools create barriers. We keep it simple.</li>
        <li><strong>Accessibility:</strong> Every seller deserves access to quality research tools.</li>
        <li><strong>Community:</strong> We&apos;re part of the Amazon Merch community, not just serving it.</li>
        <li><strong>Innovation:</strong> We continuously improve based on seller feedback and needs.</li>
      </ul>

      <h2>Who We Serve</h2>
      <p>
        MerchRadar is designed for:
      </p>
      <ul>
        <li><strong>Amazon Merch Beginners:</strong> New sellers learning the ropes</li>
        <li><strong>Experienced POD Sellers:</strong> Veterans looking to scale efficiently</li>
        <li><strong>Designers:</strong> Creative professionals validating design ideas</li>
        <li><strong>Entrepreneurs:</strong> Anyone building a Print on Demand business</li>
      </ul>

      <h2>Get Started</h2>
      <p>
        Ready to find your next profitable niche? 
        <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          Start searching with MerchRadar today
        </Link>.
      </p>

      <p>
        Have questions or suggestions? We&apos;d love to hear from you. 
        MerchRadar is built by sellers, for sellers.
      </p>
    </main>
  );
}
