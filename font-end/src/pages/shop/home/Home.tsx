import React from "react";
import { Carousel, Divider } from "antd";
import banner1 from "~/image/banner1.jpg";
import banner2 from "~/image/banner2.jpg";
import banner3 from "~/image/banner3.jpg";
import banner4 from "~/image/banner4.jpg";
const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const Home: React.FC = () => {
  return (
    <Carousel autoplay>
      <div>
        <img src={banner1} width="100%" height="620px" />
      </div>
      <div>
        <img src={banner2} width="100%" height="620px" />
      </div>
      <div>
        <img src={banner3} width="100%" height="620px" />
      </div>
      <div>
        <img src={banner4} width="100%" height="620px" />
      </div>
    </Carousel>
  );
};

export default Home;
