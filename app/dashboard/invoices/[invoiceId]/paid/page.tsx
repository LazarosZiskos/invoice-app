import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import PaidGif from "@/public/paid-gif.gif";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/app/components/SubmitButton";
import { markAsPaidAction } from "@/app/actions";
import { prisma } from "@/app/utils/db";
import { redirect } from "next/navigation";
import { requireUser } from "@/app/utils/hooks";

async function Authorize(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) {
    return redirect("/dashboard/invoices");
  }
}

type Params = Promise<{ invoiceId: string }>;

export default async function MarkAsPaid({ params }: { params: Params }) {
  const { invoiceId } = await params;
  const session = await requireUser();
  await Authorize(invoiceId, session.user?.id as string);

  return (
    <div className="flex flex-1 items-center justify-center ">
      <Card className="max-w-[500px] px-4">
        <CardTitle>Mark as Paid?</CardTitle>
        <CardDescription>
          Are you sure you want to mark this Invoice as paid?
        </CardDescription>
        <CardContent>
          <Image src={PaidGif} alt="paid-gif" className="rounded-lg" />
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Link
            href="/dashboard/invoices"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>
          <form
            action={async () => {
              "use server";
              await markAsPaidAction(invoiceId);
            }}
          >
            <SubmitButton title="Mark as Paid" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
