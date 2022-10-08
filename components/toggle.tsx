import { useEffect, useState } from "react";

/**
 * Component that will toggle hide and show the given child element.
 * @param props: children: the togglable content to hide or show
 *               visable: whether or not the togglable content should be visable
 *               name: the title of the toggle (always visable)
 * @returns JSX element that can be toggled
 */
export default function Toggle(props: {
  children: any;
  visable: boolean;
  name: string;
}) {
  const [visable, setVisable] = useState<Boolean>(props.visable ?? true);

  /**
   * Toggles the visability.
   */
  const handleVisabilityToggle = () => {
    setVisable(!visable);
  };

  // if the visable prop changes, force visability to match
  useEffect(() => {
    setVisable(props.visable);
  }, [props.visable]);

  const arrowStyle = {
    transform: visable ? "rotate(90deg)" : "rotate(0deg)",
    "transform-origin": "center center",
    transition: "transform 200ms ease", // smooth transition
  };

  const togglableContentStyle = {
    "max-height": visable ? "1000px" : "0px",
    opacity: visable ? 1 : 0,
    transition: "all 400ms ease", // smooth transition
    overflow: "hidden",
  };

  return (
    <div>
      <div onClick={handleVisabilityToggle}>
        <h1 className="text-2xl leading-loose font-extrabold">
          <div className="flex flex-row">
            {props.name}
            <div className="ml-3" style={arrowStyle}>
              <span>&#x3e;</span>
            </div>
          </div>
        </h1>
      </div>
      <div
        className={"ml-3 my-4 border-l-4 border-blue-400"}
        style={togglableContentStyle}
      >
        {props.children}
      </div>
    </div>
  );
}
