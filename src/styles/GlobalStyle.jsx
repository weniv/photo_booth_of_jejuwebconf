import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
${reset}
// :root {
//   /* Color */
//   --main-color: #373737; //타이틀, 질문 제목, 버튼
//   --background-color: #ffffff; //종이질감 배경일 때, 투명도 50% 주기
//   --background-focused-color: #fff000; //종이질감 배경일 때, 포커스 컬러입니다. 투명도 50% 줘야함!
//   --error-color: #eb5757; //주의
//   --text-focused-color : #fff77f; // 종이 질감 배경 외, 포커스 컬러 
//   --disabled-button-color : #bbbbbb;
// }

* {
  box-sizing: border-box;
//   font-family: 'Shinb7Regular';
}

button {
  border: none;
  cursor: pointer;
  background-color: transparent;
}

a {
  text-decoration: none;
  color: inherit;
}

input[type="radio"] {
    --active: #275efe;
    --active-inner: #fff;
    --focus: 2px rgba(39, 94, 254, 0.3);
    --border: #bbc1e1;
    --border-hover: #275efe;
    --background: #fff;
    --disabled: #f6f8ff;
    --disabled-inner: #e1e6f9;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    border: 1px solid var(--bc, var(--border));
    background: var(--b, var(--background));
    transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
    &:after {
        content: "";
        display: block;
        position: absolute;
    }
    &:checked {
        --b: var(--active);
        --bc: var(--active);
        --d-o: 0.3s;
        --d-t: 0.6s;
        --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
    }
    &:hover {
        &:not(:checked) {
            --bc: var(--border-hover);
        }
    }
    &:focus {
        box-shadow: 0 0 0 var(--focus);
    }
    &:not(.switch) {
        width: 40px;
        &:checked {
            --o: 1;
        }
    }
}

input[type="radio"] {
    &:not(.switch) {
        border-radius: 20px;
        &:after {
            width: 10px;
            height: 19px;
            border: 4px solid var(--active-inner);
            border-top: 0;
            border-left: 0;
            left: 12px;
            top: 4px;
            transform: rotate(var(--r, 43deg));
        }
        &:checked {
            --r: 43deg;
        }
    }
}

input[type="radio"] {
    opacity: 0;
    transition: 0.3s;
    &:checked {
        opacity: 1;
    }
}

.ir {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
`;

export default GlobalStyles;
