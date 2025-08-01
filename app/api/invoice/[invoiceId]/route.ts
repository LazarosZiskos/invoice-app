import { prisma } from "@/app/utils/db";
import { NextResponse } from "next/server";
import jsPDF from "jspdf";
import { formatCurrency } from "@/app/utils/formatCurrency";

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
      fromAddress: true,
      bankName: true,
      iban: true,
      swift: true,
      bic: true,
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

  // From Section
  pdf.setFontSize(12);
  pdf.text("From", 20, 40);
  pdf.setFontSize(10);
  pdf.text([data.fromName, data.fromEmail, data.fromAddress], 20, 45);

  // Client Section
  pdf.setFontSize(12);
  pdf.text("Bill To", 20, 70);
  pdf.setFontSize(10);
  pdf.text([data.clientName, data.clientEmail, data.clientAddress], 20, 75);

  // Bank Section
  pdf.setFontSize(12);
  pdf.text("Bank Details", 20, 205);
  pdf.setFontSize(10);
  pdf.text(["IBAN:", "BANK NAME:", "SWIFT:", "BIC:"], 20, 210);
  pdf.text(
    [data.iban ?? "", data.bankName ?? "", data.swift ?? "", data.bic ?? ""],
    50,
    210
  );

  // Invoice Details
  pdf.setFontSize(10);
  pdf.text(`Invoice Number: #${data.invoiceNumber}`, 120, 40);
  pdf.text(
    `Date: ${new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(data.date)}`,
    120,
    45
  );
  pdf.text(`Due Date: ${data.dueDate} days`, 120, 50);

  // Item table header
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.text("Description", 20, 120);
  pdf.text("Quantity", 100, 120);
  pdf.text("Rate", 130, 120);
  pdf.text("Total", 160, 120);

  // draw header line
  pdf.line(20, 122, 190, 122);

  // actual values
  pdf.setFont("helvetica", "normal");
  pdf.text(data.invoiceItemDescription, 20, 130);
  pdf.text(data.InvoiceItemQuantity.toString(), 100, 130);
  pdf.text(
    formatCurrency({
      amount: data.InvoiceItemRate,
      currency: data.currency as any,
    }).toString(),
    130,
    130
  );
  pdf.text(
    formatCurrency({
      amount: data.total,
      currency: data.currency as any,
    }).toString(),
    160,
    130
  );

  // Total Section
  pdf.line(20, 135, 190, 135);
  pdf.line(20, 136, 190, 136);
  pdf.setFont("helvetica", "bold");
  pdf.text(`Total Amount: (${data.currency})`, 120, 150);
  pdf.text(
    formatCurrency({
      amount: data.total,
      currency: data.currency as any,
    }),
    160,
    150
  );

  // note section
  if (data.note) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text("Note:", 20, 170);
    pdf.text(data.note, 20, 175, { maxWidth: 170 });
  }

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
