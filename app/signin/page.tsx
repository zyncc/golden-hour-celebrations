import Link from "next/link";
import SignInForm from "@/components/signin/signInForm";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Sign in",
  },
};

export default async function LoginForm({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const callbackUrl = searchParams.callbackUrl;
  const session = await auth.api.getSession({
    headers: headers(),
  });
  if (session?.session) {
    redirect("/");
  }
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8 bg-black shadow-lg rounded-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold">Sign in to Continue</h2>
        </div>
        <SignInForm />
        <p className="mt-8 text-center text-xs text-gray-500">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-blue-600 hover:underline">
            terms
          </Link>
          ,{" "}
          <Link href="/refunds" className="text-blue-600 hover:underline">
            refunds
          </Link>
          , and{" "}
          <Link href="/privacy" className="text-blue-600 hover:underline">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
