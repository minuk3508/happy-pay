import { render, screen, within } from "@testing-library/react";
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
  describe("비용 리스트 컴포넌트", () => {
    test("비용 리스트 컴포넌트가 렌더링 되는가", () => {
      renderComponent();

      const expenseListComponent = screen.getByTestId("expenseList");
      expect(expenseListComponent).toBeInTheDocument();
    });

    describe("새로운 비용이 입력 되었을 때", () => {
      const addNewExpense = async () => {
        const {
          dateInput,
          expenseDescriptionInput,
          expenseAmountInput,
          payerInput,
          addButton,
        } = renderComponent();
        await userEvent.type(dateInput, "2022-11-14");
        await userEvent.type(expenseDescriptionInput, "장보기");
        await userEvent.type(expenseAmountInput, "30000");
        await userEvent.selectOptions(payerInput, "영수");
        await userEvent.click(addButton);
      };

      beforeEach(async () => {
        await addNewExpense();
      });
      test("날짜, 내용, 결제자, 금액 데이터가 정산 리스트에 추가 된다", () => {
        const expenseListComponent = screen.getByTestId("expenseList");
        const dateValue = within(expenseListComponent).getByText("2022-11-14");
        const descriptionValue =
          within(expenseListComponent).getByText("장보기");
        const amountValue = within(expenseListComponent).getByText("30000 원");
        const payerValue = within(expenseListComponent).getByText("영수");
        expect(dateValue).toBeInTheDocument();
        expect(descriptionValue).toBeInTheDocument();
        expect(amountValue).toBeInTheDocument();
        expect(payerValue).toBeInTheDocument();
      });

      test("정산 결과 또한 업데이트 된다", () => {
        const totalText = screen.getByText(/명이서 총 30000 원 지출/i);
        const transactionText = screen.getByText(/보내기/i);

        expect(totalText).toBeInTheDocument();
        expect(transactionText).toBeInTheDocument();
      });

      const htmlToOmage = require("html-to-image");

      test("정산 결과를 이미지 파일로 저장할 수 있다", async () => {
        const spingToPng = jest.spyOn(htmlToOmage, "toPng");
        const downloadButton = screen.getByTestId("button-download");
        expect(downloadButton).toBeInTheDocument();

        await userEvent.click(downloadButton);
        expect(spingToPng).toHaveBeenCalledTimes(1);
        // afterEach(() => {
        //   jest.resetAllMocks();
        // });
      });
    });
  });
  describe("비용 정산결과 컴포넌트", () => {
    test("정산 결과 컴포넌트가 렌더링 되는가", () => {
      renderComponent();

      const component = screen.getByText(/정산 결과/i);
      expect(component).toBeInTheDocument();
    });
  });
});
