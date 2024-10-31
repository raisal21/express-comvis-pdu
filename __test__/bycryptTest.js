import bcrypt from 'bcryptjs';
const password = 'Password123!';
const saltRounds = 12;  // Sesuaikan ini dengan yang digunakan di hash yang sudah ada

bcrypt.hash(password, saltRounds, function(err, hash) {
    console.log(hash);  // Ini akan mengeluarkan hash baru
});
