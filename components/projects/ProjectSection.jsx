import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "styled-components";
import Terminal from "./terminal/Terminal";

import {
  Button,
  Container,
  ProjectInfo,
  ProjectCard,
  ProjectCardContainer,
  TopContainer,
  ExploreButton,
  ImageContainer,
  TitleContainer,
  AuthorInfo,
  BottomContainer
} from "./ProjectSection.styled";
import Typography from "../display/typography/Typography";
import Avatar from "../avatar/Avatar";
import truncateText from "@/utils/truncate";
import isoToDate from "@/utils/isoToDate";

function ProjectSection({ isMobile }) {
  const limit = 200;

  const theme = useTheme();

  const ProjectsData = [
    {
      id: 1,
      title: "Sample Project 1",
      shortDescription: "This is a short description of sample Project 1.",
      thumbnail: "/images/sample1.png",
      author: {
        name: "Author 1",
        image: "/images/author1.png"
      },
      date: "2023-10-01T00:00:00Z",
      slug: "sample-Project-1"
    },
    {
      id: 2,
      title: "Sample Project 2",
      shortDescription: "This is a short description of sample Project 2.",
      thumbnail: "/images/sample2.png",
      author: {
        name: "Author 2",
        image: "/images/author2.png"
      },
      date: "2023-10-02T00:00:00Z",
      slug: "sample-Project-2"
    }
    // Add more static Project data as needed
  ];

  const cardsElement = ProjectsData.map((Project) => (
    <ProjectCard key={Project.id}>
      <TopContainer>
        <ImageContainer>
          <Image
            src={Project.thumbnail ?? "/images/gdsc_fallback.png"}
            fill="responsive"
            alt={Project.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 80vw"
            style={{
              borderRadius: "8px",
              objectFit: "cover"
            }}
          />
        </ImageContainer>
        <Typography variant="h4">{Project.title}</Typography>
        <Typography variant="bodySmall">
          {truncateText(Project.shortDescription, limit)}
        </Typography>
      </TopContainer>
      <BottomContainer>
        <ProjectInfo>
          <AuthorInfo>
            <Avatar
              url={Project.author.image}
              size="xs"
              blur={false}
              borderWidth={"2px"}
              borderColor={theme.colors.brandBlue}
            />
            <Typography variant="bodySmall">{Project.author.name}</Typography>
          </AuthorInfo>
          <Typography variant="bodySmall">{isoToDate(Project.date)}</Typography>
        </ProjectInfo>
        <Link
          href={`/Projects/${Project.slug}`}
          style={{ textDecoration: "none" }}
        >
          <Button>Read more</Button>
        </Link>
      </BottomContainer>
    </ProjectCard>
  ));

  return (
    <Container style={{ paddingTop: "120px" }}>
      <TitleContainer>
        <Typography variant="h1">Our Projects</Typography>
      </TitleContainer>
      {/* <ProjectCardContainer>{cardsElement}</ProjectCardContainer> */}
      <Terminal />
    </Container>
  );
}

export default ProjectSection;
