import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField } from "@/components/ui/form-field";
import type { CustomerInfo } from "./schema";

export function DetailsStep({ customer, onChange }: { customer: CustomerInfo; onChange: (patch: Partial<CustomerInfo>) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold">Customer information</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <FormField label="Full name">{(id) => <Input id={id} value={customer.name} onChange={(e) => onChange({ name: e.target.value })} />}</FormField>
        <FormField label="Email">{(id) => <Input id={id} type="email" value={customer.email} onChange={(e) => onChange({ email: e.target.value })} />}</FormField>
        <FormField label="Phone">{(id) => <Input id={id} value={customer.phone} onChange={(e) => onChange({ phone: e.target.value })} />}</FormField>
        <FormField label="Business name">{(id) => <Input id={id} value={customer.businessName} onChange={(e) => onChange({ businessName: e.target.value })} />}</FormField>
        <FormField label="Business type">
          {(id) => (
            <Select value={customer.businessType} onValueChange={(v) => onChange({ businessType: v })}>
              <SelectTrigger id={id}><SelectValue placeholder="Choose" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Sole Proprietor</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
                <SelectItem value="llp">LLP</SelectItem>
                <SelectItem value="company">Private / Public Company</SelectItem>
              </SelectContent>
            </Select>
          )}
        </FormField>
        <FormField label="GST status">
          {(id) => (
            <Select value={customer.gstStatus} onValueChange={(v) => onChange({ gstStatus: v })}>
              <SelectTrigger id={id}><SelectValue placeholder="Choose" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="registered">Registered</SelectItem>
                <SelectItem value="pending">Applying now</SelectItem>
                <SelectItem value="none">Not required</SelectItem>
              </SelectContent>
            </Select>
          )}
        </FormField>
        <FormField label="Current address" className="sm:col-span-2">{(id) => <Textarea id={id} rows={2} value={customer.address} onChange={(e) => onChange({ address: e.target.value })} />}</FormField>
      </div>
    </div>
  );
}
