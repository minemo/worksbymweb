import { NextPage } from "next";
import Link from "next/link";
import { grahamScan2 } from "@thi.ng/geom-hull";
import { ReadonlyVec, Vec2, rotateAroundPoint2 } from "@thi.ng/vectors";
import { useEffect, useRef, useState } from "react";

//Generate n random points on canvas
const generatePoints = (n: number, max?: Vec2) => {
	let w = max?.x ?? window.innerWidth;
	let h = max?.y ?? window.innerHeight;
	const points = [];
	for (let i = 0; i < n; i++) {
		points.push(new Vec2([Math.random() * w, Math.random() * h]));
	}
	return points;
};

//Draw when canvas document is loaded
const draw = (
	cv: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D,
	points: Vec2[]
) => {
	ctx.clearRect(0, 0, cv.width, cv.height);
	ctx.beginPath();
	points.forEach((p) => ctx.lineTo(p.x, p.y));
	ctx.closePath();
	ctx.stroke();
};

function setupCanvas(canvas: HTMLCanvasElement) {
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext('2d');
    ctx?.scale(dpr, dpr);
    return ctx;
  }

const useCanvas = (callback: any) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = setupCanvas(canvas!);
		callback([canvas, ctx]);
	}, [callback]);

	return canvasRef;
};

const Canvas = () => {
	const [position, setPosition] = useState({});

    document.addEventListener("mousemove", (e)=>{
        
    })

	const canvasRef = useCanvas(([canvas, ctx]: [HTMLCanvasElement, CanvasRenderingContext2D]) => {
        const width = canvas.width;
        const height = canvas.height;
		ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 5;
        ctx.lineJoin = 'round';

        // let angle = 90;
        // let svec: Vec2 = new Vec2([1, 1]);
        // svec = rotateAroundPoint2([], svec, new Vec2([0.5, 0.5]), angle) as Vec2;

        // ctx.beginPath();
        // ctx.moveTo(0, 0);
        // ctx.lineTo(svec.x*width, svec.y*height);
        // ctx.stroke();

		const points = generatePoints(5, new Vec2([width, height]));
		const hull = grahamScan2(points) as Vec2[];


		ctx.beginPath();
		hull.forEach((p) => ctx.lineTo(p.x, p.y));
		ctx.closePath();
        ctx.stroke();

		//setPosition({ x, y });
	});

	return (
		<canvas
			style={{
				position: "absolute",
				width: "100%",
				height: "100%",
				pointerEvents: "none",
			}}
			ref={canvasRef}
		/>
	);
};

const Dsplit: NextPage = () => {
	return (
		<div>
			<Link passHref href="/projects">
				<h1 style={{ position: "absolute" }}>Dynamic Mesh Splitting</h1>
			</Link>
			<Canvas></Canvas>
		</div>
	);
};

export default Dsplit;
