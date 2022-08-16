import { Address } from "../../interfaces/Location";


export default function SimpleAddress({ address }: { address: Address }) {
    const { formattedAddress } = address
    // make displaying the address its own component just in case if in the future the address becomes
    // something that must be displayed differently
    return (
        <div>
            <p>{formattedAddress}</p>
        </div>
    )
}