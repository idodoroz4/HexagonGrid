import React, { Component, CSSProperties } from 'react'
import PropTypes from 'prop-types'
import { generateHexSVG } from './generateHexSVG'

const elevationStyleHover = (elevation: number) => {
	return {
		cursor: 'pointer',
		transform: `translateY(${elevation/2}px)`
	}
}

const elevationStyleActive = (elevation: number) => {
	return {
		cursor: 'pointer',
		transition: 'all 0.1s ease',
		transform: `translateY(${elevation}px)`
	}
}

type HexStyle = {
    normal: object,
    hover: object,
    active: object,
};

export type HexagonProps = {
    sideLength?: number;
    borderRadius?: number;
    elevation?: number;
    shadow?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    img?: string;
    text?: string;
    textStyle?: {[key: string]: any};
    styles?: HexStyle;
    href?: string;
    target?: string;
    onClick?: () => void;
}

const Hexagon: React.FC<HexagonProps> = (props) => {
    const {
        sideLength = 100,
        borderRadius = 12,
        fill = 'white',
        elevation = 12,
        shadow = '#e2e2e2',
        stroke = '#bbb',
        strokeWidth = 0,
        styles = {normal : {}, hover: {}, active: {}},
        textStyle = {},
        img = '',
        text = '',
        href = '',
        target = '',
        onClick = () => null,
    } = props

    const thHexagonStyleBase: CSSProperties | undefined = {
        userSelect: 'none',
        stroke,
        strokeWidth: `${strokeWidth}px`, 
        transition: 'all 0.2s ease',
    }

    const thHexagonStyleNormal = Object.assign({}, thHexagonStyleBase, styles.normal)
    const thHexagonStyleHover = Object.assign({}, thHexagonStyleBase, elevation ? elevationStyleHover(elevation) : {}, styles.hover)
    const thHexagonStyleActive = Object.assign({}, thHexagonStyleBase, elevation ? elevationStyleActive(elevation) : {}, styles.active)

    const [hexStyle, setHexStyle] = React.useState<CSSProperties>(thHexagonStyleNormal);

    const width = Math.sqrt(3) * sideLength;
	const height = 2 * sideLength + elevation;

    const fontSizeOffset = textStyle?.fontSize ? 0.3 * parseInt(textStyle.fontSize) : 0;

    const hexagon = (
        <>
            <path fill={fill} d={generateHexSVG(sideLength, borderRadius)} />
            <image href={img} width={0.7 * width} height={0.5 * height} x={0.15 * width} y={0.12 * height} />
            <text fill="#bbb" strokeWidth="0" style={textStyle}>
                <tspan x={width/2} y={height * 3 / 4 + fontSizeOffset} textAnchor="middle">
                    {text}
                </tspan>
            </text>
        </>
    )


    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height} >
            <svg y={elevation}><path fill={shadow} d={generateHexSVG(sideLength, borderRadius)} /></svg>
            <g
                style={hexStyle}
                onMouseOver={() => setHexStyle(thHexagonStyleHover)}
                onMouseLeave={() => setHexStyle(thHexagonStyleNormal)}
                onMouseDown={() => setHexStyle(thHexagonStyleActive)}
                onMouseUp={() => setHexStyle(thHexagonStyleHover)}
                onClick={onClick}>
                {!href ? hexagon : <a href={href} target={target || '_blank'}>{hexagon}</a>}
            </g>
        </svg>
    )
}

export default Hexagon;

/*
export default class Hexagon_EX extends Component {
	constructor(props) {
		super(props)
		let { elevation, stroke, strokeWidth, styles: { normal, hover, active } } = this.props
		
		var thHexagonStyleBase = {
			userSelect: 'none',
			stroke,
			strokeWidth: `${strokeWidth}px`, 
			transition: 'all 0.2s ease',
		}

		this.thHexagonStyleNormal = Object.assign({}, thHexagonStyleBase, normal)
		this.thHexagonStyleHover = Object.assign({}, thHexagonStyleBase, elevation ? elevationStyleHover(elevation) : {}, hover)
		this.thHexagonStyleActive = Object.assign({}, thHexagonStyleBase, elevation ? elevationStyleActive(elevation) : {}, active)
		
		this.state = {
			thHexagonStyle: this.thHexagonStyleNormal
		}
	}

	render() {
		let { sideLength, borderRadius, elevation, shadow, img, text, textStyle, href, target, onClick, fill } = this.props
		let { thHexagonStyle } = this.state

		let width = Math.sqrt(3) * sideLength
		let height = 2 * sideLength + elevation

		let fontSizeOffset = textStyle.fontSize ? 0.3 * parseInt(textStyle.fontSize) : 0
		
		const hexagon = (
			<React.Fragment>
				<path fill={fill} d={generateHexSVG(sideLength, borderRadius)} />
				<image href={img} width={0.7 * width} height={0.7 * height} x={0.15 * width} y={0.12 * height} />
				<text fill="#bbb" strokeWidth="0" style={textStyle}>
					<tspan x={width/2} y={height/2 + fontSizeOffset} textAnchor="middle">
						{text}
					</tspan>
				</text>
			</React.Fragment>)

		return (
			<svg
				viewBox={`0 0 ${width} ${height}`}
				width={width}
				height={height} >
				<svg y={elevation}><path fill={shadow} d={generateHexSVG(sideLength, borderRadius)} /></svg>
				<g
					style={thHexagonStyle}
					onMouseOver={() => this.setState({ thHexagonStyle: this.thHexagonStyleHover })}
					onMouseLeave={() => this.setState({ thHexagonStyle: this.thHexagonStyleNormal })}
					onMouseDown={() => this.setState({ thHexagonStyle: this.thHexagonStyleActive })}
					onMouseUp={() => this.setState({ thHexagonStyle: this.thHexagonStyleHover })}
					onClick={onClick}>
					{!href ? hexagon : <a href={href} target={target || '_blank'}>{hexagon}</a>}
				</g>
			</svg>
		)
	}
}

Hexagon.defaultProps = {
	sideLength: 100,
	borderRadius: 12,
	fill: 'white',
	stroke: '#bbb',
	strokeWidth: 0,
	elevation: 12,
	shadow: '#e2e2e2',
	img: '',
	text: '',
	textStyle: {},
	styles: {
		normal: {},
		hover: {},
		active: {}
	},
	href: null,
	target: null,
	onClick: () => {}
}

Hexagon.propTypes = {
	sideLength: PropTypes.number,
	borderRadius: PropTypes.number,
	fill: PropTypes.string,
	stroke: PropTypes.string,
	strokeWidth: PropTypes.number,
	elevation: PropTypes.number,
	shadow: PropTypes.string,
	img: PropTypes.string,
	text: PropTypes.string,
	textStyle: PropTypes.object,
	styles: PropTypes.shape({
		normal: PropTypes.object,
		hover: PropTypes.object,
		active: PropTypes.object
	}),
	href: PropTypes.string,
	target: PropTypes.string,
	onClick: PropTypes.func
}
*/