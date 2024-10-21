import DepositForm from "./DepositForm";
import Section from "../../common/Section";

function BuyShares() {
    return (
        <Section heading="Buy Shares" headingAlign="center">
            <DepositForm></DepositForm>
        </Section>
    );
}

export default BuyShares;
