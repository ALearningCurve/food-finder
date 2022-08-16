import { Address } from "../../interfaces/Location";

export default function SimpleAddress(props: { address: Address }) {
    const { formattedAddress } = props.address
    return (
        <p>{formattedAddress}</p>
    )
}