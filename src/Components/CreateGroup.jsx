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
    <div>
      <h1>Happy Pay😆</h1>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <h2>더치페이 할 그룹의 이름을 정해볼까요?</h2>
          </Row>
          <Row>
            <Form.Group controlId="validationGroupName">
              <Form.Control
                type="text"
                required
                placeholder="2022 제주도 여행"
                onChange={typingGroupName}
              />
              <Form.Control.Feedback type="invalid" data-valid={validGroupName}>
                그룹 이름을 입력해 주세요
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Button type="submit">저장</Button>
          </Row>
        </Form>
      </Container>
      {/* <CenteredOverlayForm /> */}
    </div>
  );
}
