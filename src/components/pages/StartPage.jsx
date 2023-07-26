import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import BgImg from "../../assets/background.svg"

export default function StartPage() {
  const navigate = useNavigate()

  return (
    <Cont onClick={() => navigate("/frame")}>
        <Btn>
          <p>화면을 터치해주세요</p>
        </Btn>
    </Cont>
  )
}

const Cont = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display:flex;
  flex-direction: column;
  align-items: center;
  background: url(${BgImg}) 0 0 no-repeat;
  background-size: cover;
`

const Btn = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15vh;
  background-color: var(--main-color);
  bottom: 0;

  p {
    font-size: 3rem;
    font-weight: 700;
    color: var(--white-color);
  }
`


