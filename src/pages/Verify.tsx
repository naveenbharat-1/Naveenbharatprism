import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ShieldAlert, Search, Loader2 } from "lucide-react";
import brandLogo from "@/assets/logo-short.png";

interface VerifyResult {
  valid: boolean;
  data?: {
    course_title: string;
    student_name: string;
    amount: number;
    status: string;
    date: string;
  };
}

const Verify = () => {
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResult | null>(null);

  const handleVerify = async () => {
    if (!hash.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase
        .from("payment_requests")
        .select("*, courses:course_id(title)")
        .eq("verification_hash", hash.trim())
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setResult({
          valid: true,
          data: {
            course_title: (data as any).courses?.title || "Unknown",
            student_name: data.user_name || data.sender_name || "N/A",
            amount: data.amount || 0,
            status: data.status || "unknown",
            date: data.created_at
              ? new Date(data.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "N/A",
          },
        });
      } else {
        setResult({ valid: false });
      }
    } catch {
      setResult({ valid: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <img src={brandLogo} alt="Naveen Bharat Prism" className="h-14 w-14 mx-auto rounded-xl" />
          <h1 className="text-2xl font-bold text-foreground">Receipt Verification</h1>
          <p className="text-muted-foreground text-sm">
            Paste the verification code from your receipt to check its authenticity.
          </p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter verification hash..."
                value={hash}
                onChange={(e) => setHash(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                className="font-mono text-sm"
              />
              <Button onClick={handleVerify} disabled={loading || !hash.trim()}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card className={result.valid ? "border-green-300 bg-green-50/50" : "border-red-300 bg-red-50/50"}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                {result.valid ? (
                  <>
                    <ShieldCheck className="h-6 w-6 text-green-600" />
                    <span className="text-green-700">Verified — Authentic Receipt</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="h-6 w-6 text-red-600" />
                    <span className="text-red-700">Not Found — Invalid or Fake</span>
                  </>
                )}
              </CardTitle>
            </CardHeader>
            {result.valid && result.data && (
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Course</span>
                  <span className="font-medium">{result.data.course_title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Student</span>
                  <span className="font-medium">{result.data.student_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">₹{result.data.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{result.data.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status</span>
                  <Badge className={
                    result.data.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : result.data.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }>
                    {result.data.status}
                  </Badge>
                </div>
              </CardContent>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default Verify;
