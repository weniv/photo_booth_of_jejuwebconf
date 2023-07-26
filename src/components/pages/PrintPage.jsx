import React from "react";
import styled from "styled-components";

export default function PrintPage() {
    return <Layout>프린트 페이지 입니다</Layout>;
}

const Layout = styled.main`
    width: 100vw;
    height: 100vh;
    padding: 0 90px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(249, 197, 131, 0.3);
`;
