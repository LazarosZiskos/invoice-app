import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "../utils/auth";

export default function Login() {
  return (
    <>
      <div className="flex w-full h-screen px-8 items-center justify-center">
        <Card className="max-w-sm px-4">
          <CardTitle>
            <h1 className="text-2xl font-bold">Login</h1>
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardContent>
            <form
              action={async () => {
                "use server";
                await signIn();
              }}
              className="flex flex-col gap-y-4"
            >
              <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input placeholder="hello@hello.com" />
              </div>
              <Button>Submit</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
