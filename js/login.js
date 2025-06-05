import { session_set, session_get, session_check, signup_session_get } from './session.js';
import { encrypt_text, decrypt_text } from './crypto.js';
import { generateJWT, checkAuth } from './jwt_token.js';

// // 세션에서 회원가입 정보를 가져와 userInfo로 설정
// const storedUser = signup_session_get();
// const userInfo = storedUser ? storedUser.getUserInfo() : null;

// 전역 쿠키 설정 함수 (이미 정의되어 있던 코드)
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const [cookieName, cookieValue] = cookies[i].split("=");
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

//실패 횟수 쿠키 저장 및 제한 함수
function login_failed() {
    let failCount = parseInt(getCookie("login_fail_cnt")) || 0;
    failCount += 1;

    setCookie("login_fail_cnt", failCount, 1); // 하루 저장

    // 상태 출력
const statusDiv = document.getElementById("login_status");
    if (failCount >= 3) {
        statusDiv.innerText = `로그인 실패 횟수: ${failCount}회. 로그인 가능 횟수 초과.`;
        document.getElementById("login_btn").disabled = true;
    } else {
        statusDiv.innerText = `로그인 실패 횟수: ${failCount}회`;
    }
}
    //로그인 시도 제한 확인 함수
function check_login_block() {
    let failCount = parseInt(getCookie("login_fail_cnt")) || 0;
    const statusDiv = document.getElementById("login_status");

    if (failCount >= 3) {
        document.getElementById("login_btn").disabled = true;
        statusDiv.innerText = `로그인 실패 횟수: ${failCount}회. 로그인 가능 횟수 초과.`;
    }
}

function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
    const emailInput = document.getElementById('typeEmailX');
    const idsave_check = document.getElementById('idSaveCheck');
    let get_id = getCookie("id");
    
    if(get_id) {
        emailInput.value = get_id;
        idsave_check.checked = true;
    }
    //세션 유무 검사
    session_check();
    // 로그인 차단 검사 추가
    check_login_block();
}

// 로그인 횟수 증가 함수
function login_count() {
    let count = parseInt(getCookie("login_cnt")) || 0;
    count += 1;
    setCookie("login_cnt", count, 7); // 7일간 저장
    console.log(`로그인 횟수: ${count}`);
}

// 로그아웃 횟수 증가 함수
function logout_count() {
    let count = parseInt(getCookie("logout_cnt")) || 0;
    count += 1;
    setCookie("logout_cnt", count, 7); // 7일간 저장
    console.log(`로그아웃 횟수: ${count}`);
}

const check_xss = (input) => {
    // DOMPurify 라이브러리 로드 (CDN 사용)
    const DOMPurify = window.DOMPurify;
    // 입력 값을 DOMPurify로 sanitize
    const sanitizedInput = DOMPurify.sanitize(input);
    // Sanitized된 값과 원본 입력 값 비교
    if (sanitizedInput !== input) {
        // XSS 공격 가능성 발견 시 에러 처리
        alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
        return false;
    }
    // Sanitized된 값 반환
    return sanitizedInput;
 };

 //로그인 검증
const check_input = () => {
    // 전역 변수 추가, 맨 위 위치
    const idsave_check = document.getElementById('idSaveCheck');
    const loginForm = document.getElementById('login_form');
    const loginBtn = document.getElementById('login_btn');
    const emailInput= document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');

    const c = '아이디, 패스워드를 체크합니다';
    alert(c);

    const userInfo = signup_session_get();// userinfo
    
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const sanitizedPassword = check_xss(passwordValue);
    // check_xss 함수로 비밀번호 Sanitize
    const sanitizedEmail = check_xss(emailValue);
    // check_xss 함수로 비밀번호 Sanitize
    
    // 전역 변수 추가, 맨 위 위치
    const payload = {
        id: emailValue,
        exp: Math.floor(Date.now() / 1000) + 3600 // 1시간 (3600초)
    };
    const jwtToken = generateJWT(payload);

    if (emailValue === '') {
        alert('이메일을 입력하세요.');
        return false;
    }

    if (passwordValue === '') {
        alert('비밀번호를 입력하세요.');
        return false;
    }

    console.log('이메일:', emailValue);
    console.log('비밀번호:', passwordValue);
    
    if (!userInfo) {
        alert("회원가입 정보가 없습니다. 회원가입을 먼저 해주세요.");
        return;
    }
    // 임시 로그인 정보 검증
    if (emailValue !== userInfo.email || passwordValue !== userInfo.password) {
        alert('로그인 정보가 틀렸습니다.');
        login_failed(); // 실패 카운트 증가
        return false;
    }

    // 검사 마무리 단계 쿠키 저장, 최하단 submit 이전
    if(idsave_check.checked == true) { // 체크박스가 체크상태다?
        alert("쿠키를 저장합니다." + emailValue);
        setCookie("id", emailValue, 1); // 쿠키생성. 1일 저장
        alert("쿠키 값 :" + emailValue);
    }
    else{ // 아이디 체크 x
        setCookie("id", emailValue, 0); //날짜를 0 - 쿠키 삭제
    }

    // if (emailValue.length > 10) {
    //     //alert('아이디는 최소 5글자 이상 입력해야합니다.');
    //     alert('아이디는 최대 10글자 미만 입력해야합니다.');
    //     return false;
    // }
    // if (passwordValue.length > 15) {
    //     alert('비밀번호는 반드시 15글자 미만 입력해야합니다.');
    //     return false;
    // }
    const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/) !== null;
    if (!hasSpecialChar) {
        alert('패스워드는 특수문자를 1개 이상 포함해야합니다.');
        return false;
    }
    const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
    const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
    if (!hasUpperCase || !hasLowerCase) {
        alert('패스워드는 대소문자를 1개 이상 포함해야합니다.');
        return false;
    }

    // 3글자 이상 반복 체크 (예: abcabc)
    const repeatPattern = /(.{3,})\1+/;
    if (repeatPattern.test(passwordValue)) {
        alert('패스워드에 3글자 이상의 반복된 패턴은 사용할 수 없습니다.');
        return false;
    }

    // 2자리 숫자 반복 체크 (예: 121212, 565656)
    const numberRepeatPattern = /(\d{2})\1+/;
    if (numberRepeatPattern.test(passwordValue)) {
        alert('패스워드에 연속된 숫자 2자리 이상 반복은 사용할 수 없습니다.');
        return false;
    }

    if (!sanitizedEmail) {
    // Sanitize된 비밀번호 사용
        return false;
    }
    if (!sanitizedPassword) {
    // Sanitize된 비밀번호 사용
        return false;
    }
    
    session_set(); // 세션 생성
    localStorage.setItem('jwt_token', jwtToken);//토큰 로컬에 저장
    console.log("성공! 폼 제출함")
    loginForm.submit();

};

// login.js
function logout() {
    // 1) 세션 삭제
    if (typeof session_del === 'function') {
        session_del();
    }
    if (typeof sessionStorage !== 'undefined') {
        sessionStorage.clear();
    }

    // 2) 로컬스토리지의 JWT 토큰 삭제
    localStorage.removeItem('jwt_token');

    alert('로그아웃 되었습니다.');

    // 3) 로그인 페이지로 이동
    window.location.href = '../login/login.html';
}

// document.getElementById("login_btn").addEventListener('click', check_input);
// 로그인 버튼이 존재할 때만 연결
const loginBtn = document.getElementById("login_btn");
if (loginBtn) {
    loginBtn.addEventListener('click', check_input);
}

// // DOMContentLoaded 이후 logout 버튼에 이벤트 연결
// document.addEventListener('DOMContentLoaded', () => {
//     init();
//     const btn = document.getElementById('logout_btn');
//     if (btn) {
//         btn.addEventListener('click', logout);
//     }
// });
document.addEventListener('DOMContentLoaded', () => {
  // 로그인 화면인 경우에만 init() 호출
  if (document.getElementById('typeEmailX')) {
    init();
  }

  // 로그인 후 페이지인 경우에만 checkAuth() + init_logined() 호출
  if (typeof isAuthenticated === 'function' && isAuthenticated()) {
    checkAuth();
    init_logined();
  }

  // 로그아웃 버튼(로그인 후 페이지)에만 이벤트 연결
  const btn = document.getElementById('logout_btn');
  if (btn) {
    btn.addEventListener('click', logout);
  }
});
