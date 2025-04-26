import prisma from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

async function Page() {
  const users = await prisma.user.findMany({
    where: {
      phoneNumber: {
        notIn: ["9148106357", "9739204918"],
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className={"mt-[100px] container"}>
      <h1 className={"text-2xl font-medium mb-5"}>All Users</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>
                  <Link href={`tel:${user.phoneNumber}`}>
                    {user.phoneNumber}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link target="_blank" href={`mailto:${user.email}`}>
                    {user.email ?? ""}
                  </Link>
                </TableCell>
                <TableCell className="font-medium">
                  {user.createdAt.toDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Page;
