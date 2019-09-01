import styled from "styled-components";
import createMarkup from "../../helpers/createMarkup";
import Fade from "react-reveal/Fade";
import Arrow from "../../static/assets/img/layout/arrow.svg";
import Link from "next/link";

//var otherProyects = Object.entries(proyects).map(function(_proyect, index) {

const SingleCase = props => {
  console.log(props.logo)
  return (
    <Case>
      <Link href={"work" + props.link} passHref>
        <a>
          <VidContainer>
            {/* <Logo style={{backgroundImage : `url(static/assets/img/casestudies/${props.logo})`}}/> */}
            <Logo src={`static/assets/img/casestudies/${props.logo}`}/>
            <video
              autoPlay
              playsInline
              muted
              loop
              src={`../static/assets/img/casestudies/${props.video}`}
            />
          </VidContainer>
        </a>
      </Link>
      <Info>
        <h4>{props.title}</h4>
        <Flexed>
          <p dangerouslySetInnerHTML={createMarkup(props.tags)} />
          <Link href={"work" + props.link} passHref>
            <a>
              <Arrow />
            </a>
          </Link>
        </Flexed>
      </Info>
    </Case>
  );
};

const CaseList = props => {
  let c = props.c;

  let cases = Object.entries(c).map(function(study, index) {
    study = study[1];
    if (props.limit !== undefined && index + 1 > props.limit) {
      return;
    } else {
      return (
        <SingleCase
          key={"case" + index}
          title={study.title}
          tags={study.tags}
          link={study.link}
          video={study.video}
          logo={study.logo}
        />
      );
    }
  });
  return <CaseStudiesWrapper>{cases}</CaseStudiesWrapper>;
};

export default CaseList;

const Logo = styled.img`
    width: 70%;
    transform: translateZ(1px) translateY(-50%);
    align-self: center;
    justify-self: center;
    display: flex;
    position: absolute;
    z-index: 1;
    top: 50%;
`;

const Flexed = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  a {
    justify-content: flex-end;
    display: flex;
  }
`;

const Info = styled.div`
  padding: 10%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  h4 {
    font-size: 4.5rem;
    font-weight: 200;
  }
  p {
    color: ${props => props.theme.colors.foreground_low};
  }
  svg {
    align-self: flex-end;
    width: 50px;
    height: 40px;
    fill: none;
    stroke: ${props => props.theme.colors.foreground};
    stroke-width: ${props => props.theme.stroke};
  }
`;

const VidContainer = styled.div`
    margin: 10%;
    background-color: ${props => props.theme.colors.accent};
    width: 80%;
    height: 0;
    padding-bottom: 80%;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
  video {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width:100%;
  }
`;

const Case = styled.div`
  display: grid;
  border-top: ${props =>
    props.theme.stroke + " solid " + props.theme.colors.foreground_lowest};
  grid-template-columns: repeat(2, 1fr);
`;

const CaseStudiesWrapper = styled.section`
  color: ${props => props.theme.colors.foreground};
  background-color: ${props => props.theme.colors.background};
`;
