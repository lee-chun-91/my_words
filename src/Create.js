// 리액트 패키지를 불러옵니다.
import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { createlist, createlistFB } from "./redux/modules/word"


const Create = (props) => {

    const word = React.useRef();
    const description = React.useRef();
    const ex = React.useRef();

    let history = useHistory();

    //어떤 상수 하나 만들고, 거기에 useDispatch() 먹여주면 됨.
    //그럼 이 상수에는 useDispatch()가 리턴한 어떤 객체가 들어갈 것.
    const dispatch = useDispatch()
    console.log(dispatch);

    const addList = () => {
        dispatch(createlistFB({ word: word.current.value, description: description.current.value, ex: ex.current.value, completed: false }));
        history.goBack();
    }


    return (
        <Wrap>
            <p>단어명을 적어주세요</p>
            <input type="text" ref={word}></input>
            <p>설명을 적어주세요</p>
            <input type="text" ref={description}></input>
            <p>예시를 적어주세요</p>
            <input type="text" ref={ex}></input>

            <button onClick={addList}> 등록하기</button>
        </Wrap>
    )

}


const Wrap = styled.div`

`

export default Create;