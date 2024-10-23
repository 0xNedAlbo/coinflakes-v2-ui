"use server";

import { redirect } from "next/navigation";

function App() {
    redirect("/v2/");
    return <></>;
}
export default App;
