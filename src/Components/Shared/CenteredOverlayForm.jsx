import styled from "styled-components";
import { Container, Form, Row, Button } from "react-bootstrap";
import OverlayWrapper from "./OverlayWrapper";
import LogoForm from "./LogoForm";

export default function CenteredOverlayForm({
  title,
  validated,
  children,
  handleSubmit,
}) {
  return (
    <CentralizedContainer>
      <LogoForm />
      <OverlayWrapper>
        <Container>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <StyledRow>
              <Row className="aligin-items-start">
                <StyledTitle>{title}</StyledTitle>
              </Row>
              <Row className="aligin-items-center">{children}</Row>
              <Row className="aligin-items-end">
                <StyledSubmitButton>저장</StyledSubmitButton>
              </Row>
            </StyledRow>
          </Form>
        </Container>
      </OverlayWrapper>
    </CentralizedContainer>
  );
}

const CentralizedContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  min-height: 100vh;
`;
const StyledTitle = styled.h2`
  text-align: right;
  overflow-wrap: break-word;
  word-break: keep-all;
  font-weight: 700;
  line-height: 35px;
`;
const StyledSubmitButton = styled(Button).attrs({
  type: "submit",
})`
  background-color: #6610f2;
  border-radius: 8px;
  border: none;
  :hover {
    background-color: #955af5;
    filter: brightness(80%);
  }
`;
const StyledRow = styled(Row)`
  align-items: center;
  justify-content: center;
  height: 60vh;
`;
