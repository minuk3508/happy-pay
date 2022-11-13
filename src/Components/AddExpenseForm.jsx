import { useState } from "react";
import { Container, Form, Row, Button } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { expensesState } from "../State/expenses";
import { groupMemberState } from "../State/groupMember";

const today = [
  new Date().getFullYear(),
  new Date().getMonth() + 1,
  new Date().getDate(),
].join("-");

export default function AddExpenseForm() {
  const members = useRecoilValue(groupMemberState);
  const setExpenses = useSetRecoilState(expensesState);
  const [validated, setValidated] = useState(false);
  const [isDescription, setIsDescription] = useState(false);
  const [isAmount, setIsAmount] = useState(false);
  const [isPayer, setIsPayer] = useState(false);
  const [date, setDate] = useState(today);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [payer, setPayer] = useState(null);

  const checkFormValidity = () => {
    const descriptionValid = description.length > 0;
    const amountValid = amount > 0;
    const payerValid = payer !== null;

    setIsDescription(descriptionValid);
    setIsAmount(amountValid);
    setIsPayer(payerValid);

    return descriptionValid && amountValid && payerValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (checkFormValidity()) {
      const newExpense = {
        date,
        description,
        amount,
        payer,
      };
      setExpenses((prev) => [...prev, newExpense]);
    }
    setValidated(true);
  };

  const changeDate = (event) => {
    setDate(event.target.value);
  };
  const changeDescription = (event) => {
    setDescription(event.target.value);
  };
  const changeAmount = (event) => {
    setAmount(event.target.value);
  };
  const changePayer = (event) => {
    setPayer(event.target.value);
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <h3>비용 추가하기</h3>

      <Form.Group>
        <Form.Control
          type="date"
          placeholder="결제한 날짜를 선택해 주세요"
          value={date}
          onChange={changeDate}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          isValid={isDescription}
          isInvalid={!isDescription && validated}
          placeholder="비용에 대한 설명을 입력해 주세요"
          value={description}
          onChange={changeDescription}
        />
        <Form.Control.Feedback type="invalid" data-valid={isDescription}>
          비용 내용을 입력해 주셔야 합니다.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="number"
          isValid={isAmount}
          isInvalid={!isAmount && validated}
          placeholder="비용은 얼마인가요?"
          value={amount}
          onChange={changeAmount}
        />
        <Form.Control.Feedback type="invalid" data-valid={isAmount}>
          금액을 입력해 주셔야 합니다.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Select
          isValid={isPayer}
          isInvalid={!isPayer && validated}
          defaultValue=""
          onChange={changePayer}
        >
          <option disabled value="">
            누가 결제 했나요?
          </option>
          {members.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid" data-valid={isPayer}>
          결제자를 선택해 주셔야 합니다.
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">추가하기</Button>
    </Form>
  );
}
