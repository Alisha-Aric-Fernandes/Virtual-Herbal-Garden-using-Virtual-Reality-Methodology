import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/privacy.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>Our Virtual Herbal Garden values your privacy and is committed to
             protecting your personal information. We collect user data, including login details, 
             saved bookmarks, and notes, to enhance your experience. Your interactions, such as viewing 
             plants and exploring the 360° VR tour may be used for personalized recommendations. We do not 
             sell or share your data with third parties, except for essential services like cloud storage and analytics. 
             Security measures, including encryption, are in place to safeguard your information. Users can manage or delete 
             their data at any time. By using our platform, you agree to our privacy practices.   </p>
         

        </div>
      </div>
    </Layout>
  );
};

export default Policy;