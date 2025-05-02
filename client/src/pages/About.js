import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Virtual Herbal Garden"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/students.webp"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          At <b>Virtual Herbal Garden</b>, we bring the world of medicinal plants to life through an <b>immersive </b>Virtual Herbal Garden powered by <b>Virtual Reality (VR)</b>. Designed for students, researchers, and nature enthusiasts, our platform offers interactive <b>3D models of medicinal plants</b>, allowing users to explore their botanical details, medicinal benefits, and cultivation insights. With <b>features </b>like <b>search, filtering,  and bookmarking</b>, we make learning about herbal medicine engaging and accessible. Our mission is to blend technology with traditional knowledge, fostering a deeper understanding of nature’s healing power.

<b>Start exploring and uncover the wonders of the plant world with us!</b>
</p>
        </div>
      </div>
    </Layout>
  );
};


Layout.defaultProps={
  title:'Virtual Herbal Garden',
  description:'mern stack project',
  keywords:'mern,react,mongodb,node',
  author:'Alisha',
}
export default About;