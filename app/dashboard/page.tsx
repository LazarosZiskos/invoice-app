import { requireUser } from "../utils/hooks";
import { signOut } from "../utils/auth";
import { DashboarBlocks } from "../components/DashboardBlocks";
import { InvoiceGraph } from "../components/InvoiceGraph";

export default async function DashboardRoute() {
  const session = await requireUser();

  return (
    <>
      <DashboarBlocks />
      <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
        <InvoiceGraph />
      </div>
    </>
  );
}
