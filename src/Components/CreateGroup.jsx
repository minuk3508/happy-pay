import { useState } from "react";
import { Form } from "react-bootstrap";
import { useSetRecoilState } from "recoil";
import { groupNameState } from "../State/groupName";
import CenteredOverlayForm from "./Shared/CenteredOverlayForm";

export default function CreateGroup() {
  const [validated, setValidated] = useState(false);
  const [validGroupName, setValidGroupName] = useState(false);
  const setGroupName = useSetRecoilState(groupNameState);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    const form = event.currentTarget;
    if (form.checkValidity()) {
      setValidGroupName(true);
    } else {
      event.stopPropagation();
      setValidGroupName(false);
    }
    setValidated(true);
  };

  const typingGroupName = (event) => {
    setGroupName(event.target.value);
  };
  return (
    <CenteredOverlayForm
      title="더치페이 할 그룹의 이름을 정해볼까요?"
      validated={validated}
      handleSubmit={handleSubmit}
    >
      <Form.Group>
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
    </CenteredOverlayForm>
  );
}
