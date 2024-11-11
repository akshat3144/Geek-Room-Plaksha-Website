import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Xarrow, { Xwrapper } from "react-xarrows";

import {
  ActionsContainer,
  ApplyButton,
  ApplyNowContainer,
  BannerImageContainer,
  FAQButton,
  ProceduresContainer,
  ProcessCard,
  RegistrationPageContainer,
  TeamImageContainer,
  TitleContainer
} from "./RegistrationPage.styled";
import Typography from "../display/typography/Typography";
import ApplicationIcon from "@public/icons/application.svg";
import ClipboardIcon from "@public/icons/clipboard.svg";
import UserIcon from "@public/icons/user.svg";

const applicationData = {
  isOpen: false,
  link: ""
};

const RegistrationPage = () => {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();

  return (
    <RegistrationPageContainer style={{ paddingTop: "120px" }}>
      <TitleContainer>
        <Typography variant="displayLarge">Join our amazing Team</Typography>

        <Typography variant="body" className="descriptionText">
          {`If you're excited to learn and collaborate, don't wait.
          Apply now and embark on a journey of growth and opportunities!`}
        </Typography>
      </TitleContainer>
      <ApplyNowContainer>
        <Typography variant="h3" style={{ textAlign: "center" }}>
          What are you waiting for?
        </Typography>
        <ActionsContainer>
          <Link
            href={applicationData.link ? applicationData.link : "#"}
            target="_blank"
          >
            <ApplyButton disabled={!applicationData.isOpen}>
              {applicationData.isOpen
                ? "Apply Now"
                : "Applications are closed. Stay tuned"}
            </ApplyButton>
          </Link>
        </ActionsContainer>
      </ApplyNowContainer>
    </RegistrationPageContainer>
  );
};

export default RegistrationPage;
