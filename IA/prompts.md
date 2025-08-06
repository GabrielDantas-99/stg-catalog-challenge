<p>MENU DA DOCUMENTAÇÃO</p>
<ul id="menu">
    <li>
    <b>1º Passo:</b> 
        <a href="#chatgpt">ChatGPT</a>
        <ul>
            <li>
                <a href="#prompt-1">Prompt 1</a>
            </li>
            <li>
                <a href="#prompt-2">Prompt 2</a>
            </li>
        </ul>
    </li>
    <li>
    <b>2º Passo:</b> 
        <a href="#v0">v0</a>
    </li>
    <li>
    <b>3º Passo:</b> 
        <a href="#copilot">Github Copilot</a>
    </li>
    <li>
    <b>4º Passo:</b> 
        <a href="#design">Design.com</a>
    </li>
</ul>

<div id="chatgpt">

### 1 - ChatGPT

A principal função do ChatGPT neste projeto foi a geração de um prompt altamente otimizado para a ferramenta de geração de código v0, por meio de técnicas avançadas de _prompt engineering_, como **Prompt Context**, **Support Content** e **Few-shot Learning**. Além disso, o ChatGPT também foi utilizado no refinamento desta própria documentação, com o objetivo de torná-la mais clara, coesa e objetiva para fins de registro técnico e reprodutibilidade do processo.

#### **Prompts:**

<details>

<summary id="prompt-1"> Prompt 1:</summary>

```
You are a senior software development specialist, applying best
programming practices such as Clean Architecture, SOLID principles,
TDD, and well-structured, scalable code. Your task is to generate
a complete and functional user interface, based on the following
technical challenge description for the FullStack Developer position
- TypeScript and IACODE focus.
The project must implement all core and bonus features.
Use the provided visual reference as UI inspiration.
Prioritize high-quality code, well-defined UI components, and seamless UX.
Everything described must be treated as required in the final implementation.

PROJECT SPECIFICATIONS

DEADLINE: 7 days from the date the challenge is received
PROJECT NAME: stg-catalog-challenge
OBJECTIVE: Build a fully functional product catalog system with authentication,
using AI to accelerate low-code development, and integrate with WhatsApp for
order finalization.

CORE FUNCTIONALITIES
Authentication (Supabase)
    Login and registration screens
    Authentication via email/password
    Functional logout
    Route protection: non-authenticated users cannot access the catalog or cart
    Password recovery

Product Catalog
    Product list with image, name, price, and description
    Search/filter by product name
    Detailed product view (modal or separate page)
    Add to cart
    View cart with selected items
    Responsive interface (desktop and mobile)

WhatsApp Checkout Integration
    "Place Order" button in cart
    Generate formatted message with product data
    Redirect to wa.me with full order summary
    Clear cart after sending the order

TECHNICAL REQUIREMENTS
Mandatory Tech Stack:
    TypeScript (strictly typed)
    React or Next.js
    Supabase (authentication and database)
    Tailwind CSS for styling
    GitHub with a public repository

AI Usage:
    Use AI tools to accelerate development (ChatGPT, Cursor, v0.dev, Claude, etc.)
    Document in the README which AI tools were used and how
    Code must be clean, maintainable, and well-structured regardless of AI use

WhatsApp Integration:
    Use WhatsApp Business API or direct wa.me link
    Format the order message clearly and professionally
    Include customer data and list of selected products

SUPABASE DATABASE STRUCTURE
Tables:
    products: id, name, description, price, image_url, category, created_at
    cart_items: id, user_id, product_id, quantity, created_at
    users: managed automatically by Supabase Auth

Seed the database with at least 12 products across various categories:
    Electronics, clothing, home, sports
    Use realistic product prices (in BRL - R$)
    Use high-quality product images (Unsplash or Pexels)
    Write appealing descriptions

REQUIRED SCREENS
Screen 1: Login / Registration
    Login form (email and password)
    Registration form (full name, email, password, confirm password)
    Form validation
    Error/success feedback
    Auto-redirect after login

Screen 2: Main Catalog
    Responsive grid layout with at least 12 products
    Each product displays: image, name, price
    "Add to Cart" button on each product
    Navigation to the cart

Screen 3: Product Details
    Modal or page with expanded product info
    Larger image, full description, name, price
    "Add to Cart" button
    Back to catalog button

Screen 4: Shopping Cart
    List of selected products
    Editable quantity
    Remove item button
    "Checkout via WhatsApp" button
    "Continue Shopping" button

Screen 5: Order Confirmation
    Final order summary
    Customer information
    List of products and total price
    Confirmation button that redirects to WhatsApp with the order

WHATSAPP ORDER FORMAT
The message sent via WhatsApp must follow this structure:

*NOVO PEDIDO - STG CATALOG*
Cliente:* [User Name]
Email:* [User Email]
PRODUTOS:
- [Product Name] - Qtd: [X] - R$ [price]
- ...
TOTAL: R$ [total]
---
Pedido realizado via STG Catalog

Implementation:
    Retrieve logged-in user data
    Format cart products in the message
    Calculate total
    Generate wa.me link
    Open link in a new tab
    Clear cart after sending

UI/UX AND VISUAL STYLE
Visual Design:
    Clean and modern e-commerce interface
    Professional color palette (suggestion: blue/green for e-commerce)
    Well-organized components with appropriate spacing
    Consistent icon usage (Lucide React or Heroicons)
    Visually attractive product cards

UX/UI:
    Intuitive marketplace-like experience
    Loading states during requests
    Visual feedback for user actions (login, add to cart, etc.)
    Smooth animations
    Responsive layout for at least 3 breakpoints (mobile, tablet, desktop)

Forms:
    Use zod for validation
    Show real-time validation and error feedback

Identity:
    Strong, visually appealing interface
    Tech-focused design with emphasis on both UX/UI and code quality

DEPLOYMENT & DELIVERY
    GitHub repository
        Name: stg-catalog-challenge
        Public visibility
        Main branch: main
        Production deploy via Vercel, Netlify or similar (required)
    README.md (required)
    Sections:
        About the project
        Tech stack used and rationale
        AI tools used and how they contributed
        How to run locally (step-by-step)
        Live links (app and Supabase if public)
        Full checklist of implemented features

ADDITIONAL (TO BE TREATED AS REQUIRED)
Bonus Features:
    Order history per user
    Advanced filters (category, price range)
    Discount coupons system
    Wishlist
    Product reviews and ratings
    Dark mode toggle
    PWA support
    Context API for state management
    Custom hooks
    Unit tests (Jest, Testing Library)
    Error boundaries
    SEO optimization
    Performance optimizations (lazy loading, memoization)
    Internationalization (i18n)

Advanced UI/UX:
    Framer Motion animations
    Skeleton loading
    Toast notifications
    Breadcrumbs
    Infinite scroll or pagination
    Search with autocomplete/suggestions

EVALUATION CRITERIA
Functionality (40%)
    Authentication fully functional
    Product catalog loads correctly
    Cart operations work as expected
    WhatsApp integration operational
    Live app deployed and accessible

Code Quality (30%)
    Proper TypeScript usage
    Organized, scalable project structure
    Clean and readable code
    Modern React/Next.js patterns

UI/UX (20%)
    Professional, polished UI
    Responsive and accessible design
    Visual feedback and transitions

AI Usage (10%)
    Clear README documentation of AI tools
    Reviewed and optimized generated code
    Effective use of AI with demonstrated understanding
```

</details>

<details>

<summary id="prompt-2"> Prompt 2:</summary>

```
Aperfeiçoe estes texto para serem utilizados na construção da documentação dos
promps e ferramentas utilizadas com IA:

### 1 - ChatGPT

A principal utilidade dessa inteligência artificial foi gerar um prompt otimizado
para ser utilizado na ferramenta de geração de código v0, através de técnicas de
prompt engineering como Prompt Context, Support Content e Few-shot Learning.
Além disso, essa IA também foi utilizada para aperfeiçoar esta própria documentação,
a fim de que ela se tornasse ainda mais clara e objetiva.
### 2 - v0

A partir do refinamento do prompt otimizado gerado pelo ChatGPT e uma inspiração
de layout retirada do website **[Dribbble](https://dribbble.com/)**
(Imagem em [anexo]("./images/inspiracao_v0.png)), a ferramenta de geração de
código <a href="https://v0.dev">v0</a> foi utilizada para otimização no tempo
de desenvolvimento de forma eficaz. Além disso, ela foi utilizada como ferramenta
anterior ao GitHub Copilot, de forma a otimizar o tempo de manutenção de código
e refinar o projeto para que ele atendesse os requisitos propostos pelo desafio.

### 3 - Github Copilot
A utilização do Github Copilot se deu através de sua extensão no ambiente de
desenvolvimento integrado Visual Studio Code, para a correção de eventuais erros
de código gerado pela IA <a href="#v0">v0</a> e otimização de atualizações
necessárias durante a fase de manutenção do código.

### 4 - Design.com
A ferramenta de geração de imagens da <a href="https://design.com">Design.com</a>
foi utilizada para a criação da logo e do favicon do sistema, afim de deixa-lo
com um design ainda mais profissional e tecnológico, gerando autenticidade e boa
experiência com o usuário
```

</details>

<div id="v0">

<div style="display: flex; justify-content:space-between">

### 2 - v0

<a href="#menu">
(Voltar para o topo)
</a>
</div>

A ferramenta [v0](https://v0.dev) foi utilizada para acelerar significativamente o processo de desenvolvimento de interface, com base no prompt otimizado gerado pelo ChatGPT e inspirado em um layout de alta qualidade visual encontrado no site **[Dribbble](https://dribbble.com/)** ([ver imagem de referência](./images/inspiracao_v0.png)). O uso da v0 permitiu a geração rápida de componentes frontend com qualidade de produção, servindo como etapa anterior ao uso do GitHub Copilot, focando na redução do tempo de implementação inicial e no alinhamento com os requisitos do desafio proposto.

**Prompt:**

```
You are a front-end development expert focused on modern, responsive, and
accessible interfaces, applying best practices such as Clean Architecture,
SOLID principles, component cohesion, and efficient use of TypeScript.
Create a functional and visually appealing interface for a complete
product catalog system with authentication, shopping cart, checkout via
WhatsApp, filters, order history, and advanced UX features. Use the
attached image as design inspiration. The following technologies must be
used: Next.js with TypeScript, Tailwind CSS, Supabase (authentication
and database), and Zod for form validation. The generated interface must
be production-ready and fully integrated with Supabase. Implement the
following features: Authentication with Supabase (user registration with
name, email, password, and password confirmation; login with email and
password; functional logout; route protection – unauthenticated users
cannot access the catalog or cart; password recovery; capture logged-in
user data – name and email; order history per authenticated user);
Product Catalog (product listing with image, name, description, price,
and category; filters by name, category, and price range; search with
suggestions/autocomplete; responsive grid layout for mobile, tablet, and
desktop; "Add to Cart" button visible on each item; attractive product
cards with visual interactions); Product Details Page (expanded view with
arger image, full description, name, category, and price; "Add to Cart"
button; back to catalog button; product reviews and comments; "Add to Wishlist"
button).
```

</div>

<div id="copilot">

<div style="display: flex; justify-content:space-between">

### 3 - GitHub Copilot

<a href="#menu">
(Voltar para o topo)
</a>
</div>

O GitHub Copilot foi integrado ao fluxo de trabalho por meio de sua extensão oficial no ambiente de desenvolvimento Visual Studio Code. Sua utilização teve como objetivo principal a correção de erros pontuais no código gerado pela ferramenta [v0](#v0), além de auxiliar na implementação de ajustes e melhorias contínuas durante a fase de manutenção. Essa integração contribuiu para um desenvolvimento mais fluido e eficiente, complementando o trabalho iniciado com as ferramentas anteriores.

```
Atualize este código para que, na resulução inferior à "md", o menu mobile seja
exibido e os outros links/botões sejam ocultados. E, em resoluções acima de "md",
o menu mobile seja ocultado e os demais botões sejam exibidos
```

```
Crie subcomponentes para o componente header:
- search bar
- desktop actions
- menu mobile (com o componente sheet do shadcn)
Além disso, adapte o componente header para funcionar corretamente com os novos componentes
```

</div>

<div id="design">

<div style="display: flex; justify-content:space-between">

### 4 - <span>Design.com</span>

<a href="#menu">
(Voltar para o topo)
</a>
</div>

A ferramenta de geração de imagens da [Design.com](https://design.com) foi utilizada para a criação da logo e do favicon do sistema, com o objetivo de conferir um design mais profissional e tecnológico. Essa abordagem contribuiu para gerar autenticidade visual e proporcionar uma experiência mais positiva e confiável ao usuário.

<div style="display: flex; justify-content:space-between">
    <img src="../public/sgt_store_logo_light.png" />
</div>

</div>
