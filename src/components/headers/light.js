import React from 'react';
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { useHistory } from 'react-router-dom';

import useAnimatedNavToggler from "../../helpers/useAnimatedNavToggler.js";

import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";

const Header = tw.header`flex justify-between items-center max-w-screen-xl mx-auto`;
const NavLinks = tw.div`inline-block`;
const NavLink = tw.button`text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 font-semibold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500`;
const PrimaryLink = tw(NavLink)`lg:mx-0 px-8 py-3 rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline border-b-0`;
const LogoLink = styled(NavLink)`${tw`flex items-center font-black border-b-0 text-2xl! ml-0!`};img {${tw`w-10 mr-3`}}`;
const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
const NavToggle = tw.button`lg:hidden z-20 focus:outline-none hocus:text-primary-500 transition duration-300`;
const MobileNavLinks = motion.custom(styled.div`${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white`}${NavLinks} {${tw`flex flex-col items-center`}}`);
const DesktopNavLinks = tw.nav`hidden lg:flex flex-1 justify-between items-center`;

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  }
};
 
const LightHeader =({ roundedHeaderButton = false, collapseBreakpointClass = "lg" }) => {
  const history = useHistory();

  const handleGotoPage = (link) => {
    history.push(link);
  }
  const defaultLinks = (
    <NavLinks key={1}>
      <NavLink onClick={()=>handleGotoPage('/cryptopunks/attributes')} >Search</NavLink>
      <NavLink onClick={()=>handleGotoPage('/')} >Explore</NavLink>
      <PrimaryLink css={roundedHeaderButton && tw`rounded-full`} onClick={()=>handleGotoPage('/gotran')} >Hold On</PrimaryLink>
    </NavLinks>
  );



  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss = collapseBreakPointCssMap[collapseBreakpointClass];

  const defaultLogoLink = (
    <LogoLink onClick={()=>handleGotoPage('/')}>
      {/* {<img src={logo} alt="logo" />} */}
      Home
    </LogoLink>
  );


  return (
    <Header className={"header-light pixel-font"}>
      <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
        {defaultLogoLink}
        {defaultLinks}
      </DesktopNavLinks>

      <MobileNavLinksContainer css={collapseBreakpointCss.mobileNavLinksContainer}>
        {defaultLogoLink}
        <MobileNavLinks initial={{ x: "150%", display: "none" }} animate={animation} css={collapseBreakpointCss.mobileNavLinks}>
          {defaultLinks}
        </MobileNavLinks>
        <NavToggle onClick={toggleNavbar} className={showNavLinks ? "open" : "closed"}>
          {showNavLinks ? <CloseIcon tw="w-6 h-6" /> : <MenuIcon tw="w-6 h-6" />}
        </NavToggle>
      </MobileNavLinksContainer>
    </Header>
  );
};


export default LightHeader;