let number = 5;
let str = '문자열 입력'; // “ “도 묶음 가능
let prime = 1.5123;
let is_ok = true; // 참
let is_not = false; // 거짓
let undefi; // 변수 이름만, 초기화 x
let empty = null; // 비어 있음

console.log(undefi, empty); // 여러 개 출력

const sym1 = Symbol('test'); // 심볼 함수로 값 생성
let symbolVar1 = sym1; // 변수 초기화

const airline = ["비행기", 320, "airbus", ["V1", true]];
const obj1 = {};

const obj2 = {
 name: "John Doe",
 age: 30,
 isMale: true,
 };

console.log(symbolVar1.toString()); // 문자열 변환 출력
console.log(obj1, obj2, airline); // 여러 개 출력

// 사용자 정보 map 객체 생성
const users = new Map(); 
users.set("user1",{id: 2, password: "password456"}); //사용자 정보 추가

//map 객체의 모든 사용자 정보 반복 출력력
for(const [username, user] of users)
{
    console.log('사용자 이름: ${username}', 'ID: ${user.id}');
    console.log('비밀번호: ${user.password}');
}

const usernames = new Set(); //Set 객체 활용 예) 이름만 저장할 set 객체 생성

usernames.add("user1"); //사용자 이름 추가
usernames.add("user2");

//Set 객체의 모든 사용자 이름 반복 출력
for(const username of usernames)
{
    console.log('사용자 이름: ${username}')
}