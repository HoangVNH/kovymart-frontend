import { Button } from 'antd'
const ButtonUI = (props) => {
    const normal = props.normal ? props.normal : false //Button default
    const text = props.text ? props.text : null
    const type = props.type ? props.type : 'primary'
    const block = props.block ? props.block : false
    const disabled = props.disabled ? props.disabled : false
    const href = props.href ? props.href : null
    const size = props.size ? props.size : 'middle'
    const onClick = props.onClick ? props.onClick : null
    const className = props.className ? props.className : ''
    const style = props.style ? props.style : ''
    const withIcon = props.withIcon ? props.withIcon : ""
    let btnStyle = ''
    if (!normal) {
        btnStyle = {
            background: "#ed1b24",
            borderColor: "#ed1b24"
        }
    }
    btnStyle = { ...btnStyle, ...style }

    return (
        <Button
            type={type}
            block={block}
            disabled={disabled}
            href={href}
            size={size}
            onClick={onClick}
            className={className}
            style={btnStyle}
        >{withIcon}{text ? ` ${text}` : null}</Button >
    )
}

// usage
// <ButtonUI
//     default= true
//     withIcon={<MinusOutlined />}
//     text="Button"
//     onClick={handleClick}
// />
export default ButtonUI