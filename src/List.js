// 리액트 패키지를 불러옵니다.
import React from "react";
import styled from "styled-components";
import { } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatelistFB } from "./redux/modules/word";



const List = (props) => {
    const my_words = useSelector((state) => state.word.list);
    const dispatch = useDispatch();

    return (
        <ListStyle>
            {
                my_words.map((word, index) => {
                    return (
                        <ItemStyle completed={word.completed} className="list_item" key={index}>
                            <p>단어</p>{word.word}
                            <p>설명</p>{word.description}
                            <Ex><p>예시</p>
                                {word.ex}</Ex>
                            <br></br>
                            <button onClick={() => {
                                //클릭할 때마다 completed 유무를 바꿔주기 위해 인자로 !word.completed 전달
                                dispatch(updatelistFB(word.id, !word.completed));
                            }}>이해했어요</button>
                        </ItemStyle>
                    );
                })
            }

        </ListStyle>
    );
}

const ListStyle = styled.div`
display: flex;
flex-wrap: wrap;
max-height: 70vh;
height: auto;
overflow-x: hidden;
overflow-y: auto;
`;

const ItemStyle = styled.article`
padding: 10px;
margin: 8px;
width: 240px;
height: auto;
border: 2px solid rgb(10, 112, 41);
border-radius: 5px;
color: ${(props) => props.completed ? "white" : "black"};
background-color: ${(props) => props.completed ? "rgb(10, 112, 41)" : "white"};
font-size: normal;

& p {
    font-size: x-small;
    margin-top: 15px;
}
`;

const Ex = styled.div`
color: skyblue;
font-size: normal;
`


export default List;