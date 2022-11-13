import styled from "styled-components";
import { Container } from "react-bootstrap";
import OverlayWrapper from "./Shared/OverlayWrapper";

export default function CenteredOverlayForm({ children }) {
  return (
    <CentralizedContainer>
      <StyledHeader>Happy Pay😆</StyledHeader>
      <OverlayWrapper>{children}</OverlayWrapper>
    </CentralizedContainer>
  );
}
const StyledHeader = styled.h1`
  font-weight: 200;
  letter-spacing: 10px;
`;
const CentralizedContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  min-height: 100vh;
`;
