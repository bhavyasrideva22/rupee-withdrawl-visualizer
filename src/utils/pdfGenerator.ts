
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { formatInIndianRupees } from './currency';

// Define the interface for withdrawal data
export interface WithdrawalData {
  investedAmount: number;
  withdrawalAmount: number;
  expectedReturnRate: number;
  withdrawalFrequency: string;
  investmentDuration: number;
  finalCorpus: number;
  withdrawals: Array<{
    year: number;
    month?: number;
    withdrawalAmount: number;
    remainingCorpus: number;
  }>;
}

/**
 * Generates a PDF report for Systematic Withdrawal Plan
 * @param data - The withdrawal calculation data
 * @param userName - Optional user name for personalization
 * @param userEmail - Optional user email for reference
 */
export function generateSWPReport(
  data: WithdrawalData,
  userName?: string,
  userEmail?: string
): jsPDF {
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Add header with logo and title
  doc.setFillColor(36, 94, 79); // Primary color
  doc.rect(0, 0, 210, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text('Systematic Withdrawal Plan Report', 105, 15, { align: 'center' });
  
  // Add date
  const today = new Date();
  const dateString = today.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  doc.setFontSize(10);
  doc.text(`Generated on: ${dateString}`, 105, 25, { align: 'center' });
  
  // Reset text color for the rest of the document
  doc.setTextColor(51, 51, 51);
  
  // Add user information if provided
  let yPos = 40;
  if (userName || userEmail) {
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Prepared for:', 15, yPos);
    yPos += 7;
    doc.setFont(undefined, 'normal');
    if (userName) {
      doc.text(`Name: ${userName}`, 15, yPos);
      yPos += 7;
    }
    if (userEmail) {
      doc.text(`Email: ${userEmail}`, 15, yPos);
      yPos += 7;
    }
    yPos += 5;
  }
  
  // Add summary section
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Investment Summary', 15, yPos);
  yPos += 10;
  
  // Investment details table
  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  const summaryData = [
    ['Initial Investment Amount', formatInIndianRupees(data.investedAmount)],
    ['Withdrawal Amount', formatInIndianRupees(data.withdrawalAmount)],
    ['Expected Return Rate', `${data.expectedReturnRate}% per annum`],
    ['Withdrawal Frequency', data.withdrawalFrequency],
    ['Investment Duration', `${data.investmentDuration} years`],
    ['Final Corpus', formatInIndianRupees(data.finalCorpus)]
  ];
  
  // @ts-ignore jspdf-autotable is not properly typed
  doc.autoTable({
    startY: yPos,
    head: [['Parameter', 'Value']],
    body: summaryData,
    headStyles: { fillColor: [36, 94, 79], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [240, 240, 240] },
    margin: { left: 15, right: 15 }
  });
  
  // Get the last Y position after the table
  // @ts-ignore jspdf-autotable is not properly typed
  yPos = doc.lastAutoTable.finalY + 15;
  
  // Add withdrawal schedule section
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Withdrawal Schedule', 15, yPos);
  yPos += 10;
  
  // Prepare withdrawal schedule data
  const withdrawalRows = data.withdrawals.map(item => [
    `Year ${item.year}${item.month ? ` - Month ${item.month}` : ''}`,
    formatInIndianRupees(item.withdrawalAmount),
    formatInIndianRupees(item.remainingCorpus)
  ]);
  
  // Add withdrawal schedule table
  // @ts-ignore jspdf-autotable is not properly typed
  doc.autoTable({
    startY: yPos,
    head: [['Period', 'Withdrawal Amount', 'Remaining Corpus']],
    body: withdrawalRows,
    headStyles: { fillColor: [36, 94, 79], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [240, 240, 240] },
    margin: { left: 15, right: 15 },
    // If too many rows, create new pages as needed
    didDrawPage: (data) => {
      // Add header to each new page
      if (data.pageCount > 1) {
        doc.setFillColor(36, 94, 79);
        doc.rect(0, 0, 210, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.text('Systematic Withdrawal Plan Report - Continued', 105, 10, { align: 'center' });
        doc.setTextColor(51, 51, 51);
      }
    }
  });
  
  // Add footer with disclaimer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Disclaimer: This is a projection based on the information provided and assumed constant returns. Actual returns may vary.', 105, 285, { align: 'center' });
    doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
  }
  
  return doc;
}
