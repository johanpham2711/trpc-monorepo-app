import ClientSide from "@web/app/ClientSide";
import { trpc } from "@web/app/trpc";

export default async function Home() {
    const { greeting } = await trpc.hello.query({ name: `Tom` });
    return (
        <div>
            {greeting}
            <ClientSide />
        </div>
    );
}

