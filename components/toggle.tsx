import { useEffect, useState } from "react"

export default function Toggle(props: { children: any, visable: boolean, name: string }) {
    const [visable, setVisable] = useState<Boolean>(props.visable ?? true);

    const handleVisabilityToggle = () => {
        setVisable(!visable);
    }

    useEffect(() => {
        setVisable(props.visable);
    }, [props.visable]);

    return (
        <div>
            <div className="bg-blue-400 border rounded p-1 pl-3" onClick={handleVisabilityToggle}>
                <h1> <span>{visable ? "▼" : "▶"}</span><span className="ml-3">{props.name}</span></h1>
            </div>
            <div className={"ml-3 " + (visable ? "" : "hidden")} >
                {props.children}
            </div>
        </div>

    )
}