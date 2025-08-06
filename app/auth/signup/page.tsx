"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/auth-context"
import { signUpSchema, type SignUpFormData } from "@/schemas/auth"
import { toast } from "sonner"
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import AuthWrapper from "@/components/auth/auth-wrapper"

export default function SignUpPage() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const { signUp } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (data: SignUpFormData) => {
    if (!acceptTerms) {
      toast.error("Aceite os termos de uso para continuar")
      return
    }

    setLoading(true)
    try {
      const { error } = await signUp(data.email, data.password, data.name)

      if (error) {
        toast.error("Erro ao criar conta", {
          description: error,
        })
      } else {
        toast.success("Conta criada com sucesso!", {
          description: "Verifique seu e-mail para confirmar a conta",
        })
        router.push("/auth/signin")
      }
    } catch (error) {
      toast.error("Erro inesperado", {
        description: "Tente novamente em alguns instantes",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthWrapper title="Junte-se a Nós" subtitle="Crie sua conta e faça parte da nossa comunidade tecnológica">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Conta</h1>
        <p className="text-gray-500">Preencha os dados para começar</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-700 font-medium">
            Nome Completo
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              id="name"
              type="text"
              placeholder="Digite seu nome completo"
              className="pl-10 h-12 border-gray-200 focus:border-[#155dfb] focus:ring-[#155dfb] rounded-xl"
              {...register("name")}
            />
          </div>
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 font-medium">
            E-mail
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              className="pl-10 h-12 border-gray-200 focus:border-[#155dfb] focus:ring-[#155dfb] rounded-xl"
              {...register("email")}
            />
          </div>
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-700 font-medium">
            Senha
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              className="pl-10 pr-10 h-12 border-gray-200 focus:border-[#155dfb] focus:ring-[#155dfb] rounded-xl"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
            Confirmar Senha
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirme sua senha"
              className="pl-10 pr-10 h-12 border-gray-200 focus:border-[#155dfb] focus:ring-[#155dfb] rounded-xl"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={checked => setAcceptTerms(checked === true)}
            className="border-gray-300 mt-1"
          />
          <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
            Aceito os{" "}
            <Link href="/terms" className="text-[#155dfb] hover:text-[#0d47d1] font-medium">
              termos de uso
            </Link>{" "}
            e{" "}
            <Link href="/privacy" className="text-[#155dfb] hover:text-[#0d47d1] font-medium">
              política de privacidade
            </Link>
          </Label>
        </div>

        {/* Signup Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-gradient-to-r from-[#155dfb] to-[#667eea] hover:from-[#0d47d1] hover:to-[#5a6fd8] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {loading ? "Criando conta..." : "Criar Conta"}
        </Button>
      </form>

      {/* Sign In Link */}
      <div className="text-center mt-6">
        <p className="text-gray-600">
          Já tem uma conta?{" "}
          <Link href="/auth/signin" className="text-[#155dfb] hover:text-[#0d47d1] font-semibold">
            Entrar
          </Link>
        </p>
      </div>
    </AuthWrapper>
  )
}
