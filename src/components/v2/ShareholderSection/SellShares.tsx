import { Section } from "@/components/common/Section";
import { WithdrawForm } from "./WithdrawForm";

export function SellShares() {
    return (
        <Section heading="Sell Shares" headingAlign="center">
            <WithdrawForm></WithdrawForm>
        </Section>
    );
}
