import { useEffect, useRef, useState } from "react";
import Skeleton from "./components/Skeleton";

const canvasSize = {
	width: 1362,
	height: 1780
}

const App = () => {
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

		contextRef.current?.clearRect(0, 0, canvasSize.width, canvasSize.height);
	}

	const setContext = () => {
		if(!canvasRef.current) return

		contextRef.current = canvasRef.current.getContext("2d");
	}

	useEffect(() => {
		clearRect();
		drawMap();
		drawChar(800, 1500);
	}, [char, map, stage])

	useEffect(() => {
		setContext();
		loadMap();
		loadChar();
	}, [])

	return (
		<main className="
			flex items-center justify-center 
			lg:w-[100vw] max-w-[100vw]
			overflow-hidden relative
		">
			<Skeleton setStage={setStage}/>
			<canvas 
				ref={canvasRef}  
				width={1362} height={1780} 
				className="lg:w-full min-h-[100%] max-w-[180%]"
				></canvas>
		</main>
	);
}

export default App;
