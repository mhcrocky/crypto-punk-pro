import React, { useState } from "react";
//eslint-disable-next-line
import Counter from "components/counter/CounterDown";
import ResponsiveVideoEmbed from "../../helpers/ResponsiveVideoEmbed.js";
import { ReactComponent as PlayIcon } from "feather-icons/dist/icons/play-circle.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import DesignIllustration from "../../images/design-illustration.svg";

import {
  Heading,
  Actions,
  Paragraph,
  Container,
  TwoColumn,
  LeftColumn,
  RightColumn,
  PrimaryButton,
  WatchVideoButton,
  DecoratorBlob1,
  StyledModal,
  CloseModalButton
} from 'components/tw';
function Hero({
                heading= "Ad infinitum Ad",
                description= "",
                watchVideoButtonText= "Watch Video",
                watchVideoYoutubeUrl= "https://www.youtube.com/embed/_GuOjXYl5ew",
                imageSrc= DesignIllustration,
                imageCss= null,
                imageDecoratorBlob= false
              }){

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [primaryBtnText,setPrimaryBtnTest] = useState('Buy Now');
    const toggleModal = () => setModalIsOpen(!modalIsOpen);
    const handleCountEnd = () => {
      setPrimaryBtnTest('Count End');
    }
    return(
      <>      
        <Container>
          <TwoColumn>                        
            <LeftColumn>
              <Heading className="pixel-font">{heading}</Heading>
              <Paragraph>{description}</Paragraph>
              <Actions>
                  <PrimaryButton className="pixel-font" as="a" href='#/'>{primaryBtnText}</PrimaryButton>
                <WatchVideoButton onClick={toggleModal}>
                  <span className="playIconContainer">
                    <PlayIcon className="playIcon" />
                  </span>
                  <span className="playText">{watchVideoButtonText}</span>
                </WatchVideoButton>
              </Actions>
            </LeftColumn>
            <RightColumn>
                <Counter handleCountEnd={()=>handleCountEnd()}/>
            </RightColumn>            
          </TwoColumn>
          <DecoratorBlob1 />
          <StyledModal
            closeTimeoutMS={300}
            className="mainHeroModal"
            isOpen={modalIsOpen}
            onRequestClose={toggleModal}
            shouldCloseOnOverlayClick={true}
          >
            <CloseModalButton onClick={toggleModal}>
              <CloseIcon />
            </CloseModalButton>
            <div className="content">
              <ResponsiveVideoEmbed url={watchVideoYoutubeUrl} />
            </div>
          </StyledModal>
        </Container>
      </>      
      
    )
}

export default Hero