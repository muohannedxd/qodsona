import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NoMatch() {
  return (
    <div className="h-[90vh] py-12 flex flex-col items-center">
      <Card className="max-w-[800px]">
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>No Match</CardDescription>
        </CardHeader>
        <div className="flex flex-col items-center text-center pb-14">
          <CardContent>
            <p className="text-3xl font-bold">404 NOT FOUND</p>
          </CardContent>
          <CardFooter>
            <p className="text-xl font-semibold">
              You are seeing this because this page does not exist or have been
              deleted by the owners
            </p>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
