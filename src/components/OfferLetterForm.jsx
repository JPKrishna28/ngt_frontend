import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import html2pdf from 'html2pdf.js';
import emailjs from 'emailjs-com';
import OfferLetterTemplate from './OfferLetterTemplate';
import api from '../api/axios';

const OfferLetterForm = ({ employee, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const templateRef = useRef(null);
  
  // Company info (could come from context or env vars)
  const companyInfo = {
    name: 'Acme Corporation',
    address: '123 Business Ave, Suite 100, New York, NY 10001',
    phone: '(555) 123-4567',
    email: 'hr@acmecorp.com',
    logo: '/logo.png'
  };
  
  // Form state
  const [offerData, setOfferData] = useState({
    position: '',
    startDate: '',
    salary: '',
    paymentFrequency: 'bi-weekly',
    bonus: '',
    reportingManager: '',
    reportingManagerTitle: '',
    signatoryName: '',
    signatoryTitle: '',
    offerValidUntil: '',
    benefits: ['Health insurance', 'Dental coverage', 'Vision coverage', '401(k) with company match', 'Paid time off'],
    contingencies: ['Background check', 'Reference verification'],
    recipientEmail: employee.email || '',
    emailSubject: `Job Offer from ${companyInfo.name}`,
    emailMessage: `Dear ${employee.name},\n\nWe are pleased to offer you a position at ${companyInfo.name}. Please find attached your offer letter with all the details.\n\nPlease review, sign and return at your earliest convenience.\n\nBest regards,\nHR Team\n${companyInfo.name}`
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfferData({
      ...offerData,
      [name]: value
    });
  };
  
  const handleBenefitChange = (index, value) => {
    const updatedBenefits = [...offerData.benefits];
    updatedBenefits[index] = value;
    setOfferData({
      ...offerData,
      benefits: updatedBenefits
    });
  };
  
  const addBenefit = () => {
    setOfferData({
      ...offerData,
      benefits: [...offerData.benefits, '']
    });
  };
  
  const removeBenefit = (index) => {
    const updatedBenefits = offerData.benefits.filter((_, i) => i !== index);
    setOfferData({
      ...offerData,
      benefits: updatedBenefits
    });
  };
  
  const handleContingencyChange = (index, value) => {
    const updatedContingencies = [...offerData.contingencies];
    updatedContingencies[index] = value;
    setOfferData({
      ...offerData,
      contingencies: updatedContingencies
    });
  };
  
  const addContingency = () => {
    setOfferData({
      ...offerData,
      contingencies: [...offerData.contingencies, '']
    });
  };
  
  const removeContingency = (index) => {
    const updatedContingencies = offerData.contingencies.filter((_, i) => i !== index);
    setOfferData({
      ...offerData,
      contingencies: updatedContingencies
    });
  };
  
  const validateForm = () => {
    const requiredFields = [
      'position', 'startDate', 'salary', 'reportingManager', 
      'signatoryName', 'signatoryTitle', 'offerValidUntil', 'recipientEmail'
    ];
    
    for (const field of requiredFields) {
      if (!offerData[field]) {
        toast.error(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
        return false;
      }
    }
    
    if (!offerData.benefits.every(benefit => benefit.trim())) {
      toast.error('Please fill in all benefits or remove empty ones');
      return false;
    }
    
    if (!offerData.contingencies.every(contingency => contingency.trim())) {
      toast.error('Please fill in all contingencies or remove empty ones');
      return false;
    }
    
    return true;
  };
  
  const handlePreview = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Update form data to correct formats
    setOfferData({
      ...offerData,
      salary: parseFloat(offerData.salary),
      bonus: offerData.bonus ? parseFloat(offerData.bonus) : null
    });
    
    setShowPreview(true);
  };
  
  const handleSendEmail = async () => {
  try {
    setIsLoading(true);

    // Generate PDF - adjust options to reduce file size
    const element = templateRef.current;
    const opt = {
      margin: 10,
      filename: `${employee.name.replace(/\s+/g, '_')}_Offer_Letter.pdf`,
      image: { type: 'jpeg', quality: 0.7 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    // Save the PDF to a temporary location
    const pdfBlob = await html2pdf().from(element).set(opt).outputPdf('blob');

    // Convert the Blob to a file for uploading
    const formData = new FormData();
    formData.append(
      'file',
      new File([pdfBlob], `${employee.name.replace(/\s+/g, '_')}_Offer_Letter.pdf`),
    );

    // Simulate saving the file to the server
    const uploadRes = await fetch(`${import.meta.env.VITE_API_URL}/api/files/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!uploadRes.ok) {
  const errorText = await uploadRes.text();
  throw new Error(`File upload failed: ${errorText}`);
}


    const { filePath } = await uploadRes.json();

    // Call the backend to send the email
    const emailRes = await api.post('api/email/send-offer-letter', {
      to: offerData.recipientEmail,
      subject: offerData.emailSubject,
      text: offerData.emailMessage,
      attachmentPath: filePath, // Path returned from the upload API
    });

    toast.success(emailRes.data.message);
    setEmailSent(true);
  } catch (error) {
    console.error('Error sending offer letter:', error);
    toast.error('Failed to send offer letter. Please try again.');
  } finally {
    setIsLoading(false);
  }
};
  const handleDownload = () => {
    const element = templateRef.current;
    const opt = {
      margin: 10,
      filename: `${employee.name.replace(/\s+/g, '_')}_Offer_Letter.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().from(element).set(opt).save();
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {!showPreview ? (
        // Offer letter form
        <form onSubmit={handlePreview} className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Generate Offer Letter for {employee.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Position Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Position Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Position Title</label>
                <input
                  type="text"
                  name="position"
                  value={offerData.position}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={offerData.startDate}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Annual Salary ($)</label>
                <input
                  type="number"
                  name="salary"
                  value={offerData.salary}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Frequency</label>
                <select
                  name="paymentFrequency"
                  value={offerData.paymentFrequency}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-Weekly</option>
                  <option value="semi-monthly">Semi-Monthly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Bonus (% of salary, optional)</label>
                <input
                  type="number"
                  name="bonus"
                  value={offerData.bonus}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            {/* Management Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Reporting Structure</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Reporting Manager</label>
                <input
                  type="text"
                  name="reportingManager"
                  value={offerData.reportingManager}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Reporting Manager Title</label>
                <input
                  type="text"
                  name="reportingManagerTitle"
                  value={offerData.reportingManagerTitle}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Offer Letter Signatory</label>
                <input
                  type="text"
                  name="signatoryName"
                  value={offerData.signatoryName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Signatory Title</label>
                <input
                  type="text"
                  name="signatoryTitle"
                  value={offerData.signatoryTitle}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Offer Valid Until</label>
                <input
                  type="date"
                  name="offerValidUntil"
                  value={offerData.offerValidUntil}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Benefits Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Benefits</h3>
            
            {offerData.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => handleBenefitChange(index, e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeBenefit(index)}
                  className="ml-2 inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addBenefit}
              className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Benefit
            </button>
          </div>
          
          {/* Contingencies Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Contingencies</h3>
            
            {offerData.contingencies.map((contingency, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={contingency}
                  onChange={(e) => handleContingencyChange(index, e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeContingency(index)}
                  className="ml-2 inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addContingency}
              className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Contingency
            </button>
          </div>
          
          {/* Email Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Email Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Recipient Email</label>
                <input
                  type="email"
                  name="recipientEmail"
                  value={offerData.recipientEmail}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Subject</label>
                <input
                  type="text"
                  name="emailSubject"
                  value={offerData.emailSubject}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Message</label>
                <textarea
                  name="emailMessage"
                  value={offerData.emailMessage}
                  onChange={handleChange}
                  rows={5}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Submit Buttons */}
          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Preview Offer Letter
            </button>
          </div>
        </form>
      ) : (
        // Preview and send section
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 bg-gray-50 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Offer Letter Preview</h2>
              
              <div className="flex space-x-3">
                {!emailSent ? (
                  <>
                    <button
                      onClick={handleDownload}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      disabled={isLoading}
                    >
                      Download PDF
                    </button>
                    
                    <button
                      onClick={handleSendEmail}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Sending...' : 'Send Offer Letter'}
                    </button>
                    
                    <button
                      onClick={() => setShowPreview(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      disabled={isLoading}
                    >
                      Edit
                    </button>
                  </>
                ) : (
                  <button
                    onClick={onClose}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
            
            {emailSent && (
              <div className="mt-4 p-4 bg-green-50 text-green-800 rounded-md border border-green-200">
                <p className="font-medium">Offer letter has been sent successfully!</p>
                <p className="text-sm mt-1">A copy has been sent to {offerData.recipientEmail}</p>
              </div>
            )}
          </div>
          
          <div className="p-6 overflow-auto max-h-[70vh] border border-gray-200 m-4 rounded-lg">
            <div ref={templateRef}>
              <OfferLetterTemplate 
                employee={employee} 
                offerData={offerData} 
                companyInfo={companyInfo} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferLetterForm;