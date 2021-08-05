const FotmatMoney = ({ money }) => {

    const defaultOptions = {
        significantDigits: 0,
        thousandsSeparator: ',',
        decimalSeparator: '.',
        symbol: 'VNĐ'
    }

    const currencyFormatter = (value) => {
        if (typeof value !== 'number') value = 0.0
        const options = { ...defaultOptions }
        value = value.toFixed(options.significantDigits)

        const [currency, decimal] = value.split('.')
        return ` ${currency.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            options.thousandsSeparator
        )} ${options.symbol}`
    }
    const output = currencyFormatter(money)
    return (
        <>
            {output}
        </>
    )
}

export default FotmatMoney