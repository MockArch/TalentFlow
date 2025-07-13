import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gray-100 dark:bg-gray-800 p-12">
        <div className="w-full max-w-md">
            <div className="text-left space-y-4">
                 <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-800 text-white font-bold text-2xl">
                    N
                </div>
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Welcome to HarborView</h1>
                <p className="text-gray-600 dark:text-gray-300">
                    The intelligent recruitment partner that helps you find, interview, and hire the best talent.
                </p>
            </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white dark:bg-gray-900 p-6">
        <Card className="w-full max-w-sm shadow-none border-none">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="bg-gray-50 h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required placeholder="Enter your password" className="bg-gray-50 h-12" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Checkbox id="remember-me" />
                    <Label htmlFor="remember-me" className="font-normal text-sm">Remember me</Label>
                </div>
                <Link
                  href="#"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <Button asChild type="submit" className="w-full h-12 text-base">
                <Link href="/">Sign In</Link>
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="#" className="font-semibold text-primary hover:underline">
                Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
