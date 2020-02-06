
const add_later = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                reject('Erreur: nombre négatif');
            }
            resolve(a+b);
        }, 1000);
    });
};

add_later(3, 4)
.then((x) => {
    console.log('result = ' + x);
    return add_later(x, -5);
})
.then((x) => {
    console.log('result = ' + x);
})
.catch((err) => console.log(err))
.then(() => console.log('after catch'));

console.log('blablabla');
