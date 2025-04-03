
import { WithdrawalData } from './pdfGenerator';

/**
 * Formats the SWP data as HTML for email
 * @param data - The withdrawal calculation data
 * @returns HTML string for email body
 */
export function formatSWPDataForEmail(data: WithdrawalData): string {
  // Create HTML content
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #245e4f;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .content {
          padding: 20px;
          background-color: #f9f9f9;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th, td {
          padding: 10px;
          border: 1px solid #ddd;
          text-align: left;
        }
        th {
          background-color: #245e4f;
          color: white;
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        .footer {
          font-size: 12px;
          color: #777;
          text-align: center;
          padding: 10px;
          border-top: 1px solid #ddd;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Your Systematic Withdrawal Plan Results</h1>
        </div>
        <div class="content">
          <p>Thank you for using our SWP Calculator. Below is a summary of your calculation:</p>
          
          <h2>Investment Parameters</h2>
          <table>
            <tr>
              <th>Parameter</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Initial Investment Amount</td>
              <td>₹${data.investedAmount.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td>Withdrawal Amount</td>
              <td>₹${data.withdrawalAmount.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td>Expected Return Rate</td>
              <td>${data.expectedReturnRate}% per annum</td>
            </tr>
            <tr>
              <td>Withdrawal Frequency</td>
              <td>${data.withdrawalFrequency}</td>
            </tr>
            <tr>
              <td>Investment Duration</td>
              <td>${data.investmentDuration} years</td>
            </tr>
            <tr>
              <td>Final Corpus</td>
              <td>₹${data.finalCorpus.toLocaleString('en-IN')}</td>
            </tr>
          </table>
          
          <p>We've attached a detailed PDF report to this email for your records.</p>
          <p>If you have any questions about these results, please don't hesitate to contact us.</p>
        </div>
        <div class="footer">
          <p>Disclaimer: This is a projection based on the information provided and assumed constant returns. Actual returns may vary.</p>
          <p>© ${new Date().getFullYear()} SWP Calculator</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return html;
}

/**
 * Simulates sending an email with SWP results
 * In a real application, this would connect to an email service provider
 * @param email - Recipient email address
 * @param data - The withdrawal calculation data
 * @param pdfAttachment - The PDF data to attach
 */
export function sendSWPEmail(
  email: string, 
  data: WithdrawalData,
  pdfAttachment: Blob
): Promise<boolean> {
  // In a real application, this would use an email API like SendGrid, Mailgun, etc.
  // For this demo, we'll just simulate success with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Email would be sent to ${email} with SWP data:`, data);
      console.log('PDF attachment size:', pdfAttachment.size, 'bytes');
      resolve(true);
    }, 1500);
  });
}
