import { Col, Container, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { groupNameState } from "../State/groupName";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseTable from "./ExpenseTable";

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
    <Container>
      <AddExpenseForm />
    </Container>
  );
};

const RightPane = () => {
  const groupName = useRecoilValue(groupNameState);
  return (
    <StyledContainer>
      <Row>
        <StyledGroupName>{groupName || "groupName"}</StyledGroupName>
      </Row>
      <ExpenseTable />
    </StyledContainer>
  );
};

const StyledGroupName = styled.h2`
  font-weight: 200;
  text-align: center;
  letter-spacing: 10px;
  margin-bottom: 50px;
`;

const StyledContainer = styled(Container)`
  padding: 100px 31px;
`;
