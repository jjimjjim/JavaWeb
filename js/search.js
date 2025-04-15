document.getElementById("search_btn_msg").addEventListener('click', search_message);
 function search_message(){
    alert("검색을 수행합니다!");
 }

 // 첫 번째 함수 정의
function search_message() {
    let msg = "검색을 수행합니다 (1번째 함수)";
    alert(msg);
}

// 두 번째 함수 정의 (같은 이름 - 중첩 확인용)
function search_message() {
    let msg = "검색을 수행합니다 (2번째 함수)";
    alert(msg);
}