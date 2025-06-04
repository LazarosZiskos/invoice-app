"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover } from "@/components/ui/popover";
import { Select, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { SelectContent, SelectValue } from "@radix-ui/react-select";
import { CalendarIcon } from "lucide-react";
import { useActionState, useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "../utils/zodSchemas";
import { createInvoice } from "../actions";

export function CreateInvoice() {
  const [lastResult, action] = useActionState(createInvoice, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: invoiceSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <form action={action} id={form.id} onSubmit={form.onSubmit} noValidate>
          <input
            type="hidden"
            name={fields.date.name}
            value={selectedDate.toISOString()}
          />

          <div className="flex flex-col gap-1 w-fit mb-6">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">Draft</Badge>
              <Input
                name={fields.invoiceName.name}
                key={fields.invoiceName.key}
                defaultValue={fields.invoiceName.initialValue}
                placeholder="Test 123"
              />
            </div>
            <p className="text-sm text-red-500">{fields.invoiceName.errors}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="">
              <Label>Invoice No.</Label>
              <div className="flex">
                <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                  #
                </span>
                <Input
                  placeholder="5"
                  className="rounded-l-none"
                  name={fields.invoiceNumber.name}
                  key={fields.invoiceNumber.key}
                  defaultValue={fields.invoiceNumber.initialValue}
                />
              </div>
              <p className="text-sm text-red-500">
                {fields.invoiceNumber.errors}
              </p>
            </div>

            <div>
              <Label>Currency</Label>
              <Select
                defaultValue="EUR"
                name={fields.currency.name}
                key={fields.currency.key}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">
                    United States Dollars -- USD
                  </SelectItem>
                  <SelectItem value="EUR">Euro -- EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-red-500">{fields.currency.errors}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label>From</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Your Name / Company Name"
                  name={fields.fromName.name}
                  key={fields.fromName.key}
                  defaultValue={fields.fromName.initialValue}
                />
                <p className="text-sm text-red-500">{fields.fromName.errors}</p>

                <Input
                  placeholder="Your Email"
                  name={fields.fromEmail.name}
                  key={fields.fromEmail.key}
                  defaultValue={fields.fromEmail.initialValue}
                />
                <p className="text-sm text-red-500">
                  {fields.fromEmail.errors}
                </p>

                <Input
                  placeholder="Your Address"
                  name={fields.fromAddress.name}
                  key={fields.fromAddress.key}
                  defaultValue={fields.fromAddress.initialValue}
                />
                <p className="text-sm text-red-500">
                  {fields.fromAddress.errors}
                </p>
              </div>
            </div>
            <div>
              <Label>To</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Client's Name / Company Name"
                  name={fields.clientName.name}
                  key={fields.clientName.key}
                  defaultValue={fields.clientName.initialValue}
                />
                <p className="text-sm text-red-500">
                  {fields.clientName.errors}
                </p>

                <Input
                  placeholder="Client's Email"
                  name={fields.clientEmail.name}
                  key={fields.clientEmail.key}
                  defaultValue={fields.clientEmail.initialValue}
                />
                <p className="text-sm text-red-500">
                  {fields.clientEmail.errors}
                </p>

                <Input
                  placeholder="Client's Address"
                  name={fields.clientAddress.name}
                  key={fields.clientAddress.key}
                  defaultValue={fields.clientAddress.initialValue}
                />
                <p className="text-sm text-red-500">
                  {fields.clientAddress.errors}
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-2 mb-6">
            <div>
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full text-left">
                    <CalendarIcon />

                    {selectedDate ? (
                      new Intl.DateTimeFormat("en-US", {
                        dateStyle: "long",
                      }).format(selectedDate)
                    ) : (
                      <span>Pick a Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => setSelectedDate(date || new Date())}
                    fromDate={new Date()}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-sm text-red-500">{fields.date.errors}</p>
            </div>

            <div>
              <Label>Invoice Due</Label>
              <Select
                name={fields.dueDate.name}
                key={fields.dueDate.key}
                defaultValue={fields.dueDate.initialValue}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Due Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Due on Receipt</SelectItem>
                  <SelectItem value="15">Due in 15 Days</SelectItem>
                  <SelectItem value="30">Due in 30 Days</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500">{fields.dueDate.errors}</p>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
              <p className="col-span-6">Description</p>
              <p className="col-span-2">Quanity</p>
              <p className="col-span-2">Rate</p>
              <p className="col-span-2">Amount</p>
            </div>
            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-6">
                <Textarea placeholder="Description of Service" />
              </div>
              <div className="col-span-2">
                <Input placeholder="0" type="number" />
              </div>
              <div className="col-span-2">
                <Input placeholder="0" type="number" />
              </div>
              <div className="col-span-2">
                <Input placeholder="0" type="number" disabled />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-1/3">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between py-2 border-t">
                <span>Total (USD)</span>
                <span className="font-medum underline underline-offset-2">
                  $5.00
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label>Notes</Label>
            <Textarea placeholder="Add your Notes right here..." />
          </div>

          <div className="flex items-center justify-end mt-6">
            <div>
              <SubmitButton title="Send Invoice to client" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
