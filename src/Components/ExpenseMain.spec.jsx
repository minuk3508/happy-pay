import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RecoilRoot } from "recoil";
import { groupMemberState } from "../State/groupMember";
import ExpenseMain from "./ExpenseMain";

const renderComponent = () => {
  render(
    <RecoilRoot
      initializeState={(snap) => {
        snap.set(groupMemberState, ["영수", "영희"]);
      }}
    >
      <ExpenseMain />
    </RecoilRoot>
  );
  const dateInput = screen.getByPlaceholderText(/결제한 날짜/i);
  const expenseDescriptionInput =
    screen.getByPlaceholderText(/비용에 대한 설명/i);
  const expenseAmountInput = screen.getByPlaceholderText(/비용은 얼마/i);
  const payerInput = screen.getByDisplayValue(/누가 결제/i);
  const addButton = screen.getByText("추가하기");
  const descriptionErrorMessage = screen.getByText(
    "비용 내용을 입력해 주셔야 합니다."
  );
  const payerErrorMessage = screen.getByText("결제자를 선택해 주셔야 합니다.");
  const amountErrorMessage = screen.getByText("금액을 입력해 주셔야 합니다.");

  return {
    dateInput,
    expenseDescriptionInput,
    expenseAmountInput,
    payerInput,
    addButton,
    descriptionErrorMessage,
    payerErrorMessage,
    amountErrorMessage,
  };
};

describe("비용 정산 메인페이지", () => {
  describe("비용 추가 컴포넌트", () => {
    test("비용 추가 컴포넌트 렌더링", () => {
      const {
        dateInput,
        expenseDescriptionInput,
        expenseAmountInput,
        payerInput,
        addButton,
      } = renderComponent();
      expect(dateInput).toBeInTheDocument();
      expect(expenseDescriptionInput).toBeInTheDocument();
      expect(expenseAmountInput).toBeInTheDocument();
      expect(payerInput).toBeInTheDocument();
      expect(addButton).toBeInTheDocument();
    });
    test('비용 추가에 필수 입력 값을 채우지 않고 "추가" 버튼 클릭시, 에러 메세지를 노출', async () => {
      const {
        addButton,
        descriptionErrorMessage,
        payerErrorMessage,
        amountErrorMessage,
      } = renderComponent();
      expect(addButton).toBeInTheDocument();
      await userEvent.click(addButton);

      expect(descriptionErrorMessage).toHaveAttribute("data-valid", "false");
      expect(payerErrorMessage).toHaveAttribute("data-valid", "false");
      expect(amountErrorMessage).toHaveAttribute("data-valid", "false");
    });

    test('비용 추가에 필수 입력 값을 채우고 "추가" 버튼 클릭시, 저장에 성공', async () => {
      const {
        expenseDescriptionInput,
        expenseAmountInput,
        payerInput,
        addButton,
        descriptionErrorMessage,
        payerErrorMessage,
        amountErrorMessage,
      } = renderComponent();
      await userEvent.type(expenseDescriptionInput, "장보기");
      await userEvent.type(expenseAmountInput, "30000");
      await userEvent.selectOptions(payerInput, "영수");
      await userEvent.click(addButton);

      expect(descriptionErrorMessage).toHaveAttribute("data-valid", "true");
      expect(payerErrorMessage).toHaveAttribute("data-valid", "true");
      expect(amountErrorMessage).toHaveAttribute("data-valid", "true");
    });
  });
});
