import styled from "styled-components";

export const InputField = styled.div`
    margin-bottom: 0.75em;

    input {
        width: 100%;
        font-size: 0.7rem;
        border-radius: 0.3em;
        padding: 0.3em 0.5em;
    }
`;

export const CheckboxField = styled.div`
    margin-bottom: 0.75em;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    input {
        appearance: none;
        height: 2em;
        width: 2em;
        margin-right: 1.5em;
        background-color: var(--checkbox-bg-color);
        border-radius: 0.3em;
        cursor: pointer;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        outline: none;


        &::after {
            font-family: "Font Awesome 5 Free";
            content: "\f14a";
            font-weight: 900;
            font-size: 1.1rem;
            color: var(--checkbox-text-color);
            display: block;
            visibility: hidden;
        }

        &:hover {
            background-color: var(--checkbox-hover-color);
        }   

        &:checked {
            background-color: var(--checkbox-checked-color);
        }

        &:checked::after {
            visibility: visible;
        }
    }

    label {
        color: var(--checkbox-text-color);
    }
`;
