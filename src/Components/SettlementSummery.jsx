import { useRecoilValue } from "recoil";
import { expensesState } from "../State/expenses";
import { groupMemberState } from "../State/groupMember";

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
  const expenses = useRecoilValue(expensesState);
  const members = ["A", "B", "C", "D"]; //useRecoilValue(groupMemberState);

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
  return (
    <div>
      <h3>정산 결과</h3>
      {totalExpenseAmount > 0 && groupMemberCount > 0 && (
        <>
          <span>
            {groupMemberCount}명이서 총 {totalExpenseAmount} 원 지출
          </span>
          <br />
          <span>한 사람 당 {spilitAmount} 명</span>
          <ul>
            {minimumTransaction.map(({ sender, receiver, amount }, index) => (
              <li key={`transaction-${index}`}>
                <span>
                  {sender}가 {receiver}에게 {amount} 원 보내기
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
