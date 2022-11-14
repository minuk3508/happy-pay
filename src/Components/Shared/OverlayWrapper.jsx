import styled from "styled-components";

export default function OverlayWrapper({ children, padding, minHeight }) {
  return (
    <Container minHeight={minHeight} padding={padding}>
      {children}
    </Container>
  );
}

const Container = styled.div`
  min-height: ${(props) => props.minHeight || "0"};
  padding: ${(props) => props.padding || "5vw"};
  background-color: white;
  border-radius: 15px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;
