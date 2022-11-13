import styled from "styled-components";
import { useState } from "react";
import { Container, Form, Row, Button } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { groupNameState } from "../State/groupName";
import CenteredOverlayForm from "./CenteredOverlayForm";

export default function CreateGroup() {
  const [validated, setValidated] = useState(false);
  const [validGroupName, setValidGroupNmae] = useState(false);
  const [groupName, setGroupName] = useRecoilState(groupNameState);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity()) {
      setValidGroupNmae(true);
    } else {
      event.stopPropagation();
      setValidGroupNmae(false);
    }
    setValidated(true);
  };

  const typingGroupName = (event) => {
    setGroupName(event.target.value);
  };
  return (
    <CenteredOverlayForm>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <StyledRow>
            <Row className="aligin-items-start">
              <StyledH2>더치페이 할 그룹의 이름을 정해볼까요?</StyledH2>
            </Row>
            <Row className="aligin-items-center">
              <Form.Group controlId="validationGroupName">
                <Form.Control
                  type="text"
                  required
                  placeholder="2022 제주도 여행"
                  onChange={typingGroupName}
                />
                <Form.Control.Feedback
                  type="invalid"
                  data-valid={validGroupName}
                >
                  그룹 이름을 입력해 주세요
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="aligin-items-end">
              <StyledSubmitButton>저장</StyledSubmitButton>
            </Row>
          </StyledRow>
        </Form>
      </Container>
    </CenteredOverlayForm>
  );
}

const StyledH2 = styled.h2`
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
