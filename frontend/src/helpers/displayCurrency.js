const displayGHSCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-GH', { // en-GH is the locale for Ghana
        style: "currency",
        currency: 'GHS', // Set currency to Ghana Cedi
        minimumFractionDigits: 2
    });

    return formatter.format(num);
}

export default displayGHSCurrency;
