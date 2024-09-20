export const currencyFormatter = (amount)=>{
    const formatter = Intl.NumberFormat('en-US' , {
        currency: 'PKR',
        style: 'currency'
    });

    return formatter.format(amount)
}