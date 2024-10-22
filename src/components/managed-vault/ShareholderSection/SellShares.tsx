import { Section } from "@/components/common/Section";
import { RedeemForm } from "./RedeemForm";

export function SellShares() {
    return (
        <Section heading="Sell Shares" headingAlign="center">
            <RedeemForm></RedeemForm>
        </Section>
    );
}
