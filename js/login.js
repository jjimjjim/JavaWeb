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

const check_input = () => {
    const loginForm = document.getElementById('login_form');
    const loginBtn = document.getElementById('login_btn');
    const emailInput= document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');
    
    const c = '아이디, 패스워드를 체크합니다';
    alert(c);
    
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    const sanitizedPassword = check_xss(passwordValue);
    // check_xss 함수로 비밀번호 Sanitize
    const sanitizedEmail = check_xss(emailValue);
    // check_xss 함수로 비밀번호 Sanitize
    
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

    if (emailValue.length > 10) {
        //alert('아이디는 최소 5글자 이상 입력해야합니다.');
        alert('아이디는 최대 10글자 미만 입력해야합니다.');
        return false;
    }
    if (passwordValue.length > 15) {
        alert('비밀번호는 반드시 15글자 미만 입력해야합니다.');
        return false;
    }
    // const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/) !== null;
    // if (!hasSpecialChar) {
    //     alert('패스워드는 특수문자를 1개 이상 포함해야합니다.');
    //     return false;
    // }
    // const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
    // const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
    // if (!hasUpperCase || !hasLowerCase) {
    //     alert('패스워드는 대소문자를 1개 이상 포함해야합니다.');
    //     return false;
    // }

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

    loginForm.submit();
};
    
    document.getElementById("login_btn").addEventListener('click', check_input);
