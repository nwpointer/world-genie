"use client"

import { useCallback, useRef, useState } from "react";

export default function Demo() {
    const [active, setActive] = useState(false)
    const ref = useRef<HTMLDivElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    let stroke: number[][] = []
    const [w, setW] = useState(10);
    const size = {
        width: 300,
        height: 300
    }
    let history: (typeof HTMLImageElement)[] = []
    const [brush, setBrush] = useState('draw')
    const update = (ctx:CanvasRenderingContext2D, x:number, y:number, w:number) => {
        if(brush === 'draw'){
            draw(ctx, x, y, w)
        } else {
            erase(ctx, x, y, w)
        }
    }
    const mouse = (e: any) => {
        // alert("e")
        const b = e.target.getBoundingClientRect();
        // Mouse position
        const x = Math.round(e.clientX - b.left);
        const y = Math.round(e.clientY - b.top);


        if (ref.current && ref.current.style) {
            ref.current.style["top"] = `${y - w}px`
            ref.current.style["left"] = `${x - w}px`
            // ref.current.style.width = `${x}px`
        }

        if (active && canvas.current) {
            const ctx = canvas.current.getContext("2d")
            const n = stroke.length
            stroke.push([x, y])

            if (ctx) update(ctx, x, y, w)
            if (n > 1) {
                let [lx, ly] = stroke[n - 1];
                let [dx, dy] = [x - lx, y - ly];
                // lerp
                let p = Math.max(Math.abs(dx), Math.abs(dy))
                for (let i = 0; i < p; i++) {
                    if (ctx) update(ctx, lx + (i * dx / p), ly + (i * dy / p), w)
                }
            }
        }
    }
    const exportCanvas = () => {
        if (canvas.current) {
            var link = document.createElement('a');
            link.download = 'filename.png';
            link.href = canvas.current.toDataURL()
            link.click();
        }
    }
    const draw = (ctx:CanvasRenderingContext2D, x:number, y:number, w:number) => {
        ctx.beginPath();
        ctx.arc(x, y, w, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    const erase = (ctx:CanvasRenderingContext2D, x:number, y:number, w:number) => {
        ctx.save()
        ctx.globalCompositeOperation = 'destination-out'
        ctx.arc(x, y, w, 0, 2 * Math.PI, true);
        ctx.clip();
        ctx.clearRect(x - w, y - w, w * 2, w * 2);
        ctx.restore()
    }

    const clear = () => {
        if (canvas.current) {
            const ctx = canvas.current.getContext("2d")
            ctx?.clearRect(0,0,size.width, size.height)
        }
        // this does not work
        // history.splice(0,history.length)
        // history.length = 0;
    }
    const snapShot = useCallback(() => {
        if (canvas.current) {
            const url = canvas.current.toDataURL();
            const img = new Image();
            img.src = url
            // @ts-expect-error
            history.push(img)
        }
    }, [history.length]) 
    const undo = useCallback(() =>{
        history.pop()
        const last = history[history.length-1]
        if(canvas.current){
            const ctx = canvas.current.getContext("2d")
            ctx?.clearRect(0,0, size.width, size.height)
            // @ts-expect-error
            last && ctx?.drawImage(last, 0,0);
        }
    } , [history.length])
    

    const minW = 2;
    const maxW = 30;
    const onwheel = (e: { deltaY: number; }) => {
        const d = e.deltaY / 10;
        let nw = Math.round(Math.min(Math.max(w + d, minW), maxW));
        setW(nw)
        mouse(e);
    }
    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="flex flex-col justify-center items-center flex-1 relative h-screen">
                <div className="bg-blue-500 cursor-none relative"
                    onPointerMove={mouse}
                    onPointerDown={(e) => { setActive(true); mouse(e) }}
                    onPointerUp={() => { setActive(false); stroke = []; snapShot() }}
                    onPointerLeave={() => { setActive(false); stroke = [] }}
                    style={size}
                    onWheel={onwheel}
                >
                    <div ref={ref} style={{ width: w * 2, height: w * 2 }} className="bg-red-500 opacity-50 rounded-full relative pointer-events-none"></div>
                    <canvas ref={canvas} className="absolute pointer-events-none top-0" {...size} />
                </div>

            </div>
            <div style={{ background: "rgb(30, 30, 30)" }} className="flex shadow  flex-col bg-blue-800 p-8 w-full md:max-w-sm">
                <button className="mt-4" onClick={exportCanvas}>export</button>
                <button className="mt-4" onClick={clear}>clear</button>
                <button className="mt-4" onClick={undo}>undo</button>
                <button className="mt-4" onClick={()=>setBrush(brush ==='draw' ? 'erase' : 'draw')}>{brush} </button>
                <div>{w}</div>
            </div>
        </div>
    )
}