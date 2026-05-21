require("dotenv").config();
const axios = require("axios");

const leadData = {
  name: "Test Name",
  email: "test@example.com",
  contact_number: "+91-7988608389", // Same phone number from the log
  location: "Test Location Update",
  course_in_mind: "Test Course Update",
  college_name: "Test College Update",
  Source: "Website",
  SourceCampaign: "Learntech Website",
};

let dataobj = [
  {
    Attribute: "FirstName",
    Value: leadData.name,
  },
  {
    Attribute: "Phone",
    Value: leadData.contact_number,
  },
  {
    Attribute: "EmailAddress",
    Value: leadData.email,
  },
  {
    Attribute: "mx_State",
    Value: leadData.location,
  },
  {
    Attribute: "mx_Interested_Course",
    Value: leadData.course_in_mind,
  },
  {
    Attribute: "mx_Interested_College",
    Value: leadData.college_name,
  },
  {
    Attribute: "Source",
    Value: leadData.Source,
  },
  {
    Attribute: "SourceCampaign",
    Value: leadData.SourceCampaign,
  },
  {
    Attribute: "SearchBy",
    Value: "Phone",
  }
];

const headers = {
  "Content-Type": "application/json",
};
const params = {
  accessKey: process.env.CRM_Access_Key,
  secretKey: process.env.CRM_Secret_Key,
};
const captureUrl =
  "https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.CreateOrUpdate";

axios.post(captureUrl, dataobj, {
  headers: headers,
  params: params,
})
.then(response => {
  console.log("Success response status:", response.status);
  console.log("Success response data:", response.data);
})
.catch(error => {
  console.error("Error response:", error.response ? error.response.data : error.message);
});
