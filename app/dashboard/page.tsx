import { requireUser } from "../utils/hooks";
import { signOut } from "../utils/auth";

export default async function DashboardRoute() {
  const session = await requireUser();

  return (
    <div>
      <h1>Hello from the dashboard Route.</h1>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
