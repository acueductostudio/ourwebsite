import styled from "styled-components";
import { Fade } from "react-awesome-reveal";
import Image from "next/image";

const Header = ({ slug, title }) => (
  <Fade triggerOnce>
    <Pos>
      <Image
        height="600"
        width="1500"
        priority
        src={`/assets/img/articles/${slug}/header.svg`}
        alt={title}
      />
      <Fader />
    </Pos>
  </Fade>
);

export default Header;

const Pos = styled.div`
  position: relative;
  div img {
    object-fit: cover;
  }
  height: 600px;
  @media (max-width: 1250px) {
    height: 500px;
  }
  @media (max-width: 900px) {
    height: 400px;
  }
  @media (max-width: 700px) {
    height: 300px;
  }
  @media (max-width: 600px) {
    height: 200px;
  }
`;

const Fader = styled.div`
  width: 100%;
  height: 30%;
  display: block;
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    0deg,
    rgba(8, 12, 12, 1) 30%,
    rgba(8, 12, 12, 0) 100%
  );
`;
