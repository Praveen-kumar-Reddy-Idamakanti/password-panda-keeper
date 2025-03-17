
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { QrCodeIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface MfaGoogleAuthProps {
  onComplete: () => void;
}

const MfaGoogleAuth = ({ onComplete }: MfaGoogleAuthProps) => {
  const { validateOtp, completeMfaStep } = useAuth();
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  
  // For demonstration purposes, create a static QR code data
  // In a real app, this would be generated server-side
  const qrCodeDataUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/PasswordVault:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=PasswordVault";

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }

    setIsVerifying(true);
    try {
      const isValid = await validateOtp(otp);
      if (isValid) {
        completeMfaStep("googleAuth");
        toast.success("OTP verification successful");
        onComplete();
      } else {
        toast.error("Invalid OTP code");
      }
    } catch (error) {
      toast.error("OTP verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Google Authenticator</CardTitle>
        <CardDescription>
          Set up Google Authenticator for additional security
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        {showQrCode ? (
          <>
            <div className="border p-2 bg-white rounded-md">
              <img 
                src={qrCodeDataUrl} 
                alt="QR Code for Google Authenticator" 
                className="w-48 h-48"
              />
            </div>
            <div className="text-center text-sm text-muted-foreground">
              <p>Scan this QR code with Google Authenticator app</p>
              <p className="font-mono mt-2">JBSWY3DPEHPK3PXP</p>
            </div>
          </>
        ) : (
          <Button 
            variant="outline" 
            className="flex items-center gap-2 w-full"
            onClick={() => setShowQrCode(true)}
          >
            <QrCodeIcon className="h-5 w-5" />
            Show QR Code
          </Button>
        )}

        <div className="w-full space-y-2 mt-4">
          <Label htmlFor="otp">Enter the 6-digit code from your authenticator app:</Label>
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleVerifyOtp} 
          disabled={otp.length !== 6 || isVerifying}
          className="w-full"
        >
          {isVerifying ? "Verifying..." : "Verify Code"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MfaGoogleAuth;
