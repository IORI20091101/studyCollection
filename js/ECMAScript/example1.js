// function* fibonacci() {
//   var a = yield 1;
//   yield a * 2;
// }
//
// var it = fibonacci();
// console.log(it);          // "Generator {  }"
// console.log(it.next());   // 1
// console.log(it.send(10)); // 20
// console.log(it.close());  // undefined
// console.log(it.next());


function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i){
  yield i;
  yield* anotherGenerator(i);
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20