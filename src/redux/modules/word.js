// word.js
import { db } from "../../firebase";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Actions (액션 타입들. 액션 타입을 정해주는 부분.)
const LOAD = 'word/LOAD'
const CREATE = 'word/CREATE';
const DELETE = 'word/DELETE';
const UPDATE = 'word/UPDATE';

// 초기값 설정해서 생성하는 것임
const initialState = {
    list: [],
}

// Action Creators (액션 생성 함수. 액션 타입에 대한 액션 객체를 만들어줘야 함. 액션 객체를 return 해줘야 함.)
// 액션을 생성하면 리듀서가 자동으로 실행됨. 
export function loadword(word_list) {
    return { type: LOAD, word_list };
}


export function createlist(word) {
    console.log("액션 크리에이트 생성")
    return { type: CREATE, word };
}

export function updatelist(word_index) {
    console.log("액션 업데이트 생성")
    return { type: UPDATE, word_index };
}

export function deletelist(word_index) {
    console.log("액션 리무브 생성")
    return { type: DELETE, word_index };
}


// middlewares 
export const loadwordFB = () => {
    return async function (dispatch) {
        const word_data = await getDocs(collection(db, "words"));
        // console.log(word_data);

        // 배열 형태로 데이터 바꾸기
        let word_list = [];

        word_data.forEach((word) => {
            word_list.push({ id: word.id, ...word.data() });
        });

        console.log(word_list);

        dispatch(loadword(word_list));
    }
}

// 파라미터에 받아올 데이터 넣기. 새로운 단어 정보 넣을 거니까 word 라고 명명함.
export const createlistFB = (word) => {
    return async function (dispatch) {
        // word를 collection words 에 추가하는 변수 docRef 선언
        const docRef = await addDoc(collection(db, "words"), word);
        console.log(docRef);
        // docRef에서 gecDoc 하여 _word 구해옴
        const _word = await getDoc(docRef);
        console.log(_word);
        // ..._word.data()를 사용하여 
        const word_data = { id: _word.id, ..._word.data() };
        console.log(word_data);

        dispatch(createlist(word_data));
    }
}

export const updatelistFB = (word_id, isCompleted) => {
    return async function (dispatch, getState) {
        const docRef = doc(db, "words", word_id);
        console.log(docRef);
        await updateDoc(docRef, { completed: isCompleted });
        // 클릭할 때마다 true/false 를 변경할 수 있는 방법
        // 1. getDoc 사용해서 데이터 찾고, 거기서 Completed 값 끄집어내서 !값 으로 표현
        // 2. redux-thunk 에 매개변수 'isCompleated'를 추가해서 값을 컴포넌트로부터 받아오고 !값으로 표현

        console.log(getState().word.list);
        const _word_list = getState().word.list;
        const word_index = _word_list.findIndex((w) => {
            return w.id === word_id;
        });
        console.log(word_index);

        dispatch(updatelist(word_index));
    }
}



// Reducer 
// parameter 를 보면 state = {}, action = {} 이런 식으로 기재되어 있는데, 이건 parameter 에 기본값을 준 것
// 이번 예시에서 기본값을 줬다는 말의 의미는 state 에 아무값이 없다면 {}(빈 딕셔너리) 을 넣은 것으로 생각해달라는 것.
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        // switch case "" (스위치 케이스 문)은 어떨 때에 뭐를 해 라는 것.
        // do reducer stuff
        case "word/LOAD": {
            return { list: action.word_list };
        }
        case "word/CREATE": {
            console.log("이제 값을 추가할 거야")
            // case 문 안에서 return해주는 값이 새로운 state(상태값)가 되는 것
            // bucket 프로젝트의 예시에서는 우리가 입력한 어떤 값을 추가해줘야 함.
            // 그래서 return 의 {} 안에는 우리가 하나 추가한 리스트가 들어가야 함. 
            // 그 리스트를 넣기 위해 새로운 변수 new_bucket_list 를 선언
            // 기존 list 배열의 요소를 불러오는 게 '...state.list' , 새로운 요소를 추출한 게 'action.bucket'. 
            // 여기서 action 은 액션 생성 함수에서 만든 return 값. return 의 딕셔너리에서 bucket 값을 끄집어 내야 하므로 action.bucket 한 것.
            const new_word_list = [...state.list, action.word];
            return { list: new_word_list };
        };
        case "word/UPDATE": {
            console.log("이제 값을 바꿀거야")
            const new_word_list = state.list.map((val, idx) => {
                if (parseInt(action.word_index) === idx) {
                    if (val.completed === true) {
                        return { ...val, completed: false }
                    } else {
                        return { ...val, completed: true }
                    }
                } else {
                    return val;
                }
            });
            // console.log({ list: new_word_list });
            return { list: new_word_list };
        };

        case "bucket/DELETE": {
            console.log("이제 값을 지울거야")
            const new_word_list = state.list.filter((val, idx) => {
                console.log(action.word_index !== idx, action.word_index, idx);
                return parseInt(action.word_index) !== idx
            });
            console.log(new_word_list)
            return { list: new_word_list };
        };

        default: return state;
    }
}