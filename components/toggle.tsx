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

  return (
    <div>
      <div
        className="bg-blue-400 border rounded p-1 pl-3"
        onClick={handleVisabilityToggle}
      >
        <h1>
          {" "}
          <span>{visable ? "▼" : "▶"}</span>
          <span className="ml-3">{props.name}</span>
        </h1>
      </div>
      <div className={"ml-3 " + (visable ? "" : "hidden")}>
        {props.children}
      </div>
    </div>
  );
}
