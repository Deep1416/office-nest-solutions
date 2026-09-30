import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Logo } from "@/components/Logo";

export function Login({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="grid min-h-screen place-items-center bg-surface p-4">
      <form onSubmit={(e) => { e.preventDefault(); onLogin(); toast.success("Welcome back, admin"); }} className="card-soft w-full max-w-sm p-6">
        <Logo />
        <h1 className="mt-4 text-xl font-bold">Admin Login</h1>
        <p className="text-xs text-muted-foreground">Demo — any credentials will work.</p>
        <div className="mt-4 grid gap-3">
          <FormField label="Email">{(id) => <Input id={id} type="email" defaultValue="admin@officemate.in" />}</FormField>
          <FormField label="Password">{(id) => <Input id={id} type="password" defaultValue="demo1234" />}</FormField>
          <Button type="submit" className="bg-primary">Sign in</Button>
        </div>
      </form>
    </div>
  );
}
