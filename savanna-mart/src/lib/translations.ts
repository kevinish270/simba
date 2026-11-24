export type Language = 'en' | 'fr' | 'rw';

export type TranslationValue = string | { readonly [key: string]: TranslationValue };

export const translations = {
  en: {
    common: {
      search: "Search products...",
      cart: "Cart",
      login: "Login",
      register: "Register",
      categories: "Categories",
      shop: "Shop",
      deals: "Deals",
      wishlist: "Wishlist",
      compare: "Compare",
      logout: "Logout",
      flashSale: "Flash Sale is Live",
      freeDelivery: "Enjoy FREE DELIVERY on all orders over RWF 50,000!",
    },
    hero: {
      title: "Freshness Delivered to Your Door.",
      subtitle: "Shop the best quality groceries and household essentials at Simba Supermarket.",
      cta: "SHOP NOW",
      dealsCta: "FLASH DEALS",
    },
    auth: {
      welcomeBack: "Welcome Back!",
      loginToAccount: "Log in to your Simba account",
      joinThePride: "Join the Pride",
      createAccount: "Create your Simba account today",
      email: "Email Address",
      password: "Password",
      fullName: "Full Name",
      forgotPassword: "Forgot Password?",
      alreadyHaveAccount: "Already have an account?",
      dontHaveAccount: "Don't have an account?",
      signInWithGoogle: "Continue with Google",
      signUpWithGoogle: "Sign up with Google",
    }
  },
  fr: {
    common: {
      search: "Rechercher des produits...",
      cart: "Panier",
      login: "Connexion",
      register: "S'inscrire",
      categories: "Catégories",
      shop: "Boutique",
      deals: "Offres",
      wishlist: "Liste de souhaits",
      compare: "Comparer",
      logout: "Déconnexion",
      flashSale: "Vente Flash en cours",
      freeDelivery: "Profitez de la LIVRAISON GRATUITE pour toute commande supérieure à 50 000 RWF !",
    },
    hero: {
      title: "La fraîcheur livrée à votre porte.",
      subtitle: "Achetez les meilleurs produits d'épicerie et articles ménagers essentiels chez Simba Supermarket.",
      cta: "ACHETER MAINTENANT",
      dealsCta: "OFFRES FLASH",
    },
    auth: {
      welcomeBack: "Bon retour !",
      loginToAccount: "Connectez-vous à votre compte Simba",
      joinThePride: "Rejoignez la fierté",
      createAccount: "Créez votre compte Simba dès aujourd'hui",
      email: "Adresse e-mail",
      password: "Mot de passe",
      fullName: "Nom complet",
      forgotPassword: "Mot de passe oublié ?",
      alreadyHaveAccount: "Vous avez déjà un compte ?",
      dontHaveAccount: "Vous n'avez pas de compte ?",
      signInWithGoogle: "Continuer avec Google",
      signUpWithGoogle: "S'inscrire avec Google",
    }
  },
  rw: {
    common: {
      search: "Shaka ibicuruzwa...",
      cart: "Ikarita",
      login: "Injira",
      register: "Kwiyandikisha",
      categories: "Ibyiciro",
      shop: "Haha",
      deals: "Ibigabanyirijwe igiciro",
      wishlist: "Ibyo nifuza",
      compare: "Gereranya",
      logout: "Sohoka",
      flashSale: "Ibigabanyirijwe igiciro biriho",
      freeDelivery: "Ikurye KU BUNTU iyo uguze ibirengeje 50,000 RWF!",
    },
    hero: {
      title: "Ibiribwa bishya bigera iwawe.",
      subtitle: "Haha ibiribwa byiza n'ibikoresho byo mu rugo kuri Simba Supermarket.",
      cta: "HAHA NONAHA",
      dealsCta: "IBIRANGIYE",
    },
    auth: {
      welcomeBack: "Murakaza neza kandi!",
      loginToAccount: "Injira muri konti yawe ya Simba",
      joinThePride: "Iyunge natwe",
      createAccount: "Ifungurire konti muri Simba uyu munsi",
      email: "Imeli",
      password: "Ijambo ry'ibanga",
      fullName: "Amazina yose",
      forgotPassword: "Wibagiwe ijambo ry'ibanga?",
      alreadyHaveAccount: "Ufite konti umaze?",
      dontHaveAccount: "Ntagufite konti?",
      signInWithGoogle: "Komeza ukoresheje Google",
      signUpWithGoogle: "Iyongere natwe ukoresheje Google",
    }
  }
} satisfies Record<Language, TranslationValue>;
