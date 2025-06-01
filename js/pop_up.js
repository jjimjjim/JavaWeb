function pop_up() {
    var cookieCheck = getCookie("popupYN");
    if (cookieCheck != "N"){
        window.open("../popup/popup.html", "팝업테스트", "width=400, height=300, top=10, left=10");
    }
 }

function show_clock(){
    let currentDate= new Date(); // 현재시스템날짜객체생성
    let divClock= document.getElementById('divClock');
    let msg = "현재시간: ";
    
    if(currentDate.getHours()>12){  // 12시보다크면오후아니면오전
        msg += "오후";
        msg += currentDate.getHours()-12+"시";
    }
    
    else {
        msg += "오전";
        msg += currentDate.getHours()+"시";
    }
        msg += currentDate.getMinutes()+"분";
        msg += currentDate.getSeconds()+"초";
        divClock.innerText= msg;

    if (currentDate.getMinutes()>58) {    //정각1분전빨강색출력
        divClock.style.color="red";
    }
    setTimeout(show_clock, 1000);  //1초마다갱신
   }

function closePopup() {
    if (document.getElementById('check_popup').value) {//id값이 존재하면
        setCookie("popupYN", "N", 1); //클릭 이후 쿠키 set 함
        console.log("쿠키를 설정합니다.");
        self.close(); //현재 창 닫을게
    }
 }
// //바뀌는 애
// function over(obj) {
//     obj.src="image/kkp.png";
// }
// //원본
function out(obj) {
    obj.src="image/kakaopage.png";
}
//바뀌는 애애
const over = (obj) => {
    obj.src = "image/kkp.png";
};

function setCookie(name, value, expiredays) {
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "; path=/";
}

function getCookie(name) {
    var cookie = document.cookie;
    console.log("쿠키를 요청합니다.");
    if (cookie != "") {
        var cookie_array = cookie.split("; ");
        //=를 제외한 배열을 반복
        for ( var index in cookie_array) {
            var cookie_name = cookie_array[index].split("=");
            //popupYN을 찾아 값 리턴
            if (cookie_name[0] == "popupYN") { 
                return cookie_name[1];
            }
        }
    }
    return ;
}