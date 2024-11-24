import { useEffect, useRef, useState } from "react";
import debounce from "../helpers/debounce";

const skeleton = [
	{
    lg: { left: 56, top: 83 },
    sm: { left: 64, top: 83 } 
	},
	{
    lg: { left: 32, top: 67 },
    sm: { left: 18, top: 67} 
	},
	{
    lg: { left: 56, top: 52 },
    sm: { left: 62,top: 52 } 
	},
	{
    lg: { left: 34, top: 40 },
    sm: { left: 20, top: 40 } 
	},
	{
    lg: { left: 56, top: 28 },
    sm: { left: 62, top: 28 } 
	},
	{
    lg: { left: 34, top: 16 },
    sm: { left: 24, top: 16 } 
	},
]

const Skeleton = ({setStage, stage}: { setStage: any, stage: any }) => {
  const [isMobile, setIsMobile] = useState(false); 

  const skeletonRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef(stage);

  const updateView = () => {
    if(window.innerWidth < 1024) {
      setIsMobile(true)
    }
    else {
      setIsMobile(false)
    }
  }

  const nextStage = (n: number) => { 
    if(!skeletonRef.current) return;
    skeletonRef.current.style.zIndex = '-1';

    setTimeout(() => {
      updateStage(n);
    }, 2000);
  }

  const updateStage = (n: number) => {
    if(stageRef.current == n) {
      if(!skeletonRef.current) return;
      skeletonRef.current.style.zIndex = '1';
      return;
    }
    else if(n > stageRef.current) {
      setStage(stageRef.current + 1);
      nextStage(n);
    }
    else {
      setStage(stageRef.current - 1);
      nextStage(n);
    }
  }

  useEffect(() => {
    stageRef.current = stage;
  }, [stage])

  useEffect(() => {
    updateView()
    window.addEventListener('resize', debounce(updateView))
  }, [])

  return (
    <div 
      className="
        absolute left-0 
        top-0 w-full h-full
      "
      ref={skeletonRef}
    >
      {skeleton.map((item, i) => {
        return (
          <div 
            className="
              absolute cursor-pointer 
              lg:w-[200px] lg:h-[200px]
              sm:w-[140px] sm:h-[140px]
              w-[80px] h-[80px]
            "
            style={{
              left: `${isMobile? item.sm.left: item.lg.left}%`,
              top: `${isMobile? item.sm.top: item.lg.top}%`
            }}
            onClick={() => updateStage(i)}
            key={`${item.lg.top}-${i}`}
          />
        )
      })}
    </div>
  )
}

export default Skeleton;