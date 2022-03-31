import React from "react";
import styled from "styled-components";
import { useHistory, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loadwordFB } from "./redux/modules/word";

// BucketList 컴포넌트를 import 해옵니다. import [컴포넌트 명] from [컴포넌트가 있는 파일경로];
import List from "./List";
import Create from "./Create";


function App() {

  let history = useHistory();

  const dispatch = useDispatch()

  // firestore db 가 잘 들어와졌는지 확인하는 것
  React.useEffect(() => {
    dispatch(loadwordFB());
  });

  return (
    <>
      <Container>
        <Title>내 단어장</Title>
        <Line />
        <Btn>
          <button onClick={() => { history.push("/create") }}>새 단어 입력하기</button>
        </Btn>
        {/* 컴포넌트를 넣어줍니다. */}
        {/* <컴포넌트 명 [props 명]={넘겨줄 것(리스트, 문자열, 숫자, ...)}/> */}
        <Switch>
          <Route path="/" exact>
            <List />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
        </Switch>

      </Container>


      {/* <button onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}> 위로 가기</button> */}

    </>
  );
}


const Container = styled.div`
max-width: 75vw;
min-height: 80vh;
background-color: #fff;
padding: 16px;
margin: 20px auto;
border-radius: 5px;
border: 1px solid #ddd;
`;

const Title = styled.h1`
color: slateblue;
text-align: center;
`;

const Line = styled.hr`
margin: 16px 0px;
border: 1px dotted #ddd;
`;

const Btn = styled.div`
text-align: center;
`;

export default App;
