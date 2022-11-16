import { useState } from "react";
import { Container, Form, Row, Button, Col } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
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
      setDate(today);
      setDescription("");
      setAmount(0);
      setPayer(null);
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
    <StyledWrapper>
      <Form noValidate onSubmit={handleSubmit}>
        <StlyedTitle>비용 추가하기</StlyedTitle>
        <Row>
          <Col xs={12}>
            <StyledFormGroup>
              <Form.Control
                type="date"
                placeholder="결제한 날짜를 선택해 주세요"
                value={date}
                onChange={changeDate}
              />
            </StyledFormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <StyledFormGroup>
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
            </StyledFormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={6}>
            <StyledFormGroup>
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
            </StyledFormGroup>
          </Col>
          <Col xs={12} lg={6}>
            <StyledFormGroup>
              <Form.Select
                isValid={isPayer}
                isInvalid={!isPayer && validated}
                defaultValue=""
                className="form-control"
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
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid" data-valid={isPayer}>
                결제자를 선택해 주셔야 합니다.
              </Form.Control.Feedback>
            </StyledFormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="d-grid gap-2">
            <StyledSubmitButton>추가하기</StyledSubmitButton>
          </Col>
        </Row>
      </Form>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  padding: 50px;
  background-color: #683ba1;
  box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
`;

const StyledFormGroup = styled(Form.Group)`
  margin-bottom: 15px;
  input,
  select {
    background: #59359a;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: none;
    color: #f8f9fa;
    height: 45px;

    &:focus {
      color: #f8f9fa;
      background: #59359a;
      filter: brightness(80%);
    }
    ::placeholder {
      color: #f8f9fa;
    }
  }
`;

const StlyedTitle = styled.h3`
  color: #fffbfb;
  text-align: center;
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  margin-bottom: 15px;
`;

const StyledSubmitButton = styled(Button).attrs({
  type: "submit",
})`
  height: 60px;
  padding: 16px 32px;
  color: #59359a;
  border: none;
  border-radius: 8px;
  background-color: #e2d9f3;
  margin-top: 10px;
  :hover {
    background-color: #e2d9f3;
    filter: rgba(0, 0, 0, 0.3);
  }
`;
