"use server";

import { requireUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema, onboardingSchema } from "./utils/zodSchemas";
import { redirect } from "next/navigation";
import { prisma } from "./utils/db";
import { emailClient } from "./utils/mailtrap";
import { formatCurrency } from "./utils/formatCurrency";

export async function onboardUser(prevstate: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: onboardingSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address,
    },
  });

  return redirect("/dashboard");
}

export async function createInvoice(prevstate: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.create({
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      invoiceName: submission.value.invoiceName,
      date: submission.value.date, //string
      dueDate: submission.value.dueDate,
      status: submission.value.status,
      total: submission.value.total,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromAddress,
      fromName: submission.value.fromName,
      currency: submission.value.currency,
      invoiceNumber: submission.value.invoiceNumber,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      InvoiceItemQuantity: submission.value.invoiceItemQuantity,
      InvoiceItemRate: submission.value.invoiceItemRate,
      note: submission.value.note,
      userId: session.user?.id,
    },
  });

  const sender = {
    email: "hello@demomailtrap.co",
    name: "Lazaros Ziskos",
  };

  emailClient.send({
    from: sender,
    to: [{ email: "ziskoslaz@gmail.com" }],
    template_uuid: "36e73082-c8a0-4299-bbbc-eecf92d9a094",
    template_variables: {
      clientName: submission.value.clientName,
      invoiceNumber: submission.value.invoiceNumber,
      dueDate: new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(new Date(submission.value.date)),
      totalAmount: formatCurrency({
        amount: submission.value.total,
        currency: submission.value.currency as any,
      }),
      invoiceLink: `http://localhost:3000/api/invoice/${data.id}`,
    },
  });

  return redirect("/dashboard/invoices");
}

export async function editInvoice(prevState: any, formdata: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formdata, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.update({
    where: {
      id: formdata.get("id") as string,
      userId: session.user?.id,
    },
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      invoiceName: submission.value.invoiceName,
      date: submission.value.date, //string
      dueDate: submission.value.dueDate,
      status: submission.value.status,
      total: submission.value.total,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromAddress,
      fromName: submission.value.fromName,
      currency: submission.value.currency,
      invoiceNumber: submission.value.invoiceNumber,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      InvoiceItemQuantity: submission.value.invoiceItemQuantity,
      InvoiceItemRate: submission.value.invoiceItemRate,
      note: submission.value.note,
    },
  });

  return redirect("/dashboard/invoices");
}

export async function deleteInvoice(invoiceId: string) {
  const session = await requireUser();

  const data = await prisma.invoice.delete({
    where: {
      userId: session.user?.id,
      id: invoiceId,
    },
  });

  return redirect("/dashboard/invoices");
}
