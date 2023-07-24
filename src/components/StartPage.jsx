import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"

export default function StartPage() {
  const navigate = useNavigate()

  return (
    <Cont>
        <h1>네컷사진을 찍어보세요</h1>
        <button type='button' onClick={() => navigate("/snap")}>촬영하러가기</button>
    </Cont>
  )
}

const Cont = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
`


