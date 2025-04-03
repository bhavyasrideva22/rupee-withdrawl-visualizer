
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { formatInIndianRupees, parseIndianRupeeFormat } from '@/utils/currency';
import { Download, Mail, FileText, BadgeIndianRupee, CalendarArrowDown } from 'lucide-react';
import { generateSWPReport, WithdrawalData } from '@/utils/pdfGenerator';
import { sendSWPEmail, formatSWPDataForEmail } from '@/utils/emailService';
import SWPChart from './SWPChart';

const SWPCalculator: React.FC = () => {
  // State for form inputs
  const [investedAmount, setInvestedAmount] = useState<number>(2000000); // ₹20 Lakhs
  const [withdrawalAmount, setWithdrawalAmount] = useState<number>(10000); // ₹10,000
  const [expectedReturnRate, setExpectedReturnRate] = useState<number>(8); // 8%
  const [withdrawalFrequency, setWithdrawalFrequency] = useState<string>("monthly");
  const [investmentDuration, setInvestmentDuration] = useState<number>(20); // 20 years
  
  // State for results
  const [finalCorpus, setFinalCorpus] = useState<number>(0);
  const [withdrawalData, setWithdrawalData] = useState<WithdrawalData['withdrawals']>([]);
  const [calculationPerformed, setCalculationPerformed] = useState<boolean>(false);
  
  // State for email dialog
  const [emailDialogOpen, setEmailDialogOpen] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [isEmailSending, setIsEmailSending] = useState<boolean>(false);
  
  // Handle input changes with formatting
  const handleInvestedAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseIndianRupeeFormat(e.target.value);
    setInvestedAmount(value);
  };
  
  const handleWithdrawalAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseIndianRupeeFormat(e.target.value);
    setWithdrawalAmount(value);
  };
  
  // Format inputs for display
  const formattedInvestedAmount = formatInIndianRupees(investedAmount, 0);
  const formattedWithdrawalAmount = formatInIndianRupees(withdrawalAmount, 0);
  
  // Calculate SWP results
  const calculateSWP = () => {
    // Validate inputs
    if (investedAmount <= 0 || withdrawalAmount <= 0 || expectedReturnRate < 0 || investmentDuration <= 0) {
      toast.error("Please enter valid values for all fields");
      return;
    }
    
    // Convert annual rate to per-period rate
    const periodsPerYear = withdrawalFrequency === "monthly" ? 12 : 
                           withdrawalFrequency === "quarterly" ? 4 : 
                           withdrawalFrequency === "half-yearly" ? 2 : 1;
    
    const ratePerPeriod = expectedReturnRate / 100 / periodsPerYear;
    const totalPeriods = investmentDuration * periodsPerYear;
    
    // Calculate for each period
    let currentCorpus = investedAmount;
    const withdrawals: WithdrawalData['withdrawals'] = [];
    
    for (let period = 1; period <= totalPeriods; period++) {
      // Calculate returns for this period before withdrawal
      const periodReturns = currentCorpus * ratePerPeriod;
      
      // Apply the returns to the corpus
      currentCorpus += periodReturns;
      
      // Apply withdrawal if there's enough money
      const actualWithdrawal = Math.min(withdrawalAmount, currentCorpus);
      currentCorpus -= actualWithdrawal;
      
      // Add to results
      const year = Math.ceil(period / periodsPerYear);
      const month = withdrawalFrequency === "monthly" ? ((period - 1) % 12) + 1 : undefined;
      
      withdrawals.push({
        year,
        month,
        withdrawalAmount: actualWithdrawal,
        remainingCorpus: currentCorpus
      });
      
      // Break if corpus is depleted
      if (currentCorpus <= 0) break;
    }
    
    setFinalCorpus(currentCorpus);
    setWithdrawalData(withdrawals);
    setCalculationPerformed(true);
  };
  
  // Generate PDF report
  const generatePDFReport = () => {
    if (!calculationPerformed) {
      toast.error("Please calculate results first");
      return;
    }
    
    // Create the withdrawal data object
    const swpData: WithdrawalData = {
      investedAmount,
      withdrawalAmount,
      expectedReturnRate,
      withdrawalFrequency,
      investmentDuration,
      finalCorpus,
      withdrawals: withdrawalData
    };
    
    // Generate the PDF
    const doc = generateSWPReport(swpData);
    
    // Save the PDF
    doc.save("SWP_Calculation_Report.pdf");
    
    toast.success("PDF report downloaded successfully");
  };
  
  // Send email with results
  const handleSendEmail = async () => {
    if (!userEmail) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!calculationPerformed) {
      toast.error("Please calculate results first");
      return;
    }
    
    setIsEmailSending(true);
    
    try {
      // Create the withdrawal data object
      const swpData: WithdrawalData = {
        investedAmount,
        withdrawalAmount,
        expectedReturnRate,
        withdrawalFrequency,
        investmentDuration,
        finalCorpus,
        withdrawals: withdrawalData
      };
      
      // Generate PDF
      const doc = generateSWPReport(swpData, userName, userEmail);
      const pdfBlob = doc.output('blob');
      
      // Send email (simulated)
      await sendSWPEmail(userEmail, swpData, pdfBlob);
      
      toast.success("Results sent to your email successfully");
      setEmailDialogOpen(false);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again later.");
    } finally {
      setIsEmailSending(false);
    }
  };
  
  // Calculate on component mount
  useEffect(() => {
    calculateSWP();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="animate-fade-in">
      <Card className="glass-card mb-8">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl text-primary flex items-center gap-2">
            <BadgeIndianRupee className="h-6 w-6" />
            Systematic Withdrawal Plan Calculator
          </CardTitle>
          <CardDescription>
            Plan your regular withdrawals from investments with our interactive SWP calculator
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calculator" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="investedAmount" className="text-sm font-medium">
                      Initial Investment Amount
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="investedAmount"
                        value={formattedInvestedAmount}
                        onChange={handleInvestedAmountChange}
                        className="pl-8"
                      />
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-gray-500">
                        ₹
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="withdrawalAmount" className="text-sm font-medium">
                      Withdrawal Amount
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="withdrawalAmount"
                        value={formattedWithdrawalAmount}
                        onChange={handleWithdrawalAmountChange}
                        className="pl-8"
                      />
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-gray-500">
                        ₹
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="expectedReturnRate" className="text-sm font-medium flex justify-between">
                      <span>Expected Annual Return (%)</span>
                      <span className="text-primary font-medium">{expectedReturnRate}%</span>
                    </Label>
                    <Slider
                      id="expectedReturnRate"
                      value={[expectedReturnRate]}
                      min={1}
                      max={20}
                      step={0.5}
                      onValueChange={(value) => setExpectedReturnRate(value[0])}
                      className="mt-2"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="withdrawalFrequency" className="text-sm font-medium">
                      Withdrawal Frequency
                    </Label>
                    <Select
                      value={withdrawalFrequency}
                      onValueChange={setWithdrawalFrequency}
                    >
                      <SelectTrigger id="withdrawalFrequency" className="mt-1">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="half-yearly">Half Yearly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="investmentDuration" className="text-sm font-medium flex justify-between">
                      <span>Investment Duration (Years)</span>
                      <span className="text-primary font-medium">{investmentDuration} years</span>
                    </Label>
                    <Slider
                      id="investmentDuration"
                      value={[investmentDuration]}
                      min={1}
                      max={30}
                      step={1}
                      onValueChange={(value) => setInvestmentDuration(value[0])}
                      className="mt-2"
                    />
                  </div>
                  
                  <Button 
                    onClick={calculateSWP} 
                    className="mt-6 w-full bg-accent text-swp-text hover:bg-accent/90"
                  >
                    <CalendarArrowDown className="h-4 w-4 mr-2" />
                    Calculate Withdrawal Plan
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="results" className="pt-4">
              {calculationPerformed ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Initial Investment</p>
                      <p className="text-2xl font-semibold">{formatInIndianRupees(investedAmount)}</p>
                    </div>
                    <div className="bg-secondary/20 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Regular Withdrawal</p>
                      <p className="text-2xl font-semibold">{formatInIndianRupees(withdrawalAmount)}</p>
                    </div>
                    <div className="bg-accent/20 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Final Corpus</p>
                      <p className="text-2xl font-semibold">{formatInIndianRupees(finalCorpus)}</p>
                    </div>
                  </div>
                  
                  <div className="h-[350px]">
                    <SWPChart withdrawalData={withdrawalData} frequency={withdrawalFrequency} />
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No calculation has been performed yet.</p>
                  <Button onClick={calculateSWP} className="mt-4 bg-accent text-swp-text hover:bg-accent/90">
                    Calculate Now
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex flex-wrap justify-between gap-2 pt-2">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={generatePDFReport}
              disabled={!calculationPerformed}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            
            <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  disabled={!calculationPerformed}
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Email Results
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Results to Email</DialogTitle>
                  <DialogDescription>
                    Enter your details to receive the SWP calculation results by email.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name (Optional)</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleSendEmail} disabled={isEmailSending}>
                    {isEmailSending ? "Sending..." : "Send Email"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => document.getElementById('swp-info')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Learn About SWP
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SWPCalculator;
