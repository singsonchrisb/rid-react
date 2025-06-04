import React, { useState } from 'react';
import './styles.css';

const styleTab ={
  marginLeft:'40px'
}

const faqData = [
  { num:9, question: 'Can I cancel my application for an Online Police Clearance?', answer: "Cancellation policies vary by police department. Generally, once the application and payment are submitted, it cannot be canceled. It is recommended to check the specific cancellation policy on the department's website." },
  { num:10,question: 'What should I do if I lose my Police Clearance Certificate?', answer: 'If you lose your Police Clearance Certificate, you should contact the issuing authority for assistance. You may be required to submit a request for a duplicate certificate and pay a reissuance fee.' },
  { num:12,question: 'Can I get a refund if my application is rejected?', answer: 'Refund policies differ by police department. Generally, fees are non-refundable if the application is rejected. It is advisable to review the refund policy before applying.'},
  { num:13,question: 'What should I do if I have a criminal record?', answer: 'If you have a criminal record, it will be reflected in your Police Clearance Certificate. The details of the offenses will be included, and it is recommended to provide additional documentation or explanation if needed for your application purpose.' },
  { num:14,question: 'Can I expedite my Police Clearance application?', answer: 'Some police departments offer expedited processing for an additional fee. Check the official website or contact the department directly to inquire about expedited services and associated costs.' },
  { num:15,question: 'Do I need to provide biometric information for the clearance?', answer: 'Some police departments may require biometric information, such as fingerprints, for processing the Police Clearance Certificate. Check the specific requirements of your local police department.' }
];

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main id='main'>
        <div className="wrapper">
          {/* <p>Your Window to Effortless Ticketing</p> */}
          <p>Empowering Insight, Driving Innovation: Regional Intelligence Division Software</p>
          <h1>Frequently Asked Questions</h1>

          
          <div className="faq">
            <button className={`accordion ${activeIndex === 0 ? 'active' : ''}`} onClick={() => toggleAccordion(0)}>
              What is an Online Regional Intelligence Division Clearance?
              <i className="fa-solid fa-chevron-down"></i>
            </button>
            <div className={`panel ${activeIndex === 0 ? 'active' : ''}`}>
              <p>
              An Online Regional Intelligence Division Clearance is a digital version of a background check provided by the RID department. 
              It certifies that an individual has no criminal records or lists any offenses committed within a specific period.
              </p>
            </div>
          </div>

          {/* <div className="faq">
            <button className={`accordion ${activeIndex === 1 ? 'active' : ''}`} onClick={() => toggleAccordion(1)}>
            How do I apply for an Online Regional Intelligence Division?
              <i className="fa-solid fa-chevron-down"></i>
            </button>
            <div className={`panel ${activeIndex === 1 ? 'active' : ''}`}>
              <p>There are various types of vessels, including:</p>
                  <p style={{marginLeft:'40px'}} >Cargo vessels: Designed to transport goods and merchandise.</p>
                  <p style={{marginLeft:'40px'}} >Passenger vessels: Intended for carrying people, such as ferries, cruise ships, and passenger boats.</p>
                  <p style={{marginLeft:'40px'}} >Naval vessels: Military ships used for defense, including aircraft carriers, submarines, and destroyers.</p>
                  <p style={{marginLeft:'40px'}} >Recreational vessels: Used for leisure activities, such as yachts, sailboats, and personal watercraft.</p>
                  <p style={{marginLeft:'40px'}} >Fishing vessels: Specifically designed for catching fish, such as trawlers, longliners, and fishing boats.</p>
              
            </div>
          </div> */}

          
          <div className="faq">
            <button className={`accordion ${activeIndex === 1 ? 'active' : ''}`} onClick={() => toggleAccordion(1)}>
            How do I apply for an Online Regional Intelligence Division Clearance?
              <i className="fa-solid fa-chevron-down"></i>
            </button>
            <div className={`panel ${activeIndex === 1 ? 'active' : ''}`}>
              <p>To apply for an Online Regional Intelligence Division Clearance, visit the official website of your local RID department, fill out the application form, upload the required documents, and pay the applicable fee. Once submitted, you will receive an acknowledgment receipt.
              </p>
            </div>
          </div>

          <div className="faq">
            <button className={`accordion ${activeIndex === 2 ? 'active' : ''}`} onClick={() => toggleAccordion(2)}>
            What documents are required for the application?
              <i className="fa-solid fa-chevron-down"></i>
            </button>
            <div className={`panel ${activeIndex === 2 ? 'active' : ''}`}>
              <p>The required documents typically include a valid government-issued ID (e.g., passport, driver's license), proof of address, recent passport-sized photographs, and any other documents specified by your local RID department.
               </p>
            </div>
          </div>

          <div className="faq">
            <button className={`accordion ${activeIndex === 4 ? 'active' : ''}`} onClick={() => toggleAccordion(4)}>
              How long does it take to process an Online Regional Intelligence Division Clearance?
              <i className="fa-solid fa-chevron-down"></i>
            </button>
            <div className={`panel ${activeIndex === 4 ? 'active' : ''}`}>
              <p> The processing time varies by region but generally takes between 5 to 15 business days. You will receive a notification via email or SMS once your clearance certificate is ready for download.
                </p>
            </div>
          </div>

          <div className="faq">
            <button className={`accordion ${activeIndex === 3 ? 'active' : ''}`} onClick={() => toggleAccordion(3)}>
              Can I track the status of my application?
              <i className="fa-solid fa-chevron-down"></i>
            </button>
            <div className={`panel ${activeIndex === 3 ? 'active' : ''}`}>
              <p>Yes, most RID departments provide an online tracking system where you can check the status of your application using the application reference number provided at the time of submission.
                </p>
            </div>
          </div>

          <div className="faq">
            <button className={`accordion ${activeIndex === 5 ? 'active' : ''}`} onClick={() => toggleAccordion(5)}>
               Is there a fee for obtaining an Online Regional Intelligence Division Clearance?
              <i className="fa-solid fa-chevron-down"></i>
            </button>
            <div className={`panel ${activeIndex === 5 ? 'active' : ''}`}>
              <p>Yes, there is usually a fee for processing the Online Regional Intelligence Division Clearance. The amount varies depending on the region and the type of clearance required. Payment can typically be made online through various methods.
                </p>
            </div>
          </div>


          <div className="faq">
            <button className={`accordion ${activeIndex === 6 ? 'active' : ''}`} onClick={() => toggleAccordion(6)}>
              What if I find errors in my Regional Intelligence Division Clearance Certificate?
              <i className="fa-solid fa-chevron-down"></i>
            </button>
            <div className={`panel ${activeIndex === 6 ? 'active' : ''}`}>
              <p>If you find any errors in your Regional Intelligence Division Clearance Certificate, you should contact the issuing authority immediately. Provide the necessary details and documentation to request a correction.
                </p>
            </div>
          </div>


          <div className="faq">
            <button className={`accordion ${activeIndex === 7 ? 'active' : ''}`} onClick={() => toggleAccordion(7)}>
              Can I use the Online Regional Intelligence Division Clearance for international purposes?
              <i className="fa-solid fa-chevron-down"></i>
            </button>
            <div className={`panel ${activeIndex === 7 ? 'active' : ''}`}>
              <p>Yes, an Online Regional Intelligence Division Clearance can often be used for international purposes such as visa applications, employment, and education. However, you may need to get it authenticated or apostilled depending on the requirements of the foreign country.
                </p>
            </div>
          </div>


          <div className="faq">
            <button className={`accordion ${activeIndex === 8 ? 'active' : ''}`} onClick={() => toggleAccordion(8)}>
            How long is the Regional Intelligence Division Clearance Certificate valid?
              <i className="fa-solid fa-chevron-down"></i>
            </button>
              <div className={`panel ${activeIndex === 8 ? 'active' : ''}`}>
              <p>The validity period of a Regional Intelligence Division Clearance Certificate varies by country and purpose but is generally valid for six months to one year from the date of issue.
                </p>
            </div>
          </div>

          <div className="faq">
            <button className={`accordion ${activeIndex === 8 ? 'active' : ''}`} onClick={() => toggleAccordion(8)}>
                Can I apply for someone else’s Regional Intelligence Division Clearance on their behalf?
              <i className="fa-solid fa-chevron-down"></i>
            </button>
            <div className={`panel ${activeIndex === 8 ? 'active' : ''}`}>
              <p>This depends on the policies of the local Regional Intelligence Division department. Some regions allow you to apply on behalf of someone else with proper authorization and documentation, while others require the individual to apply in person.
                </p>
            </div>
          </div>

          <div >
            {faqData.map((item, index) => (
              <div key={index} className="faq">
                <button className={`accordion ${activeIndex === item.num ? 'active' : ''}`} onClick={() => toggleAccordion(item.num)}>
                  {item.question}
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
                <div className={`panel ${activeIndex === item.num ? 'active' : ''}`}>
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>









          {/* Add more FAQs here... */}

        </div>
    </main>
  );
}

export default FAQ;
