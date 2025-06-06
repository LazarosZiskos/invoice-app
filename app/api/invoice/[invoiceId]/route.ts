import { prisma } from "@/app/utils/db";
import { NextResponse } from "next/server";
import jsPDF from "jspdf";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  const { invoiceId } = await params;

  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
    },
    select: {
      invoiceNumber: true,
      date: true,
      invoiceName: true,
      currency: true,
      fromEmail: true,
      fromName: true,
      clientName: true,
      clientAddress: true,
      clientEmail: true,
      dueDate: true,
      total: true,
      invoiceItemDescription: true,
      InvoiceItemQuantity: true,
      InvoiceItemRate: true,
      note: true,
    },
  });

  if (!data) {
    return NextResponse.json(
      {
        error: "Invoice not found",
      },
      { status: 404 }
    );
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // set font
  pdf.setFont("helvetica");

  //set header
  pdf.setFontSize(24);
  pdf.text(data.invoiceName, 20, 20);

  // Generate pdf as buffer
  const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

  // Return pdf as download

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline;",
    },
  });
}
