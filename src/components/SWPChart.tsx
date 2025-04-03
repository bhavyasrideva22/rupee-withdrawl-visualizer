
import React, { useMemo } from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatInIndianRupees } from '@/utils/currency';
import { WithdrawalData } from '@/utils/pdfGenerator';

interface SWPChartProps {
  withdrawalData: WithdrawalData['withdrawals'];
  frequency: string;
}

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-md shadow-md">
        <p className="font-semibold text-sm">Year {label}</p>
        <p className="text-[#245e4f] text-sm">
          Corpus: {formatInIndianRupees(payload[0].value)}
        </p>
        <p className="text-[#7ac9a7] text-sm">
          Withdrawal: {formatInIndianRupees(payload[1].value)}
        </p>
      </div>
    );
  }
  return null;
};

const SWPChart: React.FC<SWPChartProps> = ({ withdrawalData, frequency }) => {
  // Prepare data for yearly view
  const yearlyData = useMemo(() => {
    const yearMap = new Map();
    
    withdrawalData.forEach(item => {
      const year = item.year;
      
      if (!yearMap.has(year)) {
        yearMap.set(year, {
          year,
          remainingCorpus: item.remainingCorpus,
          totalWithdrawal: item.withdrawalAmount,
          withdrawals: 1
        });
      } else {
        const yearData = yearMap.get(year);
        yearData.remainingCorpus = item.remainingCorpus; // Take the latest corpus value
        yearData.totalWithdrawal += item.withdrawalAmount;
        yearData.withdrawals += 1;
      }
    });
    
    return Array.from(yearMap.values());
  }, [withdrawalData]);
  
  // Calculate cumulative withdrawals
  const cumulativeData = useMemo(() => {
    let cumulativeWithdrawal = 0;
    
    return yearlyData.map(year => ({
      year: year.year,
      remainingCorpus: year.remainingCorpus,
      yearlyWithdrawal: year.totalWithdrawal,
      cumulativeWithdrawal: (cumulativeWithdrawal += year.totalWithdrawal)
    }));
  }, [yearlyData]);
  
  // Get label for frequency
  const frequencyLabel = useMemo(() => {
    switch (frequency) {
      case 'monthly': return 'Monthly';
      case 'quarterly': return 'Quarterly';
      case 'half-yearly': return 'Half-Yearly';
      case 'yearly': return 'Yearly';
      default: return 'Regular';
    }
  }, [frequency]);
  
  return (
    <Tabs defaultValue="area">
      <TabsList className="mb-4">
        <TabsTrigger value="area">Corpus Over Time</TabsTrigger>
        <TabsTrigger value="bar">Yearly Withdrawals</TabsTrigger>
        <TabsTrigger value="cumulative">Cumulative View</TabsTrigger>
      </TabsList>
      
      <TabsContent value="area" className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={yearlyData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="year" 
              label={{ value: 'Years', position: 'insideBottomRight', offset: -10 }}
            />
            <YAxis 
              tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`}
              label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="remainingCorpus" 
              name="Remaining Corpus" 
              stroke="#245e4f" 
              fill="#245e4f" 
              fillOpacity={0.3} 
            />
            <Area 
              type="monotone" 
              dataKey="totalWithdrawal" 
              name={`${frequencyLabel} Withdrawals`} 
              stroke="#7ac9a7" 
              fill="#7ac9a7" 
              fillOpacity={0.3} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </TabsContent>
      
      <TabsContent value="bar" className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={yearlyData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="year" 
              label={{ value: 'Years', position: 'insideBottomRight', offset: -10 }}
            />
            <YAxis 
              tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`}
              label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={(value: number) => [formatInIndianRupees(value), '']}
              labelFormatter={(label) => `Year ${label}`}
            />
            <Legend />
            <Bar 
              dataKey="totalWithdrawal" 
              name={`${frequencyLabel} Withdrawals`} 
              fill="#e9c46a" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </TabsContent>
      
      <TabsContent value="cumulative" className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={cumulativeData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="year" 
              label={{ value: 'Years', position: 'insideBottomRight', offset: -10 }}
            />
            <YAxis 
              tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`}
              label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={(value: number) => [formatInIndianRupees(value), '']}
              labelFormatter={(label) => `Year ${label}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="remainingCorpus" 
              name="Remaining Corpus" 
              stroke="#245e4f" 
              dot={{ r: 2 }} 
            />
            <Line 
              type="monotone" 
              dataKey="cumulativeWithdrawal" 
              name="Total Withdrawals" 
              stroke="#4a8fe7" 
              dot={{ r: 2 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>
    </Tabs>
  );
};

export default SWPChart;
