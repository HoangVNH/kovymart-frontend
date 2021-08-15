import PropTypes from 'prop-types';

const Utils = {
  Description(props) {
    const text = props.text ? props.text : "";

    return (
      <>
        {text.match(/[^\r\n]+/g).map((item) => 
          <>{item}<br /> </>
        )}
      </>
    )
  },
  Money(props) {
    const money = props.money ? props.money : 0;

    const defaultOptions = {
      significantDigits: 1,
      thousandsSeparator: ',',
      decimalSeparator: '.',
      symbol: 'đ'
    };

    const currencyFormatter = (value) => {
      if (typeof value !== 'number') {
        value = 0.0;
      }

      const options = { ...defaultOptions };
      value = value.toFixed(options.significantDigits);

      const [currency, decimal] = value.split('.');
      
      return <>
        {decimal > 0 ?
          <>{currency.replace(/\B(?=(\d{3})+(?!\d))/g,
            options.thousandsSeparator)}{options.decimalSeparator}{decimal} {options.symbol}
          </>
          :
          <>{currency.replace(/\B(?=(\d{3})+(?!\d))/g,
            options.thousandsSeparator)} {options.symbol}
          </>}
      </>
    };

    const output = currencyFormatter(money);

    return (
      <>
        {output}
      </>
    );
  }
}

Utils.Description.propTypes = {
    text: PropTypes.string
};

Utils.Money.propTypes = {
    money: PropTypes.number
};

export default Utils;
