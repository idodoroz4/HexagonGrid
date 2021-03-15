import React from 'react';
import assign from 'assign-deep';
import Hexagon, { HexagonProps } from './Hexagon';


const getRanges = (columnCount: number, maxHorizontal: number) => {
	if(maxHorizontal == 1) {
		return Array(columnCount).fill(0).map((_, i) => {
			return [i, i]
		})
	}
	var ranges = [[0, maxHorizontal - 1]]
	for(var c = 1; c <= columnCount; c++) {
		var evenOddModifier = c%2==0 ? 0 : -1
		ranges[c] = [ranges[c-1][1] + 1, ranges[c-1][1] + maxHorizontal + evenOddModifier]
	}
	return ranges
}

const getColumnCount = (tileCount: number, maxHorizontal: number) => {
	if(maxHorizontal == 1) return tileCount
	var columnCount = 0
	var i = 0
	while(i <= tileCount) {
		i += (columnCount%2==0) ? maxHorizontal : maxHorizontal - 1
		columnCount++ 
	}
	return columnCount
}

const getMultipliers = (i: number, ranges: number[][]) => {
	var YMultiplier = ranges.findIndex((range: number[]) => i >= range[0] && i <= range[1])
	var XMultiplier = i - ranges[YMultiplier][0] + (YMultiplier%2==0 ? 0 : 0.5)
	return { XMultiplier, YMultiplier }
}

type HexStyle = {
    normal: object,
    hover: object,
    active: object,
};

type HexagonGridProps = {
    tiles?: HexagonProps[];
    tileSideLengths?: number;
    tileBorderRadii?: number;
    tileElevations?: number;
    tileStrokeWidths?: number;
    tileGap?: number;
    maxHorizontal?: number;
    tileStyles?: HexStyle;
    tileTextStyles?: {[key: string]: any};
}

const HexagonGrid: React.FC<HexagonGridProps> = (props) => {
    const {
        tiles = [],
        tileSideLengths = 100,
        tileBorderRadii = 12,
        tileElevations = 12,
        tileStrokeWidths = 0,
        tileGap = 4,
        maxHorizontal = 5,
        tileStyles = {},
        tileTextStyles = {},
    } = props;

    const tileCount = tiles.length;

    const singleTileWidth = Math.sqrt(3) * tileSideLengths
    const singleTileHeight = 2 * tileSideLengths + tileElevations

    const columnCount = getColumnCount(tileCount, maxHorizontal)

    const XConst = singleTileWidth + tileGap
    const YConst = 3 * tileSideLengths / 2 + tileElevations + tileGap

    const fullWidth = XConst * (maxHorizontal == 1 ? 1.5 : Math.min(tileCount, maxHorizontal))
    const fullHeight = (singleTileHeight + tileGap) + ((columnCount - 1) * YConst)

    const ranges = getRanges(columnCount, maxHorizontal)

    return (
        <svg width={fullWidth} height={fullHeight}>
            {tiles.map(({fill, stroke, shadow, img, text, textStyle, styles, href, target, onClick}, i) => {
                const { XMultiplier, YMultiplier } = getMultipliers(i, ranges);
                
                //deep merge & clone
				const mergedStyles = assign({}, JSON.parse(JSON.stringify(tileStyles)), styles);

                return (
                    <svg key={i} x={XMultiplier * XConst} y={YMultiplier * YConst} width={singleTileWidth} height={singleTileHeight}>
                        <Hexagon
                            sideLength={tileSideLengths}
                            borderRadius={tileBorderRadii}
                            elevation={tileElevations}
                            img={img}
                            text={text}
                            textStyle={Object.assign({}, tileTextStyles, textStyle)}
                            styles={mergedStyles}
                            fill={fill}
                            stroke={stroke}
                            strokeWidth={tileStrokeWidths}
                            shadow={shadow}
                            href={href}
                            target={target}
                            onClick={onClick}
                        />
                    </svg>)	
            })}
        </svg>
    )
}

export default HexagonGrid;

/*
export default class TiledHexagons extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		let { tiles, tileSideLengths, tileBorderRadii, tileElevations, tileStrokeWidths, tileGap, maxHorizontal, tileStyles, tileTextStyles } = this.props
		let tileCount = tiles.length

		let singleTileWidth = Math.sqrt(3) * tileSideLengths
		let singleTileHeight = 2 * tileSideLengths + tileElevations

		let columnCount = getColumnCount(tileCount, maxHorizontal)

		let XConst = singleTileWidth + tileGap
		let YConst = 3 * tileSideLengths / 2 + tileElevations + tileGap

		let fullWidth = XConst * (maxHorizontal == 1 ? 1.5 : Math.min(tileCount, maxHorizontal))
		let fullHeight = (singleTileHeight + tileGap) + ((columnCount - 1) * YConst)

		let ranges = getRanges(columnCount, maxHorizontal)

		return (
			<svg width={fullWidth} height={fullHeight}>
				{tiles.map(({fill, stroke, shadow, img, text, textStyle, styles, href, target, onClick}, i) => {

					let { XMultiplier, YMultiplier } = getMultipliers(i, ranges)

					//deep merge & clone
					let mergedStyles = assign({mergedStyles}, JSON.parse(JSON.stringify(tileStyles)), styles)

					return (
						<svg key={i} x={XMultiplier * XConst} y={YMultiplier * YConst} width={singleTileWidth} height={singleTileHeight}>
							<Hexagon
								sideLength={tileSideLengths}
								borderRadius={tileBorderRadii}
								elevation={tileElevations}
								img={img}
								text={text}
								textStyle={Object.assign({}, tileTextStyles, textStyle)}
								styles={mergedStyles}
								fill={fill}
								stroke={stroke}
								strokeWidth={tileStrokeWidths}
								shadow={shadow}
								href={href}
								target={target}
								onClick={onClick}
							/>
						</svg>)	
				})}
			</svg>
		)
	}
}

TiledHexagons.defaultProps = {
	tiles: [],
	tileSideLengths: Hexagon.defaultProps.width,
	tileBorderRadii: Hexagon.defaultProps.borderRadius,
	tileElevations: Hexagon.defaultProps.elevation,
	tileStrokeWidths: Hexagon.defaultProps.strokeWidth,
	tileGap: 4,
	tileStyles: {
		normal: {},
		hover: {},
		active: {}
	},
	tileTextStyles: {},
	maxHorizontal: 5
}

TiledHexagons.propTypes = {
	tiles: PropTypes.arrayOf(PropTypes.shape({
		fill: PropTypes.string,
		stroke: PropTypes.string,
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
	})),
	tileSideLengths: PropTypes.number,
	tileBorderRadii: PropTypes.number,
	tileElevations: PropTypes.number,
	tileStrokeWidths: PropTypes.number,
	tileGap: PropTypes.number,
	tileStyles: PropTypes.shape({
		normal: PropTypes.object,
		hover: PropTypes.object,
		active: PropTypes.object
	}),
	tileTextStyles: PropTypes.object,
	maxHorizontal: PropTypes.number
}
*/
