import { encrypt_text, decrypt_text } from './crypto.js';

// 회원가입 정보 세션에 암호화 저장
export function save_signup_session(signupObj) {
    if (sessionStorage) {
        const userInfo = signupObj.getUserInfo();
        const jsonStr = JSON.stringify(userInfo);
        const encrypted = encrypt_text(jsonStr);
        sessionStorage.setItem("SignUp_Info", encrypted);  // 회원가입용 세션 키
    } else {
        alert("세션 스토리지를 지원하지 않습니다.");
    }
}

// 로그인 후 복호화 → 콘솔 출력
export function load_signup_session() {
    const data = sessionStorage.getItem("SignUp_Info");
    if (data) {
        const decrypted = decrypt_text(data);
        const userInfo = JSON.parse(decrypted);
        console.log("복호화된 회원가입 정보:", userInfo);
    } else {
        console.log("회원가입 세션 정보가 없습니다. 출력하지 않습니다.");
    }
}

export function session_set(){ //세션 저장(객체)
    let id = document.querySelector("#typeEmailX");
    let password = document.querySelector("#typePasswordX");
    let random = new Date(); // 랜덤 타임스탬프
    const obj = { // 객체 선언
        id : id.value,
        otp : random
    }
    if (sessionStorage) {
        const objString = JSON.stringify(obj); // 객체-> JSON 문자열 변환
        let en_text = encrypt_text(objString); // 암호화
        sessionStorage.setItem("Session_Storage_id", id.value);
        sessionStorage.setItem("Session_Storage_object", objString);
        sessionStorage.setItem("Session_Storage_pass", en_text);
    } else {
        alert("세션 스토리지 지원 x");
    }
}

export function session_get() { //세션 읽기
    if (sessionStorage) {
        return sessionStorage.getItem("Session_Storage_pass");
    } else {
        alert("세션 스토리지 지원 x");
    }   
}

function init_logined(){
    if(sessionStorage){
        decrypt_text(); // 복호화 함수
    }
    else{
        alert("세션 스토리지 지원 x");
    }
}

export function session_check() { //세션 검사
    if (sessionStorage.getItem("Session_Storage_id")) {
        alert("이미 로그인 되었습니다.");
        location.href='../login/index_login.html'; // 로그인된 페이지로 이동
    }
}

function session_del() {//세션 삭제
    if (sessionStorage) {
        sessionStorage.removeItem("Session_Storage_test");
        alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
    } else {
        alert("세션 스토리지 지원 x");
    }
}
