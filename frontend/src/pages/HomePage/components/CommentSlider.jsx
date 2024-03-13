import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Fade, Zoom, Slide } from "react-slideshow-image";

const commentSlider = [
  {
    avatar: "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/391627726_2229687603896740_6420573741491573149_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=1_0Zwt7lWucAX-kqBut&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfAN32nHcgak9qHuHqVWeZ_aLNoN1qn1WSPbY6b_R7tSyA&oe=65F704DD",
    nameUserComment: "HungDinh",
    roleUserComment: "Content Creater",
    description: "Wow, this dish looks absolutely mouthwatering! The vibrant colors and textures are making my taste buds dance with anticipation. The combination of fresh ingredients, skillful preparation, and beautiful presentation is truly impressive. From the succulent grilled chicken to the perfectly roasted vegetables, every element seems to have been carefully crafted with love and attention to detail.",
  },
  {
    avatar: "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/361863356_2136707683389177_4127568195788575650_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=x7Bi-croxLkAX-dwQir&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfDCMQlUapCAHYJNuozd7HSmQGMyXifp_Yn9Fz76X0XoFQ&oe=65F6959F",
    nameUserComment: "Luong Trung",
    roleUserComment: "Food Reviewer",
    description: "I can imagine the explosion of flavors as I take the first bite – the tender chicken infused with aromatic herbs, the sweetness of caramelized onions, and the slight char from the grill imparting that irresistible smokiness. Paired with the creamy mashed potatoes and drizzled with a rich savory sauce, this dish is a symphony of taste sensations.",
  },
  {
    avatar: "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/429949504_955184519296597_9115556556751807744_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Bdel-aza6cMAX-DPles&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfD39lbd-LnzQpVSi4Q4PKFSYz9VKCAG6ir0aP2tzCEVJQ&oe=65F7215D",
    nameUserComment: "Bich Phuong",
    roleUserComment: "Singer",
    description: "The chef's creativity shines through in every aspect of this culinary masterpiece. It's not just a meal; it's an experience. I can't wait to recreate this recipe at home and share it with my loved ones. Thank you for inspiring me with your culinary artistry!",
  },
];

const divStyle = {
  zindex: "1",
  // marginTop:"-50px",
  // display:'flex',
  // alignItems:"center",
  // justifyContent: "center",
  height: "600px",
  // backgroundSize:'cover'
};

function CommentSlider() {
  return (
    <div className="Slide-container">
      <Fade autoplay={true} duration={3000}>
        {commentSlider.map((commentSlider, index) => (
          <div className="single-testimonial-slider" index={index}>
            <div className="client-avater">
              <img src={commentSlider.avatar} />
            </div>
            <div className="client-meta">
              <h3>
                {commentSlider.nameUserComment} <span>{commentSlider.roleUserComment}</span>
              </h3>
              <p className="testimonial-body">
                {commentSlider.description}
              </p>
              <div className="last-icon">
                <i className="fas fa-quote-right"></i>
              </div>
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
}

export default CommentSlider;
