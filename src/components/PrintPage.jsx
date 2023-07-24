import React from 'react'
import styled from "styled-components"

export default function PrintPage({ picture }) {
  return (
    <Frame>
        <Wrap>
          {picture && picture.map((pic, idx) =>  (
            <Picture src={pic} key={idx} alt={`${idx+1}번 사진`} />
          ))}
        </Wrap>
    </Frame>
  )
}

const Frame = styled.div`
    position: relative;
    width: 350px;
    height: 613px;
    background-color: pink;
    margin: 0 auto;
`

const Wrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    padding: 0 23px;
    background-color: aqua;
    bottom: 43px;
    gap: 10px;
`

const Picture = styled.img`
    width: 146px;
    height: 220px;
`
