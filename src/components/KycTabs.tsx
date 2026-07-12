import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2 } from "lucide-react";

const KYC = {
  individual: [
    "Aadhaar or Passport (identity proof)",
    "PAN card",
    "Passport-size photograph",
    "Cancelled cheque or bank statement",
  ],
  partnership: [
    "Partner identity documents (all partners)",
    "Partner PAN cards",
    "Business PAN card",
    "Partnership deed or LLP incorporation certificate",
    "GST certificate (if applicable)",
    "Bank proof (cancelled cheque or statement)",
  ],
  company: [
    "Director identity documents",
    "Company PAN card",
    "Certificate of Incorporation",
    "GST certificate (if applicable)",
    "Bank proof",
    "Board authorization letter (if required)",
  ],
};

export function KycTabs() {
  return (
    <Tabs defaultValue="individual" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="individual">Sole Proprietor</TabsTrigger>
        <TabsTrigger value="partnership">LLP / Partnership</TabsTrigger>
        <TabsTrigger value="company">Pvt / Public Company</TabsTrigger>
      </TabsList>
      {(Object.keys(KYC) as Array<keyof typeof KYC>).map(k => (
        <TabsContent key={k} value={k} className="mt-6">
          <ul className="grid gap-3 sm:grid-cols-2">
            {KYC[k].map(item => (
              <li key={item} className="flex items-start gap-2 rounded-lg border bg-surface p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                <span className="text-sm text-navy">{item}</span>
              </li>
            ))}
          </ul>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export { KYC };
