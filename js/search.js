document.getElementById("search_btn_msg").addEventListener("click", search_message);
 function search_message(){
    alert("검색을 수행합니다!");
 }

// 두 번째 함수 정의 (같은 이름 - 중첩 확인용)
function search_message() {
    let msg = "검색을 수행합니다.";
    alert(msg);
}

function wordcheck(word, list){
    word = word.trim();
    for(let i = 0; i < list.length; i++) {
      if(word.includes(list[i])) {
        return true;
      }
    }
    return false;
  }

function googleSearch() {
    const searchTerm = document.getElementById("search_input").value; // 검색어로 설정
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;

    //입력된 문자가 없으면 검색X
    if(searchTerm.trim() == ""){
        alert("검색어가 없습니다.");
        return false;
    }

    //유해 단어 검열
    const harmfulword = ["중간평가","기말평가","중간과제","기말과제","학점"];

    if(wordcheck(searchTerm,harmfulword))
    {
        alert("유해 단어입니다. 검색할 수 없습니다.");
        return false;
    }
    
     // 새 창에서 구글 검색을 수행
    window.open(googleSearchUrl, "_blank"); // 새로운 창에서 열기.
     return false;
}