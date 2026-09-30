import { FileCheck2, Upload } from "lucide-react";
import { KYC } from "@/components/KycTabs";

export function KycStep({
  businessType, kycFiles, onFileChosen,
}: {
  businessType: string;
  kycFiles: Record<string, string>;
  onFileChosen: (item: string, fileName: string) => void;
}) {
  const kycList = businessType === "company" ? KYC.company : businessType === "llp" || businessType === "partnership" ? KYC.partnership : KYC.individual;

  return (
    <div>
      <h2 className="text-xl font-bold">KYC documents</h2>
      <p className="mt-1 text-sm text-muted-foreground">Please upload the following. Accepted formats: PDF, JPG, PNG. Max 5 MB each. Files are not uploaded — demo only.</p>
      <div className="mt-4 grid gap-3">
        {kycList.map(item => (
          <div key={item} className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-3">
              {kycFiles[item] ? <FileCheck2 className="h-5 w-5 text-success" /> : <Upload className="h-5 w-5 text-muted-foreground" />}
              <div>
                <div className="text-sm font-medium text-navy">{item}</div>
                {kycFiles[item] && <div className="text-xs text-success">{kycFiles[item]}</div>}
              </div>
            </div>
            <label className="cursor-pointer text-sm font-medium text-primary hover:underline">
              {kycFiles[item] ? "Replace" : "Choose file"}
              <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => {
                const f = e.target.files?.[0]; if (f) onFileChosen(item, f.name);
              }} />
            </label>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">🔒 Your documents are handled confidentially and used only for compliance.</p>
    </div>
  );
}
