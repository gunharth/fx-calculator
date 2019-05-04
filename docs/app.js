const fixerUir = 'http://data.fixer.io/api/latest?base=EUR&symbols=USD,SEK,CHF&access_key=ac560b25d88736ba6f79abe0e3b7e11f';
// const fixerUir = 'rates.json';

document.querySelectorAll('select').forEach(element => {
    element.innerHTML = `
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="CHF">CHF</option>
        <option value="SEK">SEK</option>
    `;
});

document.querySelector('button').addEventListener('click', () => {
    const inputValue = document.querySelector('[name="input-value"]').value;
    const inputCurrency = document.querySelector('[name="input-currency"]').value;
    const outputCurrency = document.querySelector('[name="output-currency"]').value;

    convert(inputValue, inputCurrency, outputCurrency)
    .then((outputValue) => {
        document.querySelector('[name="output-value"]').value = outputValue;
    });
})

function convert(inputValue, inputCurrency, outputCurrency) {

    return new Promise((resolve, reject) => {
        fetch(fixerUir)
            .then(response => {
                if (response.status == 200) {
                    return response.json();
                } else {
                    return Promise.reject('failed to downlod rates');
                }
            })
            .then((data) => {
                let rates = data['rates'];
                rates['EUR'] = 1;
                if (inputCurrency != 'EUR') {
                    inputValue = inputValue / rates[inputCurrency];
                }
                resolve(inputValue * rates[outputCurrency]);
            })
    })
}
