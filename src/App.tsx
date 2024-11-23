import { useEffect, useRef, useState } from "react";

function App() {
	const canvas = useRef<HTMLCanvasElement>(null);
	const context = useRef<CanvasRenderingContext2D | null>(null);
	const [char, setChar] = useState<HTMLImageElement>();
	const [map, setMap] = useState<HTMLImageElement>();

	const loadChar = () => {
		const image = new Image();
    image.src = "/assets/character.png";
    image.onload = () => {
			setChar(image);
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
		if(!context.current || !map) return

		context.current.drawImage(map, 0, 0, 1362, 1780);
	}

	const drawChar = (x: number, y: number) => {
		if(!context.current || !char) return

		context.current.drawImage(char, x, y, x + 60, y + 60);
	}

	const setContext = () => {
		if(!canvas.current) return

		context.current = canvas.current.getContext("2d");
	}

	useEffect(() => {
		drawChar(20, 20)
	}, [char])

	useEffect(() => {
		drawMap()
	}, [map])

	useEffect(() => {
		setContext();
		loadChar();
		loadMap();

	}, [])

	return (
		<main className="flex items-center justify-center w-[100vw] overflow-hidden">
			<canvas ref={canvas}  width={1362} height={1780}>

			</canvas>
		</main>
	);
}

export default App;
