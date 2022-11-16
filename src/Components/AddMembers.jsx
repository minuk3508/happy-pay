import styled from "styled-components";
import CenteredOverlayForm from "./Shared/CenteredOverlayForm";
import { InputTags } from "react-bootstrap-tagsinput";
import { useRecoilState, useRecoilValue } from "recoil";
import { groupMemberState } from "../State/groupMember";
import { useState } from "react";
import { groupNameState } from "../State/groupName";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../Router";

export default function AddMembers() {
  const [groupMember, setGroupMember] = useRecoilState(groupMemberState);
  const groupName = useRecoilValue(groupNameState);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const tagsGeneration = (value) => {
    setGroupMember(value.values);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setValidated(true);
    if (groupMember.length > 0) {
      navigate(ROUTES.EXPENSE_MAIN);
    }
  };
  const header = `${groupName}그룹에 속한 사람들의 이름을 모두 적어주세요`;

  return (
    <CenteredOverlayForm
      title={header}
      validated={validated}
      handleSubmit={handleSubmit}
    >
      <InputTags
        data-testid="input-member-names"
        placeholder=""
        onTags={tagsGeneration}
      />
      {validated && groupMember.length === 0 && (
        <StyledErrorMessage>
          그룹 멤버들의 이름을 입력해 주세요
        </StyledErrorMessage>
      )}
    </CenteredOverlayForm>
  );
}

const StyledErrorMessage = styled.span`
  color: red;
`;
