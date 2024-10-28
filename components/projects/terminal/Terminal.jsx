import React, { useState } from "react";
import {
  TerminalButton,
  TerminalContainer,
  TerminalContent,
  TerminalHeader
} from "./Terminal.styled";
import { TypingEffect } from "@/components/display/typography/typingEffect/TypingEffect";
import { Azeret_Mono } from "next/font/google";

const azeret = Azeret_Mono({
  weight: "400",
  subsets: ["latin"]
});

const Terminal = () => {
  const [isGRTextTyped, setIsGRTextTyped] = useState(false);
  return (
    <TerminalContainer>
      <TerminalHeader>
        <TerminalButton color="#FF5656" />
        <TerminalButton color="#FFCA2E" />
        <TerminalButton color="#24B06C" />
      </TerminalHeader>
      <TerminalContent className={azeret.className}>
        <TypingEffect
          className="GR-text"
          showCursor={true}
          onTypingComplete={() => {
            setIsGRTextTyped(true);
          }}
          interKeyStrokeDurationInMs={100}
        >{`$geekroom-plaksha cd /tech`}</TypingEffect>
        {isGRTextTyped && (
          <TypingEffect interKeyStrokeDurationInMs={40} showCursor={true}>
            {`>> The Geek Room Plaksha Tech Team excels in various domains including Web, App, and Game Development, as well as in AI-ML. We have recently started, and our team is already working on several exciting projects. Stay tuned!`}
          </TypingEffect>
        )}
      </TerminalContent>
    </TerminalContainer>
  );
};

export default Terminal;
