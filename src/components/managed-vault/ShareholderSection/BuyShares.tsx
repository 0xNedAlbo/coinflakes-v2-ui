import { Section } from "@/components/common/Section";
import { DepositForm } from "./DepositForm";

export function BuyShares() {
    return (
        <Section heading="Buy Shares" headingAlign="center">
            <DepositForm></DepositForm>
        </Section>
    );
}
