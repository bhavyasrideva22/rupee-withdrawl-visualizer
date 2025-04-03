
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const SWPInformation: React.FC = () => {
  return (
    <div id="swp-info" className="animate-slide-up py-10">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Understanding Systematic Withdrawal Plan (SWP)</CardTitle>
          <CardDescription>
            Learn how SWP works and how it can benefit your financial planning
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-swp-text">
            <h3 className="text-xl font-semibold mb-3">What is a Systematic Withdrawal Plan?</h3>
            <p className="mb-4 leading-relaxed">
              A Systematic Withdrawal Plan (SWP) is a facility that allows an investor to withdraw a fixed amount from their mutual fund investments at regular intervals - be it monthly, quarterly, half-yearly, or annually. It's essentially the reverse of a Systematic Investment Plan (SIP), where instead of building your corpus, you're drawing down from it in a disciplined manner.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="bg-primary/5 p-5 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Regular Income Stream</h4>
                <p className="text-sm">SWP provides a steady flow of income, making it ideal for retirees or those seeking regular cash flow from their investments.</p>
              </div>
              
              <div className="bg-secondary/10 p-5 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Tax Efficiency</h4>
                <p className="text-sm">SWP can be more tax-efficient than earning interest income, as only the capital gains portion of each withdrawal is taxable.</p>
              </div>
              
              <div className="bg-accent/10 p-5 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Flexibility</h4>
                <p className="text-sm">You can customize your withdrawal amount, frequency, and even pause or stop withdrawals when needed.</p>
              </div>
            </div>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How does SWP work?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">
                  When you set up an SWP, you specify three key parameters: the amount you want to withdraw regularly, how often you want the withdrawals (frequency), and from which fund or investment you want to withdraw.
                </p>
                <p className="mb-3">
                  On each predetermined date, your fund house or investment manager will redeem the specified amount from your investment and transfer it to your bank account. This gives you a predictable cash flow while allowing the remainder of your investment to potentially continue growing.
                </p>
                <p>
                  The beauty of an SWP is that your remaining investment corpus can still earn returns, which can help sustain your withdrawals over a longer period compared to simply keeping the entire amount in a savings account.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>What are the benefits of using SWP?</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Regular Income:</strong> SWP provides a systematic and regular income stream from your investments.</li>
                  <li><strong>Capital Appreciation:</strong> Your remaining investment continues to grow based on market performance.</li>
                  <li><strong>Tax Efficiency:</strong> Only the capital gains portion of your withdrawal is taxable, making it potentially more tax-efficient than interest income.</li>
                  <li><strong>Flexibility:</strong> You can adjust your withdrawal amount or frequency based on your changing needs.</li>
                  <li><strong>Longevity:</strong> By keeping your corpus invested and withdrawing systematically, you can potentially make your savings last longer.</li>
                  <li><strong>Inflation Hedge:</strong> As your investments can continue to grow, SWP can help combat the effects of inflation on your retirement corpus.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Who should consider using SWP?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">
                  SWP is particularly beneficial for:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Retirees:</strong> Looking for regular income from their retirement corpus</li>
                  <li><strong>Individuals with lump sum amounts:</strong> Who want to generate regular cash flow from a one-time investment</li>
                  <li><strong>Investors seeking tax efficiency:</strong> As only the capital gains portion of withdrawals is taxable</li>
                  <li><strong>Those with irregular income patterns:</strong> Who need to supplement their income during lean periods</li>
                  <li><strong>Parents planning for education expenses:</strong> Who can time SWPs to coincide with fee payment schedules</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>How to calculate SWP and understand its sustainability?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">
                  The sustainability of your SWP depends on three main factors:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li><strong>Initial Investment Amount:</strong> The more you start with, the more sustainable your withdrawals can be.</li>
                  <li><strong>Withdrawal Rate:</strong> Financial experts often recommend not withdrawing more than 4-5% of your corpus annually for long-term sustainability.</li>
                  <li><strong>Expected Returns:</strong> The performance of your investments will significantly impact how long your corpus lasts.</li>
                </ol>
                <p className="mt-3">
                  Our SWP calculator above helps you estimate how these factors interact and how long your corpus might last based on different withdrawal scenarios.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>SWP vs. Other Income Options</AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">
                  How does SWP compare to other income-generating options?
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 mt-2">
                    <thead>
                      <tr>
                        <th className="border border-gray-200 px-4 py-2 bg-gray-50 text-left">Feature</th>
                        <th className="border border-gray-200 px-4 py-2 bg-gray-50 text-left">SWP</th>
                        <th className="border border-gray-200 px-4 py-2 bg-gray-50 text-left">Fixed Deposit</th>
                        <th className="border border-gray-200 px-4 py-2 bg-gray-50 text-left">Dividend Plans</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 px-4 py-2 font-medium">Return Potential</td>
                        <td className="border border-gray-200 px-4 py-2">Higher (Market-linked)</td>
                        <td className="border border-gray-200 px-4 py-2">Fixed (Lower)</td>
                        <td className="border border-gray-200 px-4 py-2">Variable</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-2 font-medium">Predictability</td>
                        <td className="border border-gray-200 px-4 py-2">Fixed withdrawal amount</td>
                        <td className="border border-gray-200 px-4 py-2">Fixed interest</td>
                        <td className="border border-gray-200 px-4 py-2">Unpredictable</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-2 font-medium">Tax Efficiency</td>
                        <td className="border border-gray-200 px-4 py-2">Only capital gains taxed</td>
                        <td className="border border-gray-200 px-4 py-2">Interest fully taxable</td>
                        <td className="border border-gray-200 px-4 py-2">Dividends taxable</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-2 font-medium">Inflation Protection</td>
                        <td className="border border-gray-200 px-4 py-2">Better (Equity potential)</td>
                        <td className="border border-gray-200 px-4 py-2">Poor</td>
                        <td className="border border-gray-200 px-4 py-2">Moderate</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="bg-swp-blue/10 p-5 rounded-lg mt-6">
            <h3 className="text-swp-blue font-semibold mb-2">Key Considerations Before Starting an SWP</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Ensure your withdrawal rate is sustainable for your planned duration</li>
              <li>Consider keeping 6-12 months of withdrawals in a separate liquid fund as a buffer against market volatility</li>
              <li>Regularly review and adjust your SWP based on market conditions and your changing needs</li>
              <li>Understand the tax implications - long-term capital gains from equity funds above ₹1 lakh are taxed at 10%</li>
              <li>For debt funds, indexation benefits are available for long-term capital gains</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SWPInformation;
