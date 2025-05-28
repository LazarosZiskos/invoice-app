import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../components/SubmitButton";

export default function OnboardingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen w-screen">
      <Card className="px-4 max-w-sm mx-auto">
        <CardTitle className="text-xl">You are almost done!</CardTitle>
        <CardDescription>
          Enter your infomation to create an account
        </CardDescription>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>First Name</Label>
                <Input placeholder="John" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Last Name</Label>
                <Input placeholder="Doe" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Address</Label>
              <Input placeholder="Chad Street 123" />
            </div>
            <SubmitButton title="Finish Onboarding" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
