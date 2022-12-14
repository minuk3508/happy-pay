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
      <StyledForm noValidate onSubmit={handleSubmit}>
        <StlyedTitle>?????? ????????????</StlyedTitle>
        <Row>
          <StyledCol xs={12}>
            <StyledFormGroup>
              <Form.Control
                type="date"
                placeholder="????????? ????????? ????????? ?????????"
                value={date}
                onChange={changeDate}
              />
            </StyledFormGroup>
          </StyledCol>
        </Row>
        <Row>
          <StyledCol xs={12}>
            <StyledFormGroup>
              <Form.Control
                type="text"
                isValid={isDescription}
                isInvalid={!isDescription && validated}
                placeholder="????????? ?????? ????????? ????????? ?????????"
                value={description}
                onChange={changeDescription}
              />
              <Form.Control.Feedback type="invalid" data-valid={isDescription}>
                ?????? ????????? ????????? ????????? ?????????.
              </Form.Control.Feedback>
            </StyledFormGroup>
          </StyledCol>
        </Row>
        <Row>
          <StyledCol xs={12} lg={6}>
            <StyledFormGroup>
              <Form.Control
                type="number"
                isValid={isAmount}
                isInvalid={!isAmount && validated}
                placeholder="????????? ????????????????"
                value={amount}
                onChange={changeAmount}
              />
              <Form.Control.Feedback type="invalid" data-valid={isAmount}>
                ????????? ????????? ????????? ?????????.
              </Form.Control.Feedback>
            </StyledFormGroup>
          </StyledCol>
          <StyledCol xs={12} lg={6}>
            <StyledFormGroup>
              <Form.Select
                isValid={isPayer}
                isInvalid={!isPayer && validated}
                defaultValue=""
                className="form-control"
                onChange={changePayer}
              >
                <option disabled value="">
                  ?????? ?????? ??????????
                </option>
                {members.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid" data-valid={isPayer}>
                ???????????? ????????? ????????? ?????????.
              </Form.Control.Feedback>
            </StyledFormGroup>
          </StyledCol>
        </Row>
        <Row>
          <StyledCol xs={12} className="d-grid gap-2">
            <StyledSubmitButton>????????????</StyledSubmitButton>
          </StyledCol>
        </Row>
      </StyledForm>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  padding: 30px;
  background-color: #683ba1;
  box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
`;
const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const StyledCol = styled(Col)`
  justify-content: center;
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

export const StlyedTitle = styled.h3`
  color: #fffbfb;
  text-align: center;
  font-weight: 700;
  font-size: 30px;
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
