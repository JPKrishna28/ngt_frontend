import React from 'react';
import { format } from 'date-fns';

const OfferLetterTemplate = ({ employee, offerData, companyInfo }) => {
  const currentDate = format(new Date(), 'MMMM dd, yyyy');
  
  return (
    <div id="offer-letter" className="p-8 max-w-[800px] mx-auto bg-white text-gray-800 font-serif">
      {/* Company Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{companyInfo.name}</h1>
        <p>{companyInfo.address}</p>
        <p>{companyInfo.phone} | {companyInfo.email}</p>
      </div>
      
      {/* Date */}
      <div className="mb-6">
        <p>{currentDate}</p>
      </div>
      
      {/* Recipient */}
      <div className="mb-6">
        <p>{employee.name}</p>
        <p>{employee.address || 'Address Not Provided'}</p>
      </div>
      
      {/* Subject */}
      <div className="mb-6">
        <p className="font-bold">Subject: Offer of Employment - {offerData.position}</p>
      </div>
      
      {/* Salutation */}
      <div className="mb-4">
        <p>Dear {employee.name},</p>
      </div>
      
      {/* Body */}
      <div className="mb-6 space-y-4">
        <p>
          We are pleased to offer you the position of <strong>{offerData.position}</strong> at {companyInfo.name}.
          We believe your skills and experience are an excellent match for our company.
        </p>
        
        <p>
          Your employment with us will commence on <strong>{format(new Date(offerData.startDate), 'MMMM dd, yyyy')}</strong>.
          You will be reporting to <strong>{offerData.reportingManager}</strong>, {offerData.reportingManagerTitle}.
        </p>
        
        <p>
          Your annual compensation will be <strong>${offerData.salary.toLocaleString()}</strong>, paid on a {offerData.paymentFrequency} basis.
          {offerData.bonus && 
            ` Additionally, you will be eligible for a bonus of up to ${offerData.bonus}% of your base salary based on individual and company performance.`
          }
        </p>
        
        <p>
          As an employee of {companyInfo.name}, you will be eligible for our benefits program, which includes:
        </p>
        
        <ul className="list-disc ml-8">
          {offerData.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
        
        <p>
          This offer is contingent upon:
        </p>
        
        <ul className="list-disc ml-8">
          <li>Signing our standard employment agreement and confidentiality agreement</li>
          <li>Verification of your identity and eligibility to work</li>
          {offerData.contingencies.map((contingency, index) => (
            <li key={index}>{contingency}</li>
          ))}
        </ul>
        
        <p>
          Please indicate your acceptance of this offer by signing and returning this letter by <strong>{format(new Date(offerData.offerValidUntil), 'MMMM dd, yyyy')}</strong>.
        </p>
        
        <p>
          We are excited about having you join our team and look forward to a successful professional relationship.
        </p>
      </div>
      
      {/* Closing */}
      <div className="mb-8">
        <p>Sincerely,</p>
        <p className="mt-4 font-bold">{offerData.signatoryName}</p>
        <p>{offerData.signatoryTitle}</p>
        <p>{companyInfo.name}</p>
      </div>
      
      {/* Acceptance */}
      <div className="mt-16 border-t pt-6">
        <p className="font-bold mb-4">Acceptance of Offer:</p>
        <p>I, {employee.name}, accept the offer of employment as described above.</p>
        
        <div className="mt-8 flex justify-between">
          <div>
            <p className="border-t border-gray-400 pt-2 w-48">Signature</p>
          </div>
          <div>
            <p className="border-t border-gray-400 pt-2 w-48">Date</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferLetterTemplate;