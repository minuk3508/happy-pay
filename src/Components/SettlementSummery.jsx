import { toPng } from "html-to-image";
import { useRef } from "react";
import { Button } from "react-bootstrap";
import { Download } from "react-bootstrap-icons";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { expensesState } from "../State/expenses";
import { groupMemberState } from "../State/groupMember";
import { StlyedTitle } from "./AddExpenseForm";

export const calculateMinimumTransaction = (
  expenses,
  members,
  amountPerPerson
) => {
  const minTrasactions = [];

  if (amountPerPerson === 0) {
    return minTrasactions;
  }

  //1. 사람별로 냈어야 할 금액
  const membersToPay = {};
  members.forEach((member) => {
    membersToPay[member] = amountPerPerson;
  });

  //2. 사람별로 냈어야 할 금액 업데이트
  expenses.forEach(({ payer, amount }) => {
    membersToPay[payer] -= amount;
  });

  //3. sorting
  const sortedMembersToPay = Object.keys(membersToPay)
    .map((member) => ({
      member: member,
      amount: membersToPay[member],
    }))
    .sort((a, b) => a.amount - b.amount);

  var left = 0;
  var right = sortedMembersToPay.length - 1;
  while (left < right) {
    while (left < right && sortedMembersToPay[left].amount === 0) {
      left++;
    }
    while (left < right && sortedMembersToPay[right].amount === 0) {
      right--;
    }
    const toReceive = sortedMembersToPay[left];
    const toSend = sortedMembersToPay[right];
    const amountToReceive = Math.abs(toReceive.amount);
    const amountToSend = Math.abs(toSend.amount);

    if (amountToSend > amountToReceive) {
      minTrasactions.push({
        receiver: toReceive.member,
        sender: toSend.member,
        amount: amountToReceive,
      });
      toReceive.amount = 0;
      toSend.amount -= amountToReceive;
      left++;
    } else {
      minTrasactions.push({
        receiver: toReceive.member,
        sender: toSend.member,
        amount: amountToSend,
      });
      toSend.amount = 0;
      toReceive.amount += amountToSend;
      right--;
    }
  }
  return minTrasactions;
};
export default function SettlementSummery() {
  const settlement = useRef(null);
  const expenses = useRecoilValue(expensesState);
  const members = useRecoilValue(groupMemberState);

  const totalExpenseAmount = expenses.reduce(
    (prevAmount, currentExpense) =>
      parseInt(prevAmount) + parseInt(currentExpense.amount),
    0
  );

  const groupMemberCount = members.length;
  const spilitAmount = totalExpenseAmount / groupMemberCount;

  const minimumTransaction = calculateMinimumTransaction(
    expenses,
    members,
    spilitAmount
  );

  const exportToImage = () => {
    if (settlement.current === null) {
      return;
    }
    toPng(settlement.current, {
      filter: (node) => node.tagName !== "BUTTON",
    })
      .then((dataURL) => {
        const link = document.createElement("a");
        link.download = "settlement-summery.png";
        link.href = dataURL;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <StyledWrapper ref={settlement}>
      <StlyedTitle>정산 결과</StlyedTitle>
      {totalExpenseAmount > 0 && groupMemberCount > 0 && (
        <>
          <SytledSummery>
            <span>
              {groupMemberCount}명이서 총 {totalExpenseAmount} 원 지출
            </span>
            <br />
            <span>한 사람 당 {spilitAmount} 명</span>
          </SytledSummery>
          <StyledUl>
            {minimumTransaction.map(({ sender, receiver, amount }, index) => (
              <li key={`transaction-${index}`}>
                <span>
                  {sender}가 {receiver}에게 {amount} 원 보내기
                </span>
              </li>
            ))}
          </StyledUl>
        </>
      )}
      <StyledButton data-testid="button-download" onClick={exportToImage}>
        <Download />
      </StyledButton>
    </StyledWrapper>
  );
}

const StyledButton = styled(Button)`
  background: none;
  border: none;
  font-size: 20px;
  position: absolute;
  top: 15px;
  right: 15px;

  :hover {
    background: none;
    color: #683ba1;
  }
`;

const StyledWrapper = styled.div`
  position: relative;
  padding: 50px;
  background-color: #683ba1;
  color: #fffbfb;
  font-size: 20px;
  box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  text-align: center;
`;

const StyledUl = styled.ul`
  margin-top: 31px;
  font-weight: 600;
  line-height: 200%;

  list-style-type: disclosure-closed;
  li::marker {
    animation: blinker 1.5s linear infinite;
  }

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;

const SytledSummery = styled.div`
  margin-top: 31px;
`;
