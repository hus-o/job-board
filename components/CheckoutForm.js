import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import axios from "axios"
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; // Add css for snow theme

export default function CheckoutForm() {
  const modules = {
    toolbar: [
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ["link"]
    ],
  };
  const placeholder = 'Add everything regarding job description, role, benefits here';
  const { quill, quillRef } = useQuill({ modules, placeholder });
  const [companyName, setCompanyName] = useState("")
  const [companySite, setCompanySite] = useState("")
  const [positionName, setPositionName] = useState("")
  const [location, setLocation] = useState("")
  const [salaryMin, setSalaryMin] = useState(0)
  const [salaryMax, setSalaryMax] = useState(0)
  const [applyLink, setApplyLink] = useState("")
  const [applyEmail, setApplyEmail] = useState("")
  const [isLogoChecked, setIsLogoChecked] = useState(false)
  const [isFeatureWeekChecked, setIsFeatureWeekChecked] = useState(false)
  const [isFeatureMonthChecked, setIsFeatureMonthChecked] = useState(false)
  const [isAddTimeChecked, setIsAddTimeChecked] = useState(false)

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const delta = quill.getContents()
    const jobDescriptionHTML = quill.root.innerHTML;
    //console.log(delta)
    //console.log(jobDescriptionHTML)
    // send the quill stuff with other form data to endpoint
    // there after status: success of stripe, commit to db

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    })

    if (!error){
      const {id} = paymentMethod
      console.log(paymentMethod)

      try {
        const data = axios.post("/api/form-handler", {id, amount: 15000})
      } catch (error) {
        console.log(error)
      }
    }
  }
  
  
  return(
    
    <form onSubmit={handleSubmit}>
            <div>
                Standard Post
                (£50)
                <ul>
                    <li>Expires after a month</li>
                    <li>No company logo</li>
                </ul>
            </div>
            <div>
                <input type="checkbox" name="logo-checkbox" className="add-on-checkboxes"
                                              checked={isLogoChecked} onChange={((e) => setIsLogoChecked(e.target.checked))} />
                <label htmlFor="logo-checkbox">Add your company logo (+ £50)</label>
            </div>
            <div>
                <input type="checkbox" name="featureweek-checkbox" className="add-on-checkboxes" 
                                              checked={isFeatureWeekChecked} onChange={((e) => setIsFeatureWeekChecked(e.target.checked))} />
                <label htmlFor="featureweek-checkbox">Your post will be in the featured section for a week (+ £50)</label>
            </div>
            <div>
                <input type="checkbox" name="featuremonth-checkbox" className="add-on-checkboxes" 
                                              checked={isFeatureMonthChecked} onChange={((e) => setIsFeatureMonthChecked(e.target.checked))}/>
                <label htmlFor="featuremonth-checkbox">Your post will be in the featured section for a month (+ £170)</label>
            </div>
            <div>
                <input type="checkbox" name="addtime-checkbox" className="add-on-checkboxes" 
                                              checked={isAddTimeChecked} onChange={((e) => setIsAddTimeChecked(e.target.checked))}/>
                <label htmlFor="addtime-checkbox">Your post will be available for an addition month (+ £100)</label>
            </div>


            {/* Image Upload */}
            <label htmlFor="company-name">Comapny Name</label>
            <input type="text" name="company-name" placeholder="e.g. Google" value={companyName} 
                                            onChange={((e) => setCompanyName(e.target.value))} />
            
            <label htmlFor="company-site">Company Name</label>
            <input type="text" name="company-site" placeholder="e.g. Google.com" value={companySite} 
                                            onChange={((e) => setCompanySite(e.target.value))} />

            <label htmlFor="position-name">Company Name</label>
            <input type="text" name="position-name" placeholder="e.g. Junior Software Engineer" value={positionName} 
                                            onChange={((e) => setPositionName(e.target.value))} />

            <label htmlFor="location">Where is the job based?</label>
            <input type="text" name="location" placeholder="e.g. London, Remote" value={location} 
                                            onChange={((e) => setLocation(e.target.value))} />
            
            <div>
                Salary (£): 
            <label htmlFor="salary-min">Min</label>
            <input type="number" name="salary-min" placeholder="e.g. 30000" value={salaryMin} 
                                            onChange={((e) => setSalaryMin(e.target.value))} />
                                            to
            <label htmlFor="salary-max">Max</label>
            <input type="number" name="salary-max" placeholder="e.g. 40000" value={salaryMax} 
                                            onChange={((e) => setSalaryMax(e.target.value))} />
            </div>
            <div name="job-description">
                <div ref={quillRef} />
            </div>
            <label htmlFor="apply-link">Add the link to your application</label>
            <input type="url" name="apply-link" placeholder="e.g. yoursite.com/careers" value={applyLink}
                                            onChange={((e) => setApplyLink(e.target.value))} />

            <span>Alternatively provide an email for applicants, include any specific details in the job editor above</span>
            <input type="email" name="apply-email" placeholder="careers@company.com" value={applyEmail}
                                            onChange={((e) => setApplyEmail(e.target.value))}/>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  )
}