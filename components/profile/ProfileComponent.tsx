import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import SignOut from "../header/SignOut";
import { NotebookPen } from "lucide-react";

interface ProfileProps {
    name: string;
    email: string;
    image: string
}

const ProfileComponent: React.FC<ProfileProps> = ({ name, email, image }) => {

    return (
        <Card className="max-w-lg">
            <CardHeader>
                <div className=" flex flex-col md:flex-row gap-3 justify-center md:justify-start items-center">
                    <Avatar>
                        <AvatarImage src={image || "https://github.com/shadcn.png"} />
                        <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <div className=" w-full text-center md:text-left">
                        <CardTitle>{name}</CardTitle>
                        <CardDescription>
                            {email}
                        </CardDescription>
                    </div>
                    <div>
                        <Link href={"/profile/edit"}>
                            <Button size={"icon"} variant={"outline"} className=" rounded-full">
                                <NotebookPen className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>

            </CardHeader>
            <CardContent>
                <CardDescription className="text-center md:text-left">
                    Wecome back to the profile mr. {name}. We are here to help you out with our services.
                </CardDescription>
            </CardContent>
            <CardFooter className=" w-full flex justify-center md:justify-start items-center gap-3">
                <Link href={"/verify"}>
                    <Button variant={"outline"}>Change Password</Button>
                </Link>
                <SignOut />

            </CardFooter>
        </Card >
    );
};

export default ProfileComponent;

