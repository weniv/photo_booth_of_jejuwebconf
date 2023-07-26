import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"

export default function FramePage() {
  const navigate = useNavigate()

  return (
    <Cont>
        <h1>1. 프레임을 선택해주세요.</h1>
        <button type='button' onClick={() => navigate("/snap")}>선택완료</button>
    </Cont>
  )
}

const Cont = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
`
