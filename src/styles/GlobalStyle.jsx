import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"


const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: 'GongGothicMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
    ${reset}

    :root {
        --main-color: #ED7A3A;
        --bg-color: #F3EBE0;
        --white-color: #FFFFFF;
    }

    * {
        box-sizing: border-box;
    }

    html {
        font-family: 'GongGothicMedium';
    }

  /* input[type="radio"] {
        --active: #ED7A3A;
        --active-inner: #fff;
        --focus: 2px rgba(237, 122, 58, 0.3);
        -webkit-appearance: none;
        -moz-appearance: none;
        height: 126px;
        width: 126px;
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
            width: 126px;
            &:checked {
                --o: 1;
            }
        }
    } */
    
    /* input[type="radio"] {
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
    } */
`;

export default GlobalStyles;