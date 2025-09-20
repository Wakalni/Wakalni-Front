"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Types
interface ILogin {
  email: string;
  password: string;
  type: string;
}
interface ISignup extends ILogin {}

export default function AuthPage() {
  const router = useRouter();

  // Login form
  const loginFormik = useFormik<ILogin>({
    initialValues: { email: "", password: "", type: "user" },
    validationSchema: Yup.object({
      email: Yup.string().email("Email invalide").required("Email requis"),
      password: Yup.string().required("Mot de passe requis"),
      type: Yup.string().required("Type requis"),
    }),
    async onSubmit(values) {
      try {
        // Simule une API
        await new Promise((r) => setTimeout(r, 800));
        toast.success("Connexion réussie");
        router.push("/");
      } catch {
        toast.error("Erreur lors de la connexion");
      }
    },
  });

  // Signup form
  const signupFormik = useFormik<ISignup>({
    initialValues: { email: "", password: "", type: "user" },
    validationSchema: Yup.object({
      email: Yup.string().email("Email invalide").required("Email requis"),
      password: Yup.string()
        .min(6, "6 caractères min.")
        .required("Mot de passe requis"),
      type: Yup.string().required("Type requis"),
    }),
    async onSubmit(values) {
      try {
        await new Promise((r) => setTimeout(r, 800));
        toast.success("Inscription réussie");
        router.push("/");
      } catch {
        toast.error("Erreur lors de l'inscription");
      }
    },
  });

  return (
    <div className="mx-auto max-w-3xl h-screen flex flex-col justify-center items-center px-4">
      <div className="w-full flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Left image */}
        <div className="hidden md:flex flex-col justify-center items-center bg-primary/10 p-8">
          <Image
            src="/restaurant-hero.jpg"
            alt="Connexion"
            width={220}
            height={220}
            className="rounded-xl"
            priority
          />
          <div className="mt-6 text-center text-primary font-bold text-xl">
            Bienvenue sur Wakalni
          </div>
        </div>
        {/* Right forms */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="signup">Inscription</TabsTrigger>
            </TabsList>

            {/* Login */}
            <TabsContent value="login">
              <form className="space-y-6" onSubmit={loginFormik.handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={loginFormik.values.email}
                    onChange={loginFormik.handleChange}
                  />
                  {loginFormik.touched.email && loginFormik.errors.email && (
                    <p className="text-red-500 text-xs">
                      {loginFormik.errors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Mot de passe</Label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    placeholder="Mot de passe"
                    value={loginFormik.values.password}
                    onChange={loginFormik.handleChange}
                  />
                  {loginFormik.touched.password &&
                    loginFormik.errors.password && (
                      <p className="text-red-500 text-xs">
                        {loginFormik.errors.password}
                      </p>
                    )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-type">Type de compte</Label>
                  <select
                    id="login-type"
                    name="type"
                    className="w-full border rounded px-2 py-1"
                    value={loginFormik.values.type}
                    onChange={loginFormik.handleChange}
                  >
                    <option value="user">Utilisateur</option>
                    <option value="resto">Restaurant</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-white font-semibold mt-4"
                >
                  Se connecter
                </Button>
              </form>
            </TabsContent>

            {/* Signup */}
            <TabsContent value="signup">
              <form className="space-y-6" onSubmit={signupFormik.handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={signupFormik.values.email}
                    onChange={signupFormik.handleChange}
                  />
                  {signupFormik.touched.email && signupFormik.errors.email && (
                    <p className="text-red-500 text-xs">
                      {signupFormik.errors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Mot de passe</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="Mot de passe"
                    value={signupFormik.values.password}
                    onChange={signupFormik.handleChange}
                  />
                  {signupFormik.touched.password &&
                    signupFormik.errors.password && (
                      <p className="text-red-500 text-xs">
                        {signupFormik.errors.password}
                      </p>
                    )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-type">Type de compte</Label>
                  <select
                    id="signup-type"
                    name="type"
                    className="w-full border rounded px-2 py-1"
                    value={signupFormik.values.type}
                    onChange={signupFormik.handleChange}
                  >
                    <option value="user">Utilisateur</option>
                    <option value="resto">Restaurant</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-white font-semibold mt-4"
                >
                  S'inscrire
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
