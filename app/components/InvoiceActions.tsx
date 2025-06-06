import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle,
  DownloadCloud,
  MailIcon,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
import Link from "next/link";

interface iAppProps {
  id: string;
}

export function InvoiceActions({ id }: iAppProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href={`/dashboard/invoices/${id}`}
              className="flex items-center"
            >
              <Pencil className="size-4 mr-2" /> Edit Invoice
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/" className="flex items-center">
              <DownloadCloud className="size-4 mr-2" /> Download Invoice
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/" className="flex items-center">
              <MailIcon className="size-4 mr-2" /> Remind Email
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/" className="flex items-center">
              <Trash className="size-4 mr-2" /> Delete Invoice
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/" className="flex items-center">
              <CheckCircle className="size-4 mr-2" /> Mark as Paid
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
