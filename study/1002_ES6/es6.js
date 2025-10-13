const map = new Map();
map.set('1002', '러닝, 헬스');
map.set('1003', '연휴, 아싸');

console.log(map.get("1002"));
console.log(map.get("1003"));

// Map 관련 다양한 함수 실습(자습 시간)

const set = new Set();
set.add('1002');
set.add('1003');
set.add('1002');

console.log(set.has('1002'));
console.log(set.size);

// for ... of 반복문 실습
for (const val of set) {
    console.log(val);
}

for (const val of map) {
    console.log(val);
}
// map 에서 for 문을 사용해서 키값만 출력하도록 구현하시오.
for (const key of map) {
    console.log(key[0]);
}

// 고차 배열 메소드
const nums = [1, 2, 3, 4];
// map
const squares = nums.map(n => n ** 2); // [1, 4, 9, 16]
console.log(`squares: ${squares}`);
// filter
const evens = nums.filter(n => n % 2 === 0); // [2, 4]
console.log(`evens: ${evens}`);
// reduce (값을 계속 더해주는 메소드)
const sum = nums.reduce((acc, cur) => acc + cur, 0); // 10
console.log(`sum: ${sum}`);
// find
const found = nums.find(n => n > 2); // 3
console.log(`found: ${found}`);
// some
const hasNegative = nums.some(n => n < 0); // false
console.log(`hasNegative: ${hasNegative}`);
// every
const allPositive = nums.every(n => n > 0); // true
console.log(`allPositive: ${allPositive}`);
// flatMap
const nested = [1, 2, 3];
const duplicated = nested.flatMap(n => [n, n]); // [1,1,2,2,3,3]
console.log(`duplicated: ${duplicated}`);

// 구조 분해 + 스프레드
const user = {
    name: "mingi",
    age: '25',
    city: 'Hwaseong'
};

const {name, age, city} = user;
console.log(`name: ${name}`);
console.log(`age: ${age}`);
console.log(`city: ${city}`);

// 스프레드
const user2 = {
    ...user,
    name: 'jane',
};

console.log(`user2: ${user2}`);