import { useEffect, useRef, useState } from "react";
import Skeleton from "./components/Skeleton";

const canvasSize = {
	width: 1362,
	height: 1780
}

const points = [
	{
		top: 1500,
		left: 800
	},
	{
		top: 1200,
		left: 450,
	},
	{
		top: 940,
		left: 772,
	}, 
	{
		top: 700,
		left: 470
	},
	{
		top: 510,
		left: 785
	},
	{
		top: 290,
		left: 485
	},
]

const App = () => {
	const charCords = useRef<{
		top: number, 
		left: number
	}>({
		top: 1500,
		left: 800
	})
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const contextRef = useRef<CanvasRenderingContext2D | null>(null);

	const [char, setChar] = useState<{
		left: HTMLImageElement | null,
		right: HTMLImageElement | null
	}>({
		left: null,
		right: null
	});
	const [map, setMap] = useState<HTMLImageElement>();

	const [stage, setStage] = useState(0);

	const loadChar = () => {
		const leftImg = new Image();
    leftImg.src = "/assets/character-left.png";
    
		const rightImg = new Image();
    rightImg.src = "/assets/character-right.png";
    
		leftImg.onload = () => {
			setChar((prev) => ({
				...prev,
				left: leftImg,
			}));
		}
		
		rightImg.onload = () => {
			setChar((prev) => ({
				...prev,
				right: rightImg,
			}));
		}
	}

	const loadMap = () => {
		const image = new Image();
    image.src = "/assets/map.png";
    image.onload = () => {
			setMap(image);
		}
	}

	const drawMap = () => {
		if(!contextRef.current || !map) return

		contextRef.current.drawImage(map, 0, 0, canvasSize.width, canvasSize.height);
	}

	const drawChar = (x: number, y: number) => {
		if(!contextRef.current || !char) return

		const character = stage % 2? char.left: char.right;

		if(!character) return

		contextRef.current.drawImage(character, x, y, 120, 120);
	}

	const clearRect = () => {
		if(!canvasRef.current) return
		
		drawMap();

		contextRef.current?.clearRect(0, 0, canvasSize.width, canvasSize.height)
	}

	const setContext = () => {
		if(!canvasRef.current) return

		contextRef.current = canvasRef.current.getContext("2d");
	}

	const drawFrame = (x: number, y: number) => {
		const goCords = points[stage];
		if (
			charCords.current.left + 2 > goCords.left && charCords.current.left - 2 < goCords.left
		) {
			return;
		}

		clearRect();

		charCords.current.top += y;
		charCords.current.left += x;


		drawMap()
		drawChar(
			charCords.current.left, 
			charCords.current.top
		);		

		window.requestAnimationFrame(() => drawFrame(x, y));
	}

	const animateGoTo = () => {
		const goCords = points[stage];

		const leftStep = (goCords.left - charCords.current.left) / 120;  
		const topStep = (goCords.top - charCords.current.top) / 120;

		window.requestAnimationFrame(() => drawFrame(leftStep, topStep));
	}

	useEffect(() => {
		clearRect();
		drawMap();
		drawChar(
			charCords.current.left, 
			charCords.current.top
		);
	}, [char, map, stage])

	useEffect(() => {
		setContext();
		loadMap();
		loadChar();
	}, [])

	useEffect(() => {
		animateGoTo();
	}, [stage])

	return (
		<main className="
			flex items-center justify-center 
			lg:w-[100vw] max-w-[100vw]
			overflow-hidden relative
		">
			<Skeleton setStage={setStage} stage={stage}/>
			<canvas 
				ref={canvasRef}
				width={1362} height={1780}
				className="lg:w-full min-h-[100%] max-w-[180%]"
			></canvas>
		</main>
	);
}

export default App;
