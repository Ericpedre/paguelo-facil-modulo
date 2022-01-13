import {pay, setPay, setPayAndPay} from './modules/pay.js';

let btnPagar = document.getElementById('pagar');

btnPagar.addEventListener('click', function (e) {
    setPayAndPay(15.99, 'Prueba Heineken 4');
})