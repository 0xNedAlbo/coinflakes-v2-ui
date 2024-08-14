import DepositForm from "./DepositForm";
import Section from "../Section";

function BuyShares() {
    return (
        <Section heading="Buy Shares" headingAlign="center">
            <DepositForm></DepositForm>
        </Section>
    );
}

export default BuyShares;
