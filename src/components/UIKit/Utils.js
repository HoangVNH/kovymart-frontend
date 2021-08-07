import { Button } from 'antd'

const Utils = {
    Description(props) {
        const text = props.text ? props.text : ""
        return (
            <>
                {text.match(/[^\r\n]+/g).map((item) => {
                    return <>{item}<br /> </>
                })}
            </>
        )
    },
    Money(props) {
        const money = props.money ? props.money : 0
        const defaultOptions = {
            significantDigits: 0,
            thousandsSeparator: ',',
            decimalSeparator: '.',
            symbol: 'đ'
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
}

export default Utils