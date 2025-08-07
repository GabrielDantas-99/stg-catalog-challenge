# E-commerce Next.js com Checkout via WhatsApp

## Sobre o Projeto

Este projeto é um sistema de e-commerce moderno, funcional e responsivo, desenvolvido com **Next.js App Router** e **TypeScript**. O objetivo é oferecer uma experiência de compra eficiente, permitindo ao usuário navegar por produtos, adicionar itens ao carrinho e finalizar a compra de forma prática e inovadora: o checkout é realizado via **WhatsApp**, utilizando integração com a API **GZAPPY**.  
A interface utiliza componentes do **ShadCN UI**, garantindo design consistente, acessibilidade e facilidade de customização.

**Para acessar o sistema em produção acesse: [https://stg-catalog-challenge-git-main-gabrieldantas99s-projects.vercel.app](https://stg-catalog-challenge-git-main-gabrieldantas99s-projects.vercel.app)**

---

## Funcionalidades

### Funcionalidades Obrigatórias

- [x] Listagem de produtos por categoria
- [x] Visualização de detalhes do produto
- [x] Adição e remoção de produtos no carrinho
- [x] Persistência do carrinho no localStorage
- [x] Checkout via WhatsApp (API GZAPPY)
- [x] Responsividade mobile e desktop
- [x] Alternância entre temas claro/escuro (dark/light)
- [x] Busca de produtos
- [x] Cadastro e login de usuários
- [x] Lista de desejos (wishlist)
- [x] Histórico de pedidos
- [x] Validação de formulários com feedback visual

### Funcionalidades Diferenciais

- [x] Integração com Supabase para autenticação e persistência de dados
- [x] UI baseada em ShadCN (acessibilidade e personalização)
- [x] Hooks personalizados para carrinho, wishlist e autenticação
- [x] Animações e feedbacks visuais modernos
- [x] SEO otimizado com Next.js
- [x] Deploy automatizado (Vercel)
- [x] Suporte a múltiplos idiomas (i18n-ready)
- [x] Componentização avançada e reutilização de código

---

## Tecnologias Utilizadas

- **Next.js (App Router + TypeScript):** Framework principal, escolhido pela performance, SSR/SSG e experiência de desenvolvimento moderna.
- **ShadCN UI:** Biblioteca de componentes React acessíveis e altamente customizáveis.
- **Supabase:** Backend as a Service para autenticação, banco de dados e storage.
- **Tailwind CSS:** Utilizado para estilização rápida e responsiva.
- **Zod:** Validação de schemas e formulários.
- **Sonner:** Biblioteca de notificações toast.
- **Lucide React:** Ícones modernos e personalizáveis.
- **GZAPPY API:** Integração para envio de pedidos via WhatsApp.
- **React Hook Form:** Gerenciamento de formulários.
- **Vercel:** Deploy e hospedagem.
- **ESLint & Prettier:** Padronização e qualidade de código.

**Justificativa:**  
As escolhas priorizam produtividade, escalabilidade, acessibilidade e facilidade de manutenção, além de garantir uma ótima experiência para o usuário final.

---

## IA Utilizada

Acessar documentação dedicada à esta seção no arquivo [doc/IA/prompts.md](https://github.com/GabrielDantas-99/stg-catalog-challenge/blob/develop/doc/IA/prompts.md).

- **ChatGPT (OpenAI):** Geração de código, sugestões de arquitetura, escrita de textos e README, automação de testes e refatoração.
- **GitHub Copilot:** Auxílio na escrita de código, geração de hooks, componentes e funções utilitárias.
- **Claude (Anthropic):** Revisão de textos, sugestões de UX e estruturação de pastas.
- **Cursor:** Geração de trechos de código e automação de refatorações.
- **Design.com:** Criação de wireframes e sugestões visuais para telas e componentes.

**O que foi gerado por IA:**  
Grande parte da estrutura inicial, hooks, componentes reutilizáveis, README, textos de interface e exemplos de código foram gerados ou revisados por IA.  
**O que foi escrito manualmente:**  
Ajustes finais, integrações específicas, lógica de negócio, configurações de ambiente e personalizações visuais.

---

## Arquitetura do Projeto

A estrutura de pastas foi pensada para facilitar a escalabilidade e a reutilização de código.
```
sgt-catalog-challenge/
├── app/ # Rotas e páginas (Next.js App Router)
│ ├── auth/ # Fluxos de autenticação (signin, signup, reset)
│ ├── catalog/ # Listagem e busca de produtos
│ ├── cart/ # Carrinho de compras
│ └── ... # Outras rotas
├── components/ # Componentes reutilizáveis (UI, layout, auth, header, etc)
│ ├── header/
│ ├── auth/
│ └── ui/
├── contexts/ # Contextos globais (auth, cart, wishlist)
├── hooks/ # Hooks personalizados
├── lib/ # Funções utilitárias e integrações externas
├── public/ # Imagens e arquivos estáticos
├── scripts/ # Scripts de seed e utilitários SQL
├── doc/
│ └── IA/ # Imagens para documentação de prompts
├── styles/ # Estilos globais e configurações do Tailwind
├── .env.local.example # Exemplo de variáveis de ambiente
└── README.md
```
**Responsabilidade das principais pastas:**

- **app/**: Páginas e rotas do Next.js.
- **components/**: Componentes visuais e de layout reutilizáveis.
- **contexts/**: Providers de contexto global (ex: autenticação, carrinho).
- **hooks/**: Hooks customizados para lógica de negócio.
- **lib/**: Funções utilitárias, helpers e integrações externas.
- **scripts/**: Scripts de banco de dados e automação.
- **doc/screenshots/**: Imagens para documentação e README.

---

## Integração com GZAPPY

Para o envio automatizado de mensagens contendo os dados do pedido do cliente via WhatsApp, foi integrada a [API da GZAPPY](https://v2.gzappy.com/) (versão de testes). Essa integração permitiu a comunicação direta entre o sistema e o número de atendimento, proporcionando uma experiência mais ágil e eficiente para notificações de pedidos.

⚠️ **Limitação:**  
A versão gratuita de testes da API utilizada possui um período de validade de apenas 3 dias, restringindo temporariamente a disponibilidade dessa funcionalidade em produção.

📽️ **Demonstração:**  
Apesar da limitação, a integração foi concluída com sucesso e está demonstrada no vídeo disponível neste [link do Google Drive](https://drive.google.com/file/d/1omoPu5teH13HPjrNvB04JV5ZhVB4DPUu/view?usp=drive_link), evidenciando seu funcionamento real.

### 🔗 Endpoint utilizado:
```
POST https://WHATSAPP_API_URL/message/send-text
```

### 📦 Exemplo de Payload:
```json
{
  "phone": process.env.WHATSAPP_RECEIVER_PHONE,
  "message": "Detalhes do pedido..."
}
```

> **Nota:** O número de telefone (`phone`) e a mensagem (`message`) são preenchidos dinamicamente com os dados do pedido do cliente.

## Variáveis de Ambiente

As variáveis devem ser configuradas no arquivo `.env.local` na raiz do projeto:

| Variável                        | Descrição                                  |
| ------------------------------- | ------------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`      | URL do projeto Supabase                    |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave pública do Supabase                  |
| `NEXT_PUBLIC_GZAPPY_API_URL`    | URL da API GZAPPY para integração WhatsApp |
| `NEXT_PUBLIC_GZAPPY_TOKEN`      | Token de autenticação da API GZAPPY        |
| `NEXT_PUBLIC_SITE_URL`          | URL base do site (usado para links e SEO)  |

---

## Como Rodar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/sgt-catalog-challenge.git
   cd sgt-catalog-challenge
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Configure as variáveis de ambiente:**

   - Renomeie o arquivo `.env.local.example` para `.env.local`.
   - Preencha com suas credenciais e URLs do Supabase e GZAPPY.

4. **Execute o projeto:**
   ```bash
   npm run dev
   ```
   Acesse em `http://localhost:3000`.

---

## Considerações Finais

Este projeto foi desenvolvido como um desafio para a **SGT**. Agradeço pela oportunidade e feedbacks são bem-vindos!
