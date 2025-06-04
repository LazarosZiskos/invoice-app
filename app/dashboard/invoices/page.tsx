import { InvoiceList } from "@/app/components/InvoiceList";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function InvoicesRoute() {
  return (
    <Card>
      <div className="flex items-center justify-between px-4">
        <div>
          <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
          <CardDescription>Manage Your Invoices Right here.</CardDescription>
        </div>
        <Link href="/dashboard/invoices/create" className={buttonVariants()}>
          <PlusIcon /> Create Invoice
        </Link>
      </div>
      <CardContent className="px-4">
        <InvoiceList />
      </CardContent>
    </Card>
  );
}
