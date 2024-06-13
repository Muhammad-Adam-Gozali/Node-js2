// Soal 1: Deklarasikan variabel x dengan nilai 10 dan variabel y dengan nilai 20. 
// Kemudian, deklarasikan variabel sum yang menyimpan hasil penjumlahan x dan y.
let x = 10;
let y = 20;
let sum = x + y;
console.log(`1. Hasil penjumlahan x dan y adalah: ${sum}`);

// Soal 2: Apa perbedaan antara var, let, dan const dalam JavaScript?
/* 
   - var: Variabel dengan cakupan fungsi, dapat di-redeclare dan diubah nilainya.
   - let: Variabel dengan cakupan blok, tidak dapat di-redeclare, tetapi dapat diubah nilainya.
   - const: Variabel dengan cakupan blok, tidak dapat di-redeclare dan tidak dapat diubah nilainya setelah inisialisasi.
*/

// Soal 3: Buatlah loop for yang mencetak angka 1 hingga 5.
console.log("3. Loop angka 1 sampai 5:");
for (let i = 1; i <= 5; i++) {
  console.log(i);
}

// Soal 4: Buatlah loop while yang mencetak angka dari 5 hingga 1.
console.log("4. Loop angka 5 sampai 1:");
let j = 5;
while (j >= 1) {
  console.log(j);
  j--;
}

// Soal 5: Buatlah fungsi greet yang menerima satu parameter name dan mencetak "Hello, [name]!" ke konsol.
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet("World");

// Soal 6: Buatlah fungsi add yang menerima dua parameter a dan b dan mengembalikan hasil penjumlahannya.
function add(a, b) {
  return a + b;
}

console.log(`6. Hasil penjumlahan 5 dan 3 adalah: ${add(5, 3)}`);

// Soal 7: Buatlah array fruits dengan elemen "Pepaya", "Mangga", dan "Pisang". Tambahkan "Jambu" ke array tersebut.
let fruits = ["Pepaya", "Mangga", "Pisang"];
fruits.push("Jambu");
console.log(`7. Isi array fruits setelah ditambahkan Jambu: ${fruits}`);

// Soal 8: Gunakan metode map untuk membuat array baru dari array numbers yang berisi nilai numbers dikalikan 2.
let numbers = [1, 2, 3, 4, 5];
let doubledNumbers = numbers.map(number => number * 2);
console.log(`8. Array baru setelah dikalikan 2: ${doubledNumbers}`);

// Soal 9: Buatlah object person dengan properti name bernilai "John" dan age bernilai 30. Tambahkan properti occupation dengan nilai "Developer".
let person = {
  name: "John",
  age: 30
};
person.occupation = "Developer";
console.log(`9. Object person:`, person);

// Soal 10: Buatlah array people yang berisi tiga object, masing-masing dengan properti name dan age. Gunakan metode filter untuk mendapatkan array baru yang hanya berisi orang dengan age di atas 25.
let people = [
  { name: "Alice", age: 24 },
  { name: "Bob", age: 27 },
  { name: "Charlie", age: 30 }
];

let peopleAbove25 = people.filter(person => person.age > 25);
console.log(`10. Orang-orang dengan age di atas 25:`, peopleAbove25);
