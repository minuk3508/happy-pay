import { Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { expensesState } from "../State/expenses";
import OverlayWrapper from "./Shared/OverlayWrapper";

export default function ExpenseTable() {
  const expenses = useRecoilValue(expensesState);
  return (
    <OverlayWrapper minHeight={"73vh"}>
      <Table data-testid="expenseList" borderless hover responsive>
        <StyledThead>
          <tr>
            <th>날짜</th>
            <th>내용</th>
            <th>결제자</th>
            <th>금액</th>
          </tr>
        </StyledThead>
        <StyledBody>
          {expenses.map(({ date, description, amount, payer }, index) => (
            <tr key={index}>
              <td>{date}</td>
              <td>{description}</td>
              <td>{payer} </td>
              <td>{parseInt(amount)} 원</td>
            </tr>
          ))}
        </StyledBody>
      </Table>
    </OverlayWrapper>
  );
}

const StyledThead = styled.thead`
  color: #683da6;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  line-height: 29px;

  th {
    padding: 20px 8px;
  }
`;

const StyledBody = styled.tbody`
  td {
    font-weight: 400;
    font-size: 18px;
    line-height: 59px;
  }
`;
