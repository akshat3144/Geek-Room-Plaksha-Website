import { useRef } from "react";
import Xarrow from "react-xarrows";
import { useTheme } from "styled-components";

import Typography from "../typography/Typography";
import {
  Container,
  OfferCard,
  OfferInfo,
  OfferLogo,
  OffersContainer,
  Title
} from "./OfferSection.styled";
import BookSvg from "@icons/book1.svg";
import CubeSvg from "@icons/i3dcubescan.svg";
import MessageSvg from "@icons/messageprogramming.svg";
import ContentSvg from "@icons/content.svg";
import RobotSvg from "@icons/robot.svg";

function OfferSection({ isMobile }) {
  const theme = useTheme();
  const Logo1ref = useRef();
  const Logo2ref = useRef();
  const Logo3ref = useRef();
  const Logo4ref = useRef();
  const Logo5ref = useRef();

  return (
    <Container>
      <div style={isMobile ? { paddingLeft: "20px" } : {}}>
        <Title>
          <Typography variant="h1">Our Dynamic Team Structure</Typography>
        </Title>
      </div>
      <OffersContainer>
        <OfferCard>
          <OfferLogo
            bgcolor={["#EA4335", "#FF6B6B"]}
            rgb="255, 107, 107"
            delay={0}
            ref={Logo1ref}
          >
            <CubeSvg />
          </OfferLogo>
          <OfferInfo>
            <Typography variant="h3">Tech</Typography>
            <Typography variant="bodySmall">
              Our Tech team is divided into DSA, Development, AI-ML, and
              Emerging Tech subdivisions, each focusing on innovative projects
              that benefit the community and advance technical skills.
            </Typography>
          </OfferInfo>
        </OfferCard>
        <OfferCard
          style={
            !isMobile ? { alignSelf: "flex-end", justifyContent: "right" } : {}
          }
        >
          <OfferLogo
            bgcolor={["#FBBC04", "#FFD54F"]}
            rgb="255, 213, 79"
            delay={1000}
            ref={Logo2ref}
          >
            <ContentSvg width="50" height="50" />
          </OfferLogo>
          <OfferInfo>
            <Typography variant="h3">Content</Typography>
            <Typography variant="bodySmall">
              The Content team produces engaging blogs, newsletters, and video
              content that keeps our community informed and inspired, sharing
              insights on the latest trends and developments.
            </Typography>
          </OfferInfo>
        </OfferCard>
        <OfferCard>
          <OfferLogo
            bgcolor={["#0F9D58", "#64D8CB"]}
            rgb="100, 216, 203"
            delay={1500}
            ref={Logo3ref}
          >
            <MessageSvg />
          </OfferLogo>
          <OfferInfo>
            <Typography variant="h3">Marketing & Design</Typography>
            <Typography variant="bodySmall">
              The Marketing & Design team creates visually compelling campaigns,
              promotes our initiatives, and ensures our message resonates with a
              wide audience.
            </Typography>
          </OfferInfo>
        </OfferCard>
        <OfferCard
          style={
            !isMobile ? { alignSelf: "flex-end", justifyContent: "right" } : {}
          }
        >
          <OfferLogo
            bgcolor={["#FF5722", "#FF8A65"]}
            rgb="255, 138, 101"
            delay={2000}
            ref={Logo4ref}
          >
            <RobotSvg />
          </OfferLogo>
          <OfferInfo>
            <Typography variant="h3">Robotics</Typography>
            <Typography variant="bodySmall">
              The Robotics team empowers members to design, build, and program
              robots through engaging projects and interactive workshops. With a
              focus on innovation and collaboration, the team aims to promote
              robotics at Plaksha by providing practical, hands-on experience.
            </Typography>
          </OfferInfo>
        </OfferCard>
        <OfferCard>
          <OfferLogo
            bgcolor={["#4285F4", "#6FA1FF"]}
            rgb="111, 168, 255"
            delay={2500}
            ref={Logo5ref}
          >
            <BookSvg />
          </OfferLogo>
          <OfferInfo>
            <Typography variant="h3">Research</Typography>
            <Typography variant="bodySmall">
              The Research team promotes a strong research culture at Plaksha,
              offering a space for students to learn research methodologies and
              conduct meaningful studies.
            </Typography>
          </OfferInfo>
        </OfferCard>
      </OffersContainer>
      <Xarrow
        startAnchor={"middle"}
        endAnchor={"middle"}
        start={Logo1ref}
        end={Logo2ref}
        lineColor={theme?.colors.bgTertiary}
        showHead={false}
        curveness={0}
        zIndex={-1}
      />
      <Xarrow
        startAnchor={"middle"}
        endAnchor={"middle"}
        start={Logo2ref}
        end={Logo3ref}
        lineColor={theme?.colors.bgTertiary}
        showHead={false}
        curveness={0}
        zIndex={-1}
      />
      <Xarrow
        startAnchor={"middle"}
        endAnchor={"middle"}
        start={Logo3ref}
        end={Logo4ref}
        lineColor={theme?.colors.bgTertiary}
        showHead={false}
        curveness={0}
        zIndex={-1}
      />
      <Xarrow
        startAnchor={"middle"}
        endAnchor={"middle"}
        start={Logo4ref}
        end={Logo5ref}
        lineColor={theme?.colors.bgTertiary}
        showHead={false}
        curveness={0}
        zIndex={-1}
      />
    </Container>
  );
}

export default OfferSection;
