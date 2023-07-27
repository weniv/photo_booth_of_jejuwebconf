import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import WenivType1 from "../../assets/weniv_type1.svg";
import WenivType2 from "../../assets/weniv_type2.svg";
import WebconfType1 from "../../assets/webconf_type1.svg";
import WebconfType2 from "../../assets/webconf_type2.svg";


function FrameButton({ frame, id, saveFrame }) {
    return (
        <div className="frameBtn" onClick={(e) => saveFrame(e)}>
            <label htmlFor={id}>
                <img src={frame} />
            </label>
            <input type="radio" id={id} name="frame" />
        </div>
    );
}

export default function FramePage() {
  const navigate = useNavigate()
  const [frameType, setFrameType] = useState("WenivType1")

  const saveFrame = (e) => {
    setFrameType(e.target.id)
  }

  useEffect(() => {
    localStorage.setItem("frameType", frameType)
  },[frameType])

  return (
      <Layout>
          <h1>1. 프레임을 선택해주세요.</h1>
          <section>
              <FrameButton frame={WenivType1} id="WenivType1" saveFrame={saveFrame}/>
              <FrameButton frame={WenivType2} id="WenivType2" saveFrame={saveFrame}/>
              <FrameButton frame={WebconfType1} id="WebconfType1" saveFrame={saveFrame}/>
              <FrameButton frame={WebconfType2} id="WebconfType2" saveFrame={saveFrame}/>
          </section>
          <button type='button' onClick={() => navigate("/snap")}>선택완료</button>
      </Layout>
  )
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

    h1 {
        color: #ed7a3a;
        font-size: 2rem;
        font-weight: 800;
        margin-bottom: 30px;
    }

    section {
        display: flex;
        gap: 15px;

        div.frameBtn {
            position: relative;
            padding: 0;
            border: none;
            background: none;
            margin: 0;
            cursor: pointer;

            label {
                height: 100%;
                display: inline-block;
            }

            img {
                width: 300px;
                box-shadow: 0px 4px 44px 0px rgba(0, 0, 0, 0.1);
            }

            input {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                margin: 0;
            }
        }
    }
`;
