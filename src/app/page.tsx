"use server";

import { redirect } from "next/navigation";

function App() {
    redirect("/v2/ethereum");
    return <></>;
}

export default App;
