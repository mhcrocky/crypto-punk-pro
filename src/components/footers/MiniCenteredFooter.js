import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import {Container as ContainerBase } from "components/misc/Layouts.js"
import logo from "../../images/logo-full.png";
import { ReactComponent as TwitterIcon } from "../../images/twitter-icon.svg";


const Container = tw(ContainerBase)`bg-gray-900 text-gray-100 -mx-8 -mb-8`
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const Row = tw.div`flex items-center justify-center flex-col px-8`

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-20`;
const LogoText = tw.h5`ml-2 text-sm font-black tracking-wider`;

const SocialLinksContainer = tw.div`mt-10`;
const SocialLink = styled.a`
  ${tw`cursor-pointer inline-block text-gray-100 hover:text-gray-500 transition duration-300 mx-4`}
  svg {
    ${tw`w-5 h-5`}
  }
`;

const CopyrightText = tw.p`text-center mt-10 font-medium tracking-wide text-sm text-gray-600`
const Dmain = () => {
  return (
    <Container>
      <Content>
        <Row>
          <LogoContainer>            
            <LogoText>Powered By</LogoText>
            <LogoImg src={logo} />
          </LogoContainer>
          <SocialLinksContainer>            
            <SocialLink href="https://twitter.com">
              <TwitterIcon />
            </SocialLink>            
          </SocialLinksContainer>
          <CopyrightText>
            &copy; Copyright 2021, Treact Inc. All Rights Reserved.
          </CopyrightText>
        </Row>
      </Content>
    </Container>
  );
};

export default Dmain;