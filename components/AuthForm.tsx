"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, loggaIn, registrera } from "@/lib/actions/user.actions";


const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
        // Signt up with Appwrite & create plain link token

        if (type === "registrera") {
             const newUser = await registrera(data);

             setUser(newUser)
        }

        if(type === "logga-in") {
            const response = await loggaIn({
                email:data.email,
                password:data.password,
            });

            if(response) router.push("/");
            
        }
    } catch (error) {
        console.log(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className=" cursor-pointer flex items-center gap-1">
          <Image src="/icons/logo.svg" width={34} height={34} alt="logo" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Ekonova
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user
              ? "Link Account"
              : type === "logga-in"
              ? "Logga in"
              : "Registrera"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Länka ditt konto till för att komma igång"
                : "Vänligen ange dina uppgifter"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "registrera" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="Förnamn"
                      placeholder="Ange ditt förnamn"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Efternamn"
                      placeholder="Ange ditt efternamn"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Adress"
                    placeholder="Ange din adress"
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="Stad"
                    placeholder="Ange din stad"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="Län"
                      placeholder="Ange ditt län"
                    />
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Postkod"
                      placeholder="Ange din postkod"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Födelsedatum"
                      placeholder="ÅÅÅÅ-MM-DD"
                    />
                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label="Fyra sista"
                      placeholder="Exempel:1234"
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                name="email"
                label="E-post"
                placeholder="Ange din e-postadresst"
              />
              <CustomInput
                control={form.control}
                name="password"
                label="Lösenord"
                placeholder="Ange ditt lösenord"
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Laddar ...
                    </>
                  ) : type === "logga-in" ? (
                    "Logga In"
                  ) : (
                    "Registrera"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal texxt-gray-600">
              {type === "logga-in"
                ? "Har du inget konto?"
                : "Har du redan ett konto?"}
            </p>
            <Link
              href={type === "logga-in" ? "/registrera" : "/logga-in"}
              className="form-link"
            >
              {type === "logga-in" ? "Registrera" : "Logga in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
