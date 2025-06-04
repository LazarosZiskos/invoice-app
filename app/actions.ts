"use server"

import { requireUser } from "./utils/hooks"
import { parseWithZod } from "@conform-to/zod"
import { invoiceSchema, onboardingSchema } from "./utils/zodSchemas"
import { redirect } from "next/navigation"
import { prisma } from "./utils/db"

export async function onboardUser(prevstate: any, formData: FormData) {
    const session = await requireUser()

    const submission = parseWithZod(formData, {
        schema: onboardingSchema,
    })

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

    return redirect("/dashboard")
}

export async function createInvoice(prevstate: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: invoiceSchema,
    })

    if (submission.status !== "success") {
        return submission.reply()
    }

    const data = await prisma.invoice.create({
        data: {
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientEmail,
            clientName: submission.value.clientName,
            invoiceName: submission.value.invoiceName,
            date:submission.value.date, //string
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
        }
    })



}