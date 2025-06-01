var jb = 'hi'; // 변수 선언 후 주석 가능(한줄 주석)
jb='재할당도 ㄱㄴ';
 var a = 1;
 var a = '재선언도 ㄱㄴ';
 var b;
 b = 17;
 console.log(jb);
 console.log(a);
 console.log(b);
    

 if (true) {
    let c = 'let 접근';
    var c_1 = 'var 접근';
}
    
    //console.log(c); // Error?
    console.log(c_1);
    
    let d = 5;
    //let d = '값 재선언'; // Error
    d=10; //재할당 ㄱㄴ
    console.log(d);
    
    const e = '상수1 접근';
    //e = 5; 재할당 안됨
    //const e = 5; 재선언도 안됨됨
    //const f // Error! 초기값 정해라.
    console.log(e);

    //const는는 변하지 않는 값을 쓸때!
    //let은 변할 수 있는 값!
    