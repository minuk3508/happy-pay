import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import CreateGroup from "./CreateGroup";

const renderComponent = () => {
  render(
    <RecoilRoot>
      <Router>
        <CreateGroup />
      </Router>
    </RecoilRoot>
  );

  const input = screen.getByPlaceholderText("2022 제주도 여행");
  const saveButton = screen.getByText("저장");
  const errorMessage = screen.queryByText("그룹 이름을 입력해 주세요");

  return { input, saveButton, errorMessage };
};

describe("그룹 생성페이지", () => {
  test("그룹 이름 입력 컴포넌트가 렌더링 되는가", () => {
    //todo: input component
    //todo: save button
    const { input, saveButton } = renderComponent();

    expect(input).not.toBeNull();
    expect(saveButton).not.toBeNull();
  });

  test('그룹 이름을 입력하지 않고 "저장" 버튼 클릭시, 에러 메세지 노출', async () => {
    //event: click
    //result: error message
    const { saveButton, errorMessage } = renderComponent();

    await userEvent.click(saveButton);
    expect(errorMessage).toHaveAttribute("data-valid", "false");
  });

  test('그룹 이름을 입력 후 "저장" 버튼 클릭시, 저장 성공', async () => {
    //event: typing, click
    //result: save success
    const { input, saveButton, errorMessage } = renderComponent();

    await userEvent.type(input, "예시 그룹명");
    await userEvent.click(saveButton);

    expect(errorMessage).toHaveAttribute("data-valid", "true");
  });
});
