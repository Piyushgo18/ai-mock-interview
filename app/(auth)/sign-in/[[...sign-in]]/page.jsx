import { SignIn } from "@clerk/nextjs"; // or replace with your own form
import Image from "next/image";

export default function SignInPage() {
  return (    
    <>
      {/* Background with grid pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      
      <div className="flex min-h-screen">
        {/* Left side - image */}
        <div className="relative w-1/2 hidden lg:block">
          <Image
            src="https://media.licdn.com/dms/image/v2/D5612AQEoTzK2rVxHZQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1707420465234?e=2147483647&v=beta&t=IzoxtBV0Y1wyOq5kD05bT5UVW6cSwUVvVJ1n65JdYxA"
            alt="Welcome"
            width={1000}
            height={1000}
            priority
            className="brightness-75 object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center text-white px-10 text-center">
            <div>
              <h2 className="text-4xl font-bold">Welcome to Ai-Mock-Interview</h2>
              <p className="mt-4 text-lg">
                Sign in to continue to your dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Right side - form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-20">
          <div className="max-w-md w-full mx-auto">
            <h1 className="text-3xl font-bold mb-6">Sign in to Your Account</h1>

            {/* Clerk Sign-In component or your custom form */}
            <SignIn
              appearance={{
                elements: {
                  formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
                },
              }}
              routing="path"
              path="/sign-in"
              signUpUrl="/sign-up"
            />
          </div>
        </div>
      </div>
    </>
  );
}
