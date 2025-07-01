import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, signIn } from "../utils/auth";
import { SubmitButton } from "../components/SubmitButton";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();

  if (session?.user) {
    redirect("dashboard");
  }

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      {/* <div className="flex w-full h-screen px-8 items-center justify-center">
        <Card className="max-w-sm px-4">
          <CardTitle>
            <h1 className="text-2xl font-bold">Login</h1>
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardContent>
            <form
              action={async (formData) => {
                "use server";
                await signIn("nodemailer", formData);
              }}
              className="flex flex-col gap-y-4"
            >
              <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="hello@hello.com"
                />
              </div>
              <SubmitButton title="Log In" />
            </form>
          </CardContent>
        </Card>
      </div> */}
      <div>
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button type="submit">Signin With Google</button>
        </form>
      </div>
    </>
  );
}

function Auth() {
  throw new Error("Function not implemented.");
}
