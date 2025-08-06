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
import { signInSchema, type SignInFormData } from "@/schemas/auth"
import { toast } from "sonner"
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import AuthWrapper from "@/components/auth/auth-wrapper"

export default function SignInPage() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: SignInFormData) => {
    setLoading(true)
    try {
      const { error } = await signIn(data.email, data.password)

      if (error) {
        toast.error("Erro ao fazer login", {
          description: error,
        })
      } else {
        toast.success("Login realizado com sucesso!")
        router.push("/catalog")
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
    <AuthWrapper
      title="Bem-vindo ao Futuro"
      subtitle="Conecte-se à nossa plataforma tecnológica e descubra uma nova experiência de compras"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Olá,</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Bem-vindo de volta</h2>
        <p className="text-gray-500 mt-2">Entre na sua conta para continuar</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 font-medium">
            E-mail ou usuário
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

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={checked => setRememberMe(checked === true)}
              className="border-gray-300"
            />
            <Label htmlFor="remember" className="text-sm text-gray-600">
              Lembrar de mim
            </Label>
          </div>
          <Link href="/auth/reset-password" className="text-sm text-[#155dfb] hover:text-[#0d47d1] font-medium">
            Esqueceu a senha?
          </Link>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-gradient-to-r from-[#155dfb] to-[#667eea] hover:from-[#0d47d1] hover:to-[#5a6fd8] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      {/* Sign Up Link */}
      <div className="text-center mt-6">
        <p className="text-gray-600">
          Não tem uma conta?{" "}
          <Link href="/auth/signup" className="text-[#155dfb] hover:text-[#0d47d1] font-semibold">
            Clique aqui
          </Link>
        </p>
      </div>

      {/* App Store Badges */}
      <div className="flex justify-center space-x-4 mt-8">
        <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-xs">
          <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
            <span className="text-black font-bold text-xs">📱</span>
          </div>
          <div>
            <div className="text-xs opacity-75">Baixe na</div>
            <div className="font-semibold">App Store</div>
          </div>
        </div>
        <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-xs">
          <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-xs">▶</span>
          </div>
          <div>
            <div className="text-xs opacity-75">Disponível no</div>
            <div className="font-semibold">Google Play</div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  )
}
