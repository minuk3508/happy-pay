import { Col, Container, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { groupNameState } from "../State/groupName";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseTable from "./ExpenseTable";
import SettlementSummery from "./SettlementSummery";
import LogoForm from "./Shared/LogoForm";

export default function ExpenseMain() {
  return (
    <Container>
      <Row>
        <Col>
          <LeftPane />
        </Col>
        <Col>
          <RightPane />
        </Col>
      </Row>
    </Container>
  );
}

const LeftPane = () => {
  return (
    <StyledLContainer>
      <StyledGapRow>
        <Row>
          <LogoForm />
        </Row>
        <Row>
          <AddExpenseForm />
        </Row>
        <Row>
          <SettlementSummery />
        </Row>
      </StyledGapRow>
    </StyledLContainer>
  );
};
const StyledLContainer = styled(Container)``;

const StyledGapRow = styled(Row)`
  gap: 5vh;
  padding-top: 100px;
  justify-content: center;
`;

const RightPane = () => {
  const groupName = useRecoilValue(groupNameState);
  return (
    <StyledRightPaneWrapper>
      <Row>
        <StyledGroupName>{groupName || "groupName"}</StyledGroupName>
      </Row>
      <ExpenseTable />
    </StyledRightPaneWrapper>
  );
};

const StyledGroupName = styled.h2`
  font-weight: 200;
  text-align: center;
  letter-spacing: 10px;
  margin-bottom: 40px;
`;

const StyledRightPaneWrapper = styled(Container)`
  padding: 100px 31px;
`;
