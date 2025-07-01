import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { auth, signIn } from "../utils/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();

  if (session?.user) {
    redirect("dashboard");
  }

  return (
    <>
      <div className="relative min-h-screen w-full">
        {/* Background Grid + Radial Gradient */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
        </div>

        {/* Login Card */}
        <div className="flex min-h-screen items-center justify-center px-4">
          <Card className="w-full max-w-md shadow-md border border-gray-200 bg-white">
            <CardHeader>
              <h1 className="text-3xl font-semibold text-center text-gray-800">
                Welcome to BillWise
              </h1>
              <p className="mt-2 text-sm text-center text-gray-500">
                Sign in to manage your invoices
              </p>
            </CardHeader>
            <CardContent>
              <form
                action={async () => {
                  "use server";
                  await signIn("google");
                }}
              >
                <button
                  type="submit"
                  className="w-full mt-4 flex items-center justify-center gap-3 rounded-md bg-black px-5 py-3 text-white font-medium transition hover:bg-black/80 shadow"
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#4285F4"
                      d="M24 9.5c3.5 0 6.7 1.3 9.1 3.6l6.8-6.8C35.2 2.1 29.9 0 24 0 14.8 0 6.9 5.8 3.1 14.2l7.9 6.1C12.9 13.5 17.9 9.5 24 9.5z"
                    />
                    <path
                      fill="#34A853"
                      d="M46.1 24.5c0-1.4-.1-2.7-.4-4H24v7.6h12.6c-.6 3.4-2.7 6.3-5.8 8.2l8.9 6.9c5.2-4.8 6.4-11.8 6.4-18.7z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.9 28.3c-1.2-3.4-1.2-7.1 0-10.4L3 11.8c-3.2 6.3-3.2 13.7 0 20l7.9-6.1z"
                    />
                    <path
                      fill="#EA4335"
                      d="M24 48c6.5 0 12-2.1 16-5.8l-8.9-6.9c-2.4 1.6-5.4 2.5-8.6 2.5-6.1 0-11.1-4-13-9.3l-7.9 6.1C6.9 42.2 14.8 48 24 48z"
                    />
                  </svg>
                  Sign in with Google
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

function Auth() {
  throw new Error("Function not implemented.");
}
