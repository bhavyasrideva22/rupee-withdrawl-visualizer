
import React from 'react';
import SWPCalculator from '@/components/SWPCalculator';
import SWPInformation from '@/components/SWPInformation';
import { BadgeIndianRupee } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-swp-bg">
      {/* Header Section */}
      <header className="bg-primary text-white py-8 px-4 md:px-8 text-center">
        <div className="container mx-auto">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-3 rounded-full">
              <BadgeIndianRupee className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Systematic Withdrawal Plan Calculator</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Plan your regular income with our interactive SWP calculator and make informed financial decisions
          </p>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 max-w-5xl">
        {/* Calculator Section */}
        <SWPCalculator />
        
        {/* Information Section */}
        <SWPInformation />
        
        {/* SEO Content */}
        <section className="my-12 prose max-w-none text-swp-text">
          <h2 className="text-2xl font-semibold text-primary mb-4">Mastering Your Financial Future with Systematic Withdrawal Plans</h2>
          
          <p>
            In today's dynamic financial landscape, planning for a stable income stream is crucial, especially for those approaching retirement or seeking financial independence. Systematic Withdrawal Plans (SWPs) have emerged as a powerful tool in the Indian market, offering a structured approach to drawing regular income from your investments while keeping the remaining corpus invested for potential growth.
          </p>
          
          <h3 className="text-xl font-semibold text-primary mt-8 mb-3">Why SWP is Gaining Popularity in India</h3>
          
          <p>
            The Systematic Withdrawal Plan has gained significant traction among Indian investors, particularly retirees and those looking for passive income sources. Unlike traditional income options like fixed deposits, SWPs offer the dual benefits of regular income and potential capital appreciation, making them an attractive choice in a country where inflation consistently erodes purchasing power.
          </p>
          
          <p>
            According to recent data from the Association of Mutual Funds in India (AMFI), SWP registrations have seen a steady increase of approximately 15-20% year-on-year, reflecting growing awareness about this income strategy. This trend is particularly noteworthy as India's aging population continues to grow, with projections indicating that by 2050, over 19% of the population will be above 60 years of age.
          </p>
          
          <h3 className="text-xl font-semibold text-primary mt-8 mb-3">Optimizing Your SWP Strategy</h3>
          
          <p>
            To maximize the benefits of an SWP, it's essential to carefully consider factors such as withdrawal rate, investment allocation, and tax implications. Financial experts often recommend following the '4% rule' as a starting point – withdrawing approximately 4% of your corpus annually to maintain sustainability over a 25-30 year period.
          </p>
          
          <p>
            Additionally, creating a balanced portfolio that includes a mix of equity, debt, and hybrid funds can help optimize your SWP returns while managing volatility. For instance, allocating a portion of your corpus to equity funds can provide inflation-beating returns in the long run, while debt funds can offer stability during market downturns.
          </p>
          
          <div className="bg-secondary/10 p-6 rounded-lg my-8">
            <h4 className="text-lg font-semibold text-primary mb-2">Pro Tip: The Power of Sequencing</h4>
            <p className="mb-0">
              One often-overlooked aspect of SWP planning is "sequence of returns risk." Market downturns early in your withdrawal phase can significantly impact your corpus sustainability. Consider maintaining a separate emergency buffer equivalent to 2-3 years of withdrawal needs in less volatile instruments like liquid funds or short-term debt funds. This strategy allows you to avoid withdrawing from equity investments during market corrections, giving your portfolio time to recover.
            </p>
          </div>
          
          <h3 className="text-xl font-semibold text-primary mt-8 mb-3">Tax Implications of SWP in India</h3>
          
          <p>
            Understanding the tax implications of SWP is crucial for effective financial planning. In India, withdrawals from mutual funds through SWP are subject to capital gains tax, with different tax rates applicable based on the holding period and fund type.
          </p>
          
          <p>
            For equity-oriented funds, long-term capital gains (LTCG) exceeding ₹1 lakh in a financial year are taxed at 10% without indexation benefits. Short-term capital gains (STCG) from equity funds are taxed at 15%. For debt funds, LTCG are taxed at 20% with indexation benefits, while STCG are added to your income and taxed as per your income tax slab.
          </p>
          
          <p>
            By strategically planning your SWP across different fund types and considering the tax implications, you can optimize your post-tax returns. For instance, utilizing your annual LTCG exemption of ₹1 lakh from equity funds before withdrawing from debt funds can lead to significant tax savings.
          </p>
          
          <h3 className="text-xl font-semibold text-primary mt-8 mb-3">When to Choose SWP Over Other Income Options</h3>
          
          <p>
            While SWP offers numerous advantages, it's important to assess whether it's the right choice for your specific financial situation. SWP is particularly beneficial in scenarios where:
          </p>
          
          <ul className="list-disc pl-5 mt-3 mb-5">
            <li className="mb-2">You have a substantial lump sum amount and need regular income</li>
            <li className="mb-2">You seek potential capital appreciation along with regular withdrawals</li>
            <li className="mb-2">You want flexibility in adjusting your withdrawal amount based on changing needs</li>
            <li className="mb-2">You're looking for a more tax-efficient withdrawal strategy compared to interest income</li>
            <li className="mb-2">You're concerned about inflation eroding your purchasing power over time</li>
          </ul>
          
          <p>
            However, if you have a very short investment horizon or cannot tolerate any market volatility, options like bank fixed deposits or senior citizen savings schemes might be more suitable for your needs.
          </p>
          
          <h3 className="text-xl font-semibold text-primary mt-8 mb-3">The Future of SWP in India's Financial Landscape</h3>
          
          <p>
            As India continues to evolve as a major economic power, the mutual fund industry is experiencing rapid growth and innovation. With increasing financial literacy and a shift towards self-directed retirement planning, SWPs are expected to become an even more integral part of income strategies for Indian investors.
          </p>
          
          <p>
            Recent regulatory changes aimed at increasing transparency and reducing costs in mutual funds have made SWPs even more attractive. Additionally, the growing availability of sophisticated financial planning tools and calculators (like the one provided on this page) is empowering investors to make more informed decisions regarding their withdrawal strategies.
          </p>
          
          <p>
            By leveraging our interactive SWP calculator, you can simulate different scenarios, visualize the potential longevity of your corpus, and identify the optimal withdrawal strategy tailored to your unique financial goals and circumstances. Remember that successful SWP planning involves regular monitoring and occasional rebalancing to account for changing market conditions and personal requirements.
          </p>
          
          <p className="mt-8 text-sm text-gray-500">
            Disclaimer: The information provided on this page is for educational purposes only and should not be considered as financial advice. We recommend consulting with a qualified financial advisor before making investment decisions.
          </p>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-primary/10 py-8 px-4 text-center">
        <div className="container mx-auto">
          <p className="text-primary mb-2">© {new Date().getFullYear()} SWP Calculator. All rights reserved.</p>
          <p className="text-sm text-gray-500">
            Helping you make informed financial decisions with our tools and resources.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
