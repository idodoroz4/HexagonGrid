class Vec {
    x: number;
    y: number;

	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}
	
	magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y)
	}

	scalarMultiple(k: number) {
		return new Vec(k * this.x, k * this.y)
	}

	normalize() {
		return this.scalarMultiple(1 / this.magnitude())
	}

	add(v: Vec) {
		return new Vec(this.x + v.x, this.y + v.y)
	}

	subtract(v: Vec) {
		return this.add(v.scalarMultiple(-1))
	}
}

class SVGCommands {
    commands: string[];

	constructor() {
		this.commands = [];
	}

	toString() {
		return this.commands.join(' ')
	}

	//svg move to command
	M(vec: Vec) {
		this.commands.push(`M${vec.x} ${vec.y}`)
		return this
	}

	//svg draw line to point from current position command
	L(vec: Vec) {
		this.commands.push(`L${vec.x} ${vec.y}`)
		return this
	}

	//svg bezier quadratic curve command
	Q(controlVec: Vec, endVec: Vec) {
		this.commands.push(`Q${controlVec.x} ${controlVec.y} ${endVec.x} ${endVec.y}`)
		return this
	}

	//svg shortcut close path command
	Z() {
		this.commands.push('Z')
		return this
	}
}

//returns the path's "d" attribute for the hexagon
export function generateHexSVG(sideLength: number, borderRadius: number) {
	//from geometry of a hexagon
	var width = Math.sqrt(3) * sideLength
	var height = 2 * sideLength

	//a, b, c, d, e and f represent the vertices
	var a, b, c, d, e, f
	//start at the top point
	a = new Vec(width / 2, 0)
	b = new Vec(width, height / 4)
	c = new Vec(width, 3 * height / 4)
	d = new Vec(width / 2, height)
	e = new Vec(0, 3 * height / 4)
	f = new Vec(0, height / 4)

	if(borderRadius == 0) {
		var pointyHexagon = new SVGCommands()
		return pointyHexagon.M(a).L(b).L(c).L(d).L(e).L(f).Z().toString()
	}

	/*for hexagons with curved corners, we use the quadratic curve command
	the vertex itself will be the control point
	the start point will be a point slightly to the left of the vertex along the perimeter of the hexagon
	and the end point will be a point slightly to the right of the vertex along the perimeter of the hexagon
	the distance that the start and end points are along the adjacent sides is given by the curve radius*/
	var dl = f.subtract(a).normalize().scalarMultiple(borderRadius)
	var dr = b.subtract(a).normalize().scalarMultiple(borderRadius)
	var dd = new Vec(0, borderRadius)

	var roundedHexagon = new SVGCommands()
	roundedHexagon
		.M(a.add(dl))
		.Q(a, a.add(dr))
		.L(b.subtract(dr))
		.Q(b, b.add(dd))
		.L(c.subtract(dd))
		.Q(c, c.add(dl))
		.L(d.subtract(dl))
		.Q(d, d.subtract(dr))
		.L(e.add(dr))
		.Q(e, e.subtract(dd))
		.L(f.add(dd))
		.Q(f, f.subtract(dl))
		.Z()

    var normalHexagon = new SVGCommands()
        normalHexagon
            .M(a)
            .L(b)
            .L(c)
            .L(d)
            .L(e)
            .L(f)
            .Z()

	return normalHexagon.toString()
}