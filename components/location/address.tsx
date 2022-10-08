import { Address } from "../../interfaces/Location";

/**
 * Formats and displays the given address.
 * @param param0 prop with the address field that represents the address to display
 * @returns JSX that displays the address
 */
export default function SimpleAddress({ address }: { address: Address }) {
  const { formattedAddress } = address;
  // make displaying the address its own component just in case if in the future the address becomes
  // something that must be displayed differently
  return (
    <div>
      <p>{formattedAddress}</p>
    </div>
  );
}
