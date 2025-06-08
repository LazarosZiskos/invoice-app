import { requireUser } from "../utils/hooks";
import { signOut } from "../utils/auth";
import { DashboarBlocks } from "../components/DashboardBlocks";

export default async function DashboardRoute() {
  const session = await requireUser();

  return (
    <>
      <DashboarBlocks />
    </>
  );
}
