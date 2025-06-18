import React, { createContext, useContext, useState, useEffect } from 'react';

// Tipos para el contexto de idioma
export type Language = 'es' | 'en' | 'pt' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Traducciones
const translations = {
  es: {
    // Navegación
    'nav.home': 'INICIO',
    'nav.trips': 'VIAJES',
    'nav.accommodation': 'ALOJAMIENTO',
    'nav.payments': 'PAGOS',
    'nav.tokenomics': 'TOKENOMICS',
    'nav.roadmap': 'ROADMAP',
    'nav.presale': 'PREVENTA',
    'nav.whitepaper': 'WHITEPAPER',
    'nav.team': 'EQUIPO',
    'nav.buyViaz': '🔗 CONECTAR BILLETERA',
    
    // Hero Section
    'hero.welcome': 'Bienvenido a Viazen',
    'hero.subtitle': 'Una revolución en la forma de Viajar, Alojarse y Pagar',
    'hero.joinPresale': 'Unite a la Preventa',
    
    // Presale Banner
    'presale.launching': 'LANZANDO',
    'presale.discount': '50% DE DESCUENTO',
    'presale.participate': 'PARTICIPAR AHORA',
    
    // How It Works
    'howItWorks.title': '¿Cómo funciona?',
    'howItWorks.subtitle': 'Tres servicios revolucionarios en una sola plataforma descentralizada',
    'howItWorks.step1.title': 'Transporte Descentralizado',
    'howItWorks.step1.desc': 'Conecta directamente con conductores cercanos. Sin intermediarios, tarifas justas y pagos instantáneos en cripto.',
    'howItWorks.step2.title': 'Alojamiento Sin Intermediarios',
    'howItWorks.step2.desc': 'Hospédate en propiedades únicas de la comunidad. Pagos directos, experiencias auténticas y recompensas por cada reserva.',
    'howItWorks.step3.title': 'Pagos Cripto Integrados',
    'howItWorks.step3.desc': 'Billeteras descentralizadas integradas. Transacciones seguras, comisiones mínimas y tokens de recompensa automáticos.',
    
    // Services
    'services.transport.title': '🚗 Transporte Descentralizado',
    'services.transport.desc': 'Viajá con libertad total. Sin intermediarios. Comisiones mínimas.',
    'services.accommodation.title': '🏠 Alojamiento P2P',
    'services.accommodation.desc': 'Hospedaje directo entre personas. Más ganancias. Menos restricciones.',
    'services.payments.title': '💳 Pagos Globales',
    'services.payments.desc': 'Transferencias instantáneas. Comisiones irrisorias. Sin fronteras.',
    
    // Transport Section
    'transport.title': 'Transporte como Uber, pero mejor',
    'transport.intro': 'Ofreceremos un servicio de transporte de personas y delivery como Uber, Didi o Cabify, pero con estas',
    'transport.advantages': 'ventajas únicas',
    'transport.feature1': 'Pagá con criptomonedas, fiat o tarjeta',
    'transport.feature2': 'Sin limitaciones geográficas',
    'transport.feature3': 'Comisión de solo el 5% (vs 25-35% de Uber)',
    'transport.feature4': 'Transacciones transparentes en blockchain',
    'transport.feature5': 'Recompensas en tokens VIAZ para conductores y pasajeros frecuentes',
    'transport.quote': '"Un sistema justo, rápido y global. Transporte libre, sin fronteras."',
    'transport.highlights.commission': 'Solo 5% comisión',
    'transport.highlights.blockchain': 'Blockchain',
    'transport.highlights.global': 'Sin fronteras',
    'transport.highlights.tokens': 'Tokens VIAZ',
    
    // Accommodation Section
    'accommodation.title': 'Como Airbnb, pero más transparente y económico',
    'accommodation.intro': 'Una plataforma para reservar y ofrecer alojamientos entre personas, como Airbnb, pero con',
    'accommodation.improvements': 'mejoras clave',
    'accommodation.feature1': 'Comisión del 5% (Airbnb cobra hasta 18%)',
    'accommodation.feature2': 'Pagos con criptomonedas, fiat, o nuestro token',
    'accommodation.feature3': 'Sin retención ni censura geográfica',
    'accommodation.feature4': 'Reputación basada en blockchain',
    'accommodation.feature5': 'Cashback en VIAZ por reservas exitosas',
    'accommodation.quote': '"Viajá y ganá recompensas. Dormí donde quieras, con libertad total."',
    'accommodation.network': 'Red Global',
    'accommodation.connecting': 'Conectando hogares',
    'accommodation.highlights.commission': 'Solo 5% comisión',
    'accommodation.highlights.nocensorship': 'Sin censura',
    'accommodation.highlights.blockchain': 'Blockchain',
    'accommodation.highlights.cashback': 'Cashback VIAZ',
    
    // Payments Section
    'payments.title': 'Pagos como MercadoPago, pero descentralizados',
    'payments.intro': 'Una billetera digital al estilo MercadoPago, pero con estas',
    'payments.improvements': 'mejoras que cambian las reglas',
    'payments.feature1': 'Descentralizada y sin intervención gubernamental',
    'payments.feature2': 'Pagos con QR, cripto, o moneda local',
    'payments.feature3': 'Envío de dinero entre personas sin límites ni intermediarios',
    'payments.feature4': 'Bajas comisiones: solo 1% en cada transacción',
    'payments.feature5': 'Recompensas por usar el token VIAZ',
    'payments.quote': '"Tu dinero, en tus manos. Siempre."',
    'payments.highlights.decentralized': 'Descentralizado',
    'payments.highlights.commission': 'Solo 1% comisión',
    'payments.highlights.qrcrypto': 'QR + Cripto',
    'payments.highlights.tokens': 'Tokens VIAZ',
    
    // Rewards Section
    'rewards.title': 'Sistema de Recompensas',
    'rewards.subtitle': 'Gana tokens VZN por cada interacción y construye tu patrimonio digital',
    'rewards.stats.circulation': 'Tokens en Circulación',
    'rewards.stats.apy': 'APY Promedio',
    'rewards.stats.holders': 'Holders Activos',
    'rewards.stats.marketcap': 'Market Cap',
    'rewards.card1.title': 'Tokens por Uso',
    'rewards.card1.desc': 'Gana VZN tokens en cada transacción que realices en la plataforma',
    'rewards.card2.title': 'APY Staking',
    'rewards.card2.desc': 'Rendimientos anuales por mantener tus tokens en staking',
    'rewards.card3.title': 'Referidos',
    'rewards.card3.desc': 'Tokens de bonificación por cada nuevo usuario que invites',
    'rewards.card4.title': 'Governance',
    'rewards.card4.desc': 'Participa en las decisiones del futuro de la plataforma',
    'rewards.token.title': 'Viazen Token',
    'rewards.token.subtitle': 'El futuro del transporte descentralizado',
    'rewards.token.description': 'Nuestro token nativo VZN es el corazón del ecosistema Viazen. Úsalo para pagar servicios, ganar recompensas, participar en governance y acceder a beneficios exclusivos.',
    'rewards.token.utility.title': 'Utility Token',
    'rewards.token.utility.desc': 'Paga servicios y reduce comisiones',
    'rewards.token.rewards.title': 'Rewards Token',
    'rewards.token.rewards.desc': 'Gana tokens por participar',
    'rewards.token.governance.title': 'Governance Token',
    'rewards.token.governance.desc': 'Vota en decisiones importantes',
    
    // Payment Methods
    'payments.crypto': 'Criptomonedas',
    'payments.traditional': 'Métodos Tradicionales',
    'payments.kycInfo': 'Pagos en cripto y efectivo no requieren KYC obligatorio.',
    
    // Community
    'community.title': '🌍 Somos una comunidad que construye un nuevo paradigma',
    'community.subtitle': 'Sumate a nuestros canales de Telegram, Discord y redes sociales.',
    'community.stats.followers': 'Seguidores tempranos',
    'community.stats.countries': 'Países interesados',
    'community.stats.active': 'Comunidad activa',
    
    // Whitepaper
    'whitepaper.title': 'WHITEPAPER VIAZEN',
    'whitepaper.subtitle': 'Documento funcional completo de VIAZEN: super app global que integra alojamiento, viajes y pagos con token VIAZ',
    'whitepaper.download': 'Descargar PDF',
    'whitepaper.preview': 'Vista Previa',
    
    // Whitepaper Highlights
    'whitepaper.highlights.title': 'Whitepaper Highlights',
    'whitepaper.highlights.subtitle': 'Descubre los aspectos clave del ecosistema VIAZEN y su revolucionaria propuesta de valor',
    'whitepaper.highlights.services': 'Servicios Integrados',
    'whitepaper.highlights.technology': 'Tecnología',
    'whitepaper.highlights.tokenomics': 'Tokenomics',
    
    // Detailed Roadmap
    'roadmap.detailed.title': 'Roadmap 2025-2028',
    'roadmap.detailed.subtitle': 'Hoja de ruta detallada hacia la autonomía financiera y la descentralización completa',
    'roadmap.detailed.join': 'Únete a la Revolución Descentralizada',
    'roadmap.detailed.join.desc': 'Sé parte de VIAZEN desde el inicio y ayuda a construir el futuro de los servicios descentralizados',
    'roadmap.detailed.join.button': 'Participar en la Preventa',
    
    // Token VIAZ
    'token.viaz.name': 'Token VIAZ',
    'token.viaz.network': 'Binance Smart Chain (BEP-20)',
    'token.viaz.supply': '1,000,000,000 VIAZ',
    'token.viaz.phase1': 'Fase 1: $0.010',
    'token.viaz.phase2': 'Fase 2: $0.020',
    'token.viaz.phase3': 'Fase 3: $0.030',
    'token.viaz.launch': 'Lanzamiento: $0.10',
    
    // Team
    'team.title': 'NUESTRO EQUIPO',
    'team.subtitle': 'Los visionarios detrás de la revolución VIAZEN',
    
    // Presale Banner
    'presale.title': '🚀 ¡LA PREVENTA DE VIAZ ESTÁ POR COMENZAR!',
    'presale.countdown': 'Faltan exactamente:',
    'presale.notifyButton': 'Avisame cuando inicie',
    'presale.started.title': '🚀 ¡La preventa ya comenzó!',
    'presale.started.subtitle': 'Unite ahora y sé parte del futuro.',
    'presale.days': 'DÍAS',
    'presale.hours': 'HORAS',
    'presale.minutes': 'MINUTOS',
    'presale.seconds': 'SEGUNDOS',
    
    // Presale Banner
    'presale.comingSoon': 'Muy pronto podrás ser parte de la revolución de los viajes, alojamientos y pagos descentralizados.',
    'presale.getTokens': 'Adquirí tus tokens VIAZ',
    'presale.exclusiveRewards': 'antes que nadie y ganá recompensas exclusivas.',
    'presale.finalizing': 'Estamos ultimando los últimos detalles técnicos y legales para ofrecerte una experiencia',
    'presale.secure': 'segura',
    'presale.fair': 'justa',
    'presale.global': 'global',
    'presale.launched': 'La preventa oficial ha comenzado. Únete a la revolución descentralizada y adquiere tus tokens VIAZ con',
    'presale.exclusiveDiscounts': 'descuentos exclusivos',
    'presale.immediateRewards': 'recompensas inmediatas',
    'presale.priorityAccess': 'acceso prioritario',
    'presale.allFeatures': 'a todas las funciones.',

    // How It Works
    'howItWorks.integrated': 'Todo integrado en una sola app',

    // Roadmap
    'roadmap.subtitle': 'Descubrí nuestra hoja de ruta hacia un futuro descentralizado y lleno de oportunidades.',
    'roadmap.masterPlan': 'El plan maestro para construir el ecosistema',
    'roadmap.revolutionize': 'y revolucionar el futuro de transporte, alojamiento y pagos descentralizados.',
    'roadmap.phase1.title': 'Fundación y Concepto',
    'roadmap.phase1.date': 'Junio 2025',
    'roadmap.phase1.item1': 'Compra del dominio viazen.app',
    'roadmap.phase1.item2': 'Diseño conceptual del ecosistema: Transporte, Alojamiento y Pagos',
    'roadmap.phase1.item3': 'Desarrollo de identidad visual y logo',
    'roadmap.phase1.status': 'Completado',
    'roadmap.phase2.title': 'Lanzamiento Web y Comunidad',
    'roadmap.phase2.date': 'Julio 2025',
    'roadmap.phase2.item1': 'Publicación de la web oficial',
    'roadmap.phase2.item2': 'Creación de cuentas en redes sociales (X, Instagram, Telegram)',
    'roadmap.phase2.item3': 'Campañas de captación de interesados',
    'roadmap.phase2.status': 'En Progreso',
    'roadmap.phase3.title': 'Preventa del Token VIAZ',
    'roadmap.phase3.date': '15 de Julio 2025',
    'roadmap.phase3.item1': 'Apertura oficial de la preventa',
    'roadmap.phase3.item2': 'Venta inicial del token a precio exclusivo',
    'roadmap.phase3.item3': 'Recompensas por referidos y airdrops',
    'roadmap.phase3.status': 'Próximamente',
    'roadmap.phase4.title': 'Desarrollo de la App',
    'roadmap.phase4.date': 'Octubre 2025',
    'roadmap.phase4.item1': 'Inicio del desarrollo de la App de Transporte (como Uber/Didi)',
    'roadmap.phase4.item2': 'Integración de pagos tradicionales y cripto',
    'roadmap.phase4.item3': 'App sin límites geográficos y con comisiones del 5%',
    'roadmap.phase4.status': 'Próximamente',
    'roadmap.phase5.title': 'Expansión del Ecosistema',
    'roadmap.phase5.date': '2026',
    'roadmap.phase5.item1': 'Lanzamiento del módulo de Alojamiento (como Airbnb)',
    'roadmap.phase5.item2': 'Desarrollo del módulo de Pagos (como MercadoPago)',
    'roadmap.phase5.item3': 'Creación de la blockchain propia para bajas comisiones y control de inflación',
    'roadmap.phase5.status': 'Próximamente',
    'roadmap.phase6.title': 'Escalamiento Global',
    'roadmap.phase6.date': '2027 en adelante',
    'roadmap.phase6.item1': 'Expansión a toda Latinoamérica, luego Europa y Asia',
    'roadmap.phase6.item2': 'Inclusión de más servicios dentro del ecosistema VIAZEN',
    'roadmap.phase6.item3': 'Desarrollo de alianzas estratégicas y DAO comunitaria',
    'roadmap.phase6.status': 'Próximamente',
    'roadmap.joinRevolution': 'Únete a la Revolución VIAZEN',
    'roadmap.commitment': 'Este roadmap representa nuestro compromiso con la innovación descentralizada. Cada fase nos acerca más a un futuro donde los viajes, alojamientos y pagos sean libres, justos y globales.',

    // Tokenomics
    'tokenomics.title': 'TOKENOMICS – VIAZ',
    'tokenomics.subtitle': 'Distribución, preventa y utilidad del token VIAZ',
    'tokenomics.totalSupply': 'Suministro Total:',
    'tokenomics.distribution.title': '🧠 Distribución del Token VIAZ',
    'tokenomics.distribution.subtitle': 'Suministro total estratégicamente distribuido para garantizar la sustentabilidad y crecimiento del ecosistema',
    'tokenomics.legend': 'Leyenda Detallada',
    'tokenomics.vesting': 'Información de Bloqueo',
    'tokenomics.presale': 'Preventa: Sin bloqueo',
    'tokenomics.team': 'Equipo: 24 meses de bloqueo',
    'tokenomics.development': 'Desarrollo: Por hitos',
    'tokenomics.community': 'Comunidad: Gradual 36 meses',
    'tokenomics.presalePhases': 'FASES DE PREVENTA',
    'tokenomics.fundraisingGoals': 'OBJETIVOS DE LA RECAUDACIÓN',
    'tokenomics.participatePresale': 'PARTICIPAR DE LA PREVENTA',
    'tokenomics.paymentMethods': 'MEDIOS DE PAGO ACEPTADOS',
    'tokenomics.kycInfo': 'Pagos en cripto y efectivo no requieren KYC obligatorio.',
    'tokenomics.vestingInfo': 'Información de Vesting',
    'tokenomics.appDevelopment': 'Desarrollo de la app',
    'tokenomics.appDevelopmentDesc': 'Financiar el desarrollo de la app de transporte y expansión inicial',
    'tokenomics.exchangeLiquidity': 'Liquidez en exchanges',
    'tokenomics.exchangeLiquidityDesc': 'Asegurar liquidez en exchanges descentralizados',
    'tokenomics.userRewards': 'Recompensas usuarios',
    'tokenomics.userRewardsDesc': 'Recompensar a los primeros usuarios del ecosistema',
    'tokenomics.technicalSecurity': 'Seguridad técnica',
    'tokenomics.technicalSecurityDesc': 'Cubrir costos técnicos y de seguridad (auditorías, servidores, APIs)',



    // Team
    'team.vision': 'UN EQUIPO CON VISIÓN Y UNA COMUNIDAD EN CRECIMIENTO',
    'team.description': 'VIAZEN nace de la unión de emprendedores apasionados por la descentralización, el transporte libre, el alojamiento sin fronteras y los pagos sin intermediarios.',
    'team.danilo.name': 'Danilo Ponce',
    'team.danilo.role': 'Fundador y CEO',
    'team.danilo.description': 'Programador y visionario. Creador del ecosistema VIAZEN como alternativa libre, descentralizada e inclusiva.',
    'team.cofounder.name': 'Próximamente',
    'team.cofounder.role': 'Co-fundador/a',
    'team.cofounder.description': 'Buscamos talento excepcional para unirse a nuestra misión de revolucionar el transporte, alojamiento y pagos descentralizados.',
    'team.developer.name': 'Únete al equipo',
    'team.developer.role': 'Desarrollador/a',
    'team.developer.description': '¿Eres desarrollador blockchain, diseñador UX/UI o experto en fintech? Contáctanos para ser parte de la revolución VIAZEN.',

    // Community
    'community.buildingParadigm': 'Somos una comunidad que construye un nuevo paradigma',
    'community.joinChannels': 'Sumate a nuestros canales de Telegram, Discord y redes sociales.',

    // Footer
    'footer.slogan': '"Libertad, recompensa y expansión global."',
    'footer.copyright': '© 2025 Viazen. Todos los derechos reservados.',

    // Common
    'common.participate': 'PARTICIPAR',
    'common.learnMore': 'SABER MÁS',
    'common.download': 'DESCARGAR',
    'common.preview': 'VISTA PREVIA',
    'common.coming': 'PRÓXIMAMENTE',
    'common.live': 'EN VIVO',
  },
  
  en: {
    // Navigation
    'nav.home': 'HOME',
    'nav.trips': 'TRIPS',
    'nav.accommodation': 'ACCOMMODATION',
    'nav.payments': 'PAYMENTS',
    'nav.tokenomics': 'TOKENOMICS',
    'nav.roadmap': 'ROADMAP',
    'nav.presale': 'PRESALE',
    'nav.whitepaper': 'WHITEPAPER',
    'nav.team': 'TEAM',
    'nav.buyViaz': '🔗 CONNECT WALLET',
    
    // Hero Section
    'hero.welcome': 'Welcome to Viazen',
    'hero.subtitle': 'A revolution in the way to Travel, Lodge and Pay',
    'hero.joinPresale': 'Join the Presale',
    
    // Presale Banner
    'presale.launching': 'LAUNCHING',
    'presale.discount': '50% DISCOUNT',
    'presale.participate': 'PARTICIPATE NOW',
    
    // How It Works
    'howItWorks.title': 'How does it work?',
    'howItWorks.subtitle': 'Three revolutionary services on a single decentralized platform',
    'howItWorks.step1.title': 'Decentralized Transport',
    'howItWorks.step1.desc': 'Connect directly with nearby drivers. No intermediaries, fair rates and instant crypto payments.',
    'howItWorks.step2.title': 'Accommodation Without Intermediaries',
    'howItWorks.step2.desc': 'Stay in unique community properties. Direct payments, authentic experiences and rewards for every booking.',
    'howItWorks.step3.title': 'Integrated Crypto Payments',
    'howItWorks.step3.desc': 'Integrated decentralized wallets. Secure transactions, minimal fees and automatic reward tokens.',
    
    // Services
    'services.transport.title': '🚗 Decentralized Transport',
    'services.transport.desc': 'Travel with total freedom. No intermediaries. Minimal commissions.',
    'services.accommodation.title': '🏠 P2P Accommodation',
    'services.accommodation.desc': 'Direct lodging between people. More earnings. Fewer restrictions.',
    'services.payments.title': '💳 Global Payments',
    'services.payments.desc': 'Instant transfers. Minimal fees. No borders.',
    
    // Transport Section
    'transport.title': 'Transport like Uber, but better',
    'transport.intro': 'We will offer a people and delivery transport service like Uber, Didi or Cabify, but with these',
    'transport.advantages': 'unique advantages',
    'transport.feature1': 'Pay with cryptocurrencies, fiat or card',
    'transport.feature2': 'No geographical limitations',
    'transport.feature3': 'Only 5% commission (vs 25-35% of Uber)',
    'transport.feature4': 'Transparent blockchain transactions',
    'transport.feature5': 'VIAZ token rewards for drivers and frequent passengers',
    'transport.quote': '"A fair, fast and global system. Free transport, without borders."',
    'transport.highlights.commission': 'Only 5% commission',
    'transport.highlights.blockchain': 'Blockchain',
    'transport.highlights.global': 'No borders',
    'transport.highlights.tokens': 'VIAZ Tokens',
    
    // Accommodation Section
    'accommodation.title': 'Like Airbnb, but more transparent and economical',
    'accommodation.intro': 'A platform to book and offer accommodations between people, like Airbnb, but with',
    'accommodation.improvements': 'key improvements',
    'accommodation.feature1': '5% commission (Airbnb charges up to 18%)',
    'accommodation.feature2': 'Payments with cryptocurrencies, fiat, or our token',
    'accommodation.feature3': 'No retention or geographical censorship',
    'accommodation.feature4': 'Blockchain-based reputation',
    'accommodation.feature5': 'VIAZ cashback for successful bookings',
    'accommodation.quote': '"Travel and earn rewards. Sleep wherever you want, with total freedom."',
    'accommodation.network': 'Global Network',
    'accommodation.connecting': 'Connecting homes',
    'accommodation.highlights.commission': 'Only 5% commission',
    'accommodation.highlights.nocensorship': 'No censorship',
    'accommodation.highlights.blockchain': 'Blockchain',
    'accommodation.highlights.cashback': 'VIAZ Cashback',
    
    // Payments Section
    'payments.title': 'Payments like MercadoPago, but decentralized',
    'payments.intro': 'A digital wallet in the style of MercadoPago, but with these',
    'payments.improvements': 'game-changing improvements',
    'payments.feature1': 'Decentralized and without government intervention',
    'payments.feature2': 'Payments with QR, crypto, or local currency',
    'payments.feature3': 'Money transfers between people without limits or intermediaries',
    'payments.feature4': 'Low fees: only 1% per transaction',
    'payments.feature5': 'Rewards for using VIAZ token',
    'payments.quote': '"Your money, in your hands. Always."',
    'payments.highlights.decentralized': 'Decentralized',
    'payments.highlights.commission': 'Only 1% commission',
    'payments.highlights.qrcrypto': 'QR + Crypto',
    'payments.highlights.tokens': 'VIAZ Tokens',
    
    // Rewards Section
    'rewards.title': 'Rewards System',
    'rewards.subtitle': 'Earn VZN tokens for every interaction and build your digital wealth',
    'rewards.stats.circulation': 'Tokens in Circulation',
    'rewards.stats.apy': 'Average APY',
    'rewards.stats.holders': 'Active Holders',
    'rewards.stats.marketcap': 'Market Cap',
    'rewards.card1.title': 'Usage Tokens',
    'rewards.card1.desc': 'Earn VZN tokens in every transaction you make on the platform',
    'rewards.card2.title': 'APY Staking',
    'rewards.card2.desc': 'Annual returns for holding your tokens in staking',
    'rewards.card3.title': 'Referrals',
    'rewards.card3.desc': 'Bonus tokens for every new user you invite',
    'rewards.card4.title': 'Governance',
    'rewards.card4.desc': 'Participate in decisions about the platform\'s future',
    'rewards.token.title': 'Viazen Token',
    'rewards.token.subtitle': 'The future of decentralized transport',
    'rewards.token.description': 'Our native VZN token is the heart of the Viazen ecosystem. Use it to pay for services, earn rewards, participate in governance and access exclusive benefits.',
    'rewards.token.utility.title': 'Utility Token',
    'rewards.token.utility.desc': 'Pay for services and reduce fees',
    'rewards.token.rewards.title': 'Rewards Token',
    'rewards.token.rewards.desc': 'Earn tokens for participating',
    'rewards.token.governance.title': 'Governance Token',
    'rewards.token.governance.desc': 'Vote on important decisions',
    
    // Tokenomics
    'tokenomics.title': 'TOKENOMICS – VIAZ',
    'tokenomics.subtitle': 'Distribution, presale and utility of VIAZ token',
    'tokenomics.totalSupply': 'Total Supply:',
    'tokenomics.distribution.title': '🧠 VIAZ Token Distribution',
    'tokenomics.distribution.subtitle': 'Total supply strategically distributed to ensure ecosystem sustainability and growth',
    'tokenomics.legend': 'Detailed Legend',
    'tokenomics.vesting': 'Vesting Information',
    'tokenomics.presale': 'Presale: No lock',
    'tokenomics.team': 'Team: 24 months vesting',
    'tokenomics.development': 'Development: By milestones',
    'tokenomics.community': 'Community: Gradual 36 months',
    
    // Payment Methods
    'payments.crypto': 'Cryptocurrencies',
    'payments.traditional': 'Traditional Methods',
    'payments.kycInfo': 'Crypto and cash payments do not require mandatory KYC.',
    
    // Community
    'community.title': '🌍 We are a community building a new paradigm',
    'community.subtitle': 'Join our Telegram, Discord channels and social networks.',
    'community.stats.followers': 'Early followers',
    'community.stats.countries': 'Interested countries',
    'community.stats.active': 'Active community',
    
    // Whitepaper
    'whitepaper.title': 'VIAZEN WHITEPAPER',
    'whitepaper.subtitle': 'Complete functional document of VIAZEN: global super app integrating accommodation, travel and payments with VIAZ token',
    'whitepaper.download': 'Download PDF',
    'whitepaper.preview': 'Preview',
    
    // Team
    'team.title': 'OUR TEAM',
    'team.subtitle': 'The visionaries behind the VIAZEN revolution',
    
    // Presale Banner
    'presale.title': '🚀 VIAZ PRESALE IS ABOUT TO BEGIN!',
    'presale.countdown': 'Exactly left:',
    'presale.notifyButton': 'Notify me when it starts',
    'presale.started.title': '🚀 The presale has started!',
    'presale.started.subtitle': 'Join now and be part of the future.',
    'presale.days': 'DAYS',
    'presale.hours': 'HOURS',
    'presale.minutes': 'MINUTES',
    'presale.seconds': 'SECONDS',
    
    // Presale Banner
    'presale.comingSoon': 'Soon you will be able to be part of the revolution in decentralized travel, accommodation and payments.',
    'presale.getTokens': 'Get your VIAZ tokens',
    'presale.exclusiveRewards': 'before anyone else and earn exclusive rewards.',
    'presale.finalizing': 'We are finalizing the latest technical and legal details to offer you an experience',
    'presale.secure': 'secure',
    'presale.fair': 'fair',
    'presale.global': 'global',
    'presale.launched': 'The official presale has begun. Join the decentralized revolution and acquire your VIAZ tokens with',
    'presale.exclusiveDiscounts': 'exclusive discounts',
    'presale.immediateRewards': 'immediate rewards',
    'presale.priorityAccess': 'priority access',
    'presale.allFeatures': 'to all features.',

    // How It Works
    'howItWorks.integrated': 'Everything integrated in one app',

    // Roadmap
    'roadmap.subtitle': 'Discover our roadmap towards a decentralized future full of opportunities.',
    'roadmap.masterPlan': 'The master plan to build the ecosystem',
    'roadmap.revolutionize': 'and revolutionize the future of decentralized transport, accommodation and payments.',
    'roadmap.phase1.title': 'Foundation and Concept',
    'roadmap.phase1.date': 'June 2025',
    'roadmap.phase1.item1': 'Purchase of viazen.app domain',
    'roadmap.phase1.item2': 'Conceptual design of the ecosystem: Transport, Accommodation and Payments',
    'roadmap.phase1.item3': 'Development of visual identity and logo',
    'roadmap.phase1.status': 'Completed',
    'roadmap.phase2.title': 'Web Launch and Community',
    'roadmap.phase2.date': 'July 2025',
    'roadmap.phase2.item1': 'Official website publication',
    'roadmap.phase2.item2': 'Creation of social media accounts (X, Instagram, Telegram)',
    'roadmap.phase2.item3': 'Interested user acquisition campaigns',
    'roadmap.phase2.status': 'In Progress',
    'roadmap.phase3.title': 'VIAZ Token Presale',
    'roadmap.phase3.date': 'July 15, 2025',
    'roadmap.phase3.item1': 'Official presale opening',
    'roadmap.phase3.item2': 'Initial token sale at exclusive price',
    'roadmap.phase3.item3': 'Referral rewards and airdrops',
    'roadmap.phase3.status': 'Coming Soon',
    'roadmap.phase4.title': 'App Development',
    'roadmap.phase4.date': 'October 2025',
    'roadmap.phase4.item1': 'Start of Transport App development (like Uber/Didi)',
    'roadmap.phase4.item2': 'Integration of traditional and crypto payments',
    'roadmap.phase4.item3': 'App without geographical limits and with 5% commissions',
    'roadmap.phase4.status': 'Coming Soon',
    'roadmap.phase5.title': 'Ecosystem Expansion',
    'roadmap.phase5.date': '2026',
    'roadmap.phase5.item1': 'Launch of Accommodation module (like Airbnb)',
    'roadmap.phase5.item2': 'Development of Payments module (like MercadoPago)',
    'roadmap.phase5.item3': 'Creation of own blockchain for low fees and inflation control',
    'roadmap.phase5.status': 'Coming Soon',
    'roadmap.phase6.title': 'Global Scaling',
    'roadmap.phase6.date': '2027 onwards',
    'roadmap.phase6.item1': 'Expansion to all Latin America, then Europe and Asia',
    'roadmap.phase6.item2': 'Inclusion of more services within the VIAZEN ecosystem',
    'roadmap.phase6.item3': 'Development of strategic alliances and community DAO',
    'roadmap.phase6.status': 'Coming Soon',
    'roadmap.joinRevolution': 'Join the VIAZEN Revolution',
    'roadmap.commitment': 'This roadmap represents our commitment to decentralized innovation. Each phase brings us closer to a future where travel, accommodation and payments are free, fair and global.',

    // Tokenomics
    'tokenomics.presalePhases': 'PRESALE PHASES',
    'tokenomics.fundraisingGoals': 'FUNDRAISING OBJECTIVES',
    'tokenomics.participatePresale': 'PARTICIPATE IN PRESALE',
    'tokenomics.paymentMethods': 'ACCEPTED PAYMENT METHODS',
    'tokenomics.kycInfo': 'Crypto and cash payments do not require mandatory KYC.',
    'tokenomics.vestingInfo': 'Vesting Information',
    'tokenomics.appDevelopment': 'App development',
    'tokenomics.appDevelopmentDesc': 'Finance transport app development and initial expansion',
    'tokenomics.exchangeLiquidity': 'Exchange liquidity',
    'tokenomics.exchangeLiquidityDesc': 'Ensure liquidity on decentralized exchanges',
    'tokenomics.userRewards': 'User rewards',
    'tokenomics.userRewardsDesc': 'Reward early ecosystem users',
    'tokenomics.technicalSecurity': 'Technical security',
    'tokenomics.technicalSecurityDesc': 'Cover technical and security costs (audits, servers, APIs)',

    // Whitepaper
    'whitepaper.highlights.title': 'Whitepaper Highlights',
    'whitepaper.highlights.subtitle': 'Discover the key aspects of the VIAZEN ecosystem and its revolutionary value proposition',
    'whitepaper.complete.title': 'Complete Functional Document',
    'whitepaper.complete.description': 'The VIAZEN whitepaper presents a global super app that integrates three essential services on one platform:',
    'whitepaper.accommodation': 'Peer-to-peer accommodation (Airbnb-style)',
    'whitepaper.transport': 'Travel and mobility (Uber-style)',
    'whitepaper.payments': 'Cryptocurrency payments and collections (MercadoPago-style)',
    'whitepaper.architecture': 'Decentralized Architecture',
    'whitepaper.architectureDesc': 'Distributed system without single points of failure',
    'whitepaper.transactions': 'Instant Transactions',
    'whitepaper.transactionsDesc': 'Ultra-fast processing with minimal fees',
    'whitepaper.expansion': 'Global Expansion',
    'whitepaper.expansionDesc': 'Scalable ecosystem for global markets',
    'whitepaper.languages': 'Supported languages',
    'whitepaper.commissions': 'Minimal commissions',
    'whitepaper.launchYear': 'Launch year',

    // Team
    'team.vision': 'A TEAM WITH VISION AND A GROWING COMMUNITY',
    'team.description': 'VIAZEN is born from the union of entrepreneurs passionate about decentralization, free transport, borderless accommodation and payments without intermediaries.',
    'team.danilo.name': 'Danilo Ponce',
    'team.danilo.role': 'Founder and CEO',
    'team.danilo.description': 'Programmer and visionary. Creator of the VIAZEN ecosystem as a free, decentralized and inclusive alternative.',
    'team.cofounder.name': 'Coming Soon',
    'team.cofounder.role': 'Co-founder',
    'team.cofounder.description': 'We seek exceptional talent to join our mission to revolutionize decentralized transport, accommodation and payments.',
    'team.developer.name': 'Join the team',
    'team.developer.role': 'Developer',
    'team.developer.description': 'Are you a blockchain developer, UX/UI designer or fintech expert? Contact us to be part of the VIAZEN revolution.',

    // Community
    'community.buildingParadigm': 'We are a community building a new paradigm',
    'community.joinChannels': 'Join our Telegram, Discord channels and social networks.',

    // Footer
    'footer.slogan': '"Freedom, reward and global expansion."',
    'footer.copyright': '© 2025 Viazen. All rights reserved.',

    // Common
    'common.participate': 'PARTICIPATE',
    'common.learnMore': 'LEARN MORE',
    'common.download': 'DOWNLOAD',
    'common.preview': 'PREVIEW',
    'common.coming': 'COMING SOON',
    'common.live': 'LIVE',
  },
  
  pt: {
    // Navigation
    'nav.home': 'INÍCIO',
    'nav.trips': 'VIAGENS',
    'nav.accommodation': 'HOSPEDAGEM',
    'nav.payments': 'PAGAMENTOS',
    'nav.tokenomics': 'TOKENOMICS',
    'nav.roadmap': 'ROADMAP',
    'nav.presale': 'PRÉ-VENDA',
    'nav.whitepaper': 'WHITEPAPER',
    'nav.team': 'EQUIPE',
    'nav.buyViaz': '🔗 CONECTAR CARTEIRA',
    
    // Hero Section
    'hero.welcome': 'Bem-vindo ao Viazen',
    'hero.subtitle': 'Uma revolução na forma de Viajar, Hospedar-se e Pagar',
    'hero.joinPresale': 'Junte-se à Pré-venda',
    
    // Presale Banner
    'presale.launching': 'LANÇANDO',
    'presale.discount': '50% DE DESCONTO',
    'presale.participate': 'PARTICIPAR AGORA',
    
    // How It Works
    'howItWorks.title': 'Como funciona?',
    'howItWorks.subtitle': 'Três serviços revolucionários em uma única plataforma descentralizada',
    'howItWorks.step1.title': 'Transporte Descentralizado',
    'howItWorks.step1.desc': 'Conecte diretamente com motoristas próximos. Sem intermediários, tarifas justas e pagamentos instantâneos em cripto.',
    'howItWorks.step2.title': 'Hospedagem Sem Intermediários',
    'howItWorks.step2.desc': 'Hospede-se em propriedades únicas da comunidade. Pagamentos diretos, experiências autênticas e recompensas por cada reserva.',
    'howItWorks.step3.title': 'Pagamentos Cripto Integrados',
    'howItWorks.step3.desc': 'Carteiras descentralizadas integradas. Transações seguras, comissões mínimas e tokens de recompensa automáticos.',
    
    // Services
    'services.transport.title': '🚗 Transporte Descentralizado',
    'services.transport.desc': 'Viaje com liberdade total. Sem intermediários. Comissões mínimas.',
    'services.accommodation.title': '🏠 Hospedagem P2P',
    'services.accommodation.desc': 'Hospedagem direta entre pessoas. Mais ganhos. Menos restrições.',
    'services.payments.title': '💳 Pagamentos Globais',
    'services.payments.desc': 'Transferências instantâneas. Taxas mínimas. Sem fronteiras.',
    
    // Transport Section
    'transport.title': 'Transporte como Uber, mas melhor',
    'transport.intro': 'Ofereceremos um serviço de transporte de pessoas e delivery como Uber, Didi ou Cabify, mas com essas',
    'transport.advantages': 'vantagens únicas',
    'transport.feature1': 'Pague com criptomoedas, fiat ou cartão',
    'transport.feature2': 'Sem limitações geográficas',
    'transport.feature3': 'Comissão de apenas 5% (vs 25-35% do Uber)',
    'transport.feature4': 'Transações transparentes em blockchain',
    'transport.feature5': 'Recompensas em tokens VIAZ para motoristas e passageiros frequentes',
    'transport.quote': '"Um sistema justo, rápido e global. Transporte livre, sem fronteiras."',
    'transport.highlights.commission': 'Apenas 5% comissão',
    'transport.highlights.blockchain': 'Blockchain',
    'transport.highlights.global': 'Sem fronteiras',
    'transport.highlights.tokens': 'Tokens VIAZ',
    
    // Accommodation Section
    'accommodation.title': 'Como Airbnb, mas mais transparente e econômico',
    'accommodation.intro': 'Uma plataforma para reservar e oferecer hospedagem entre pessoas, como Airbnb, mas com',
    'accommodation.improvements': 'melhorias principais',
    'accommodation.feature1': 'Comissão de 5% (Airbnb cobra até 18%)',
    'accommodation.feature2': 'Pagamentos com criptomoedas, fiat, ou nosso token',
    'accommodation.feature3': 'Sem retenção ou censura geográfica',
    'accommodation.feature4': 'Reputação baseada em blockchain',
    'accommodation.feature5': 'Cashback em VIAZ por reservas bem-sucedidas',
    'accommodation.quote': '"Viaje e ganhe recompensas. Durma onde quiser, com total liberdade."',
    'accommodation.network': 'Rede Global',
    'accommodation.connecting': 'Conectando lares',
    'accommodation.highlights.commission': 'Apenas 5% comissão',
    'accommodation.highlights.nocensorship': 'Sem censura',
    'accommodation.highlights.blockchain': 'Blockchain',
    'accommodation.highlights.cashback': 'Cashback VIAZ',
    
    // Payments Section
    'payments.title': 'Pagamentos como MercadoPago, mas descentralizados',
    'payments.intro': 'Uma carteira digital no estilo MercadoPago, mas com essas',
    'payments.improvements': 'melhorias que mudam as regras',
    'payments.feature1': 'Descentralizada e sem intervenção governamental',
    'payments.feature2': 'Pagamentos com QR, cripto, ou moeda local',
    'payments.feature3': 'Envio de dinheiro entre pessoas sem limites ou intermediários',
    'payments.feature4': 'Taxas baixas: apenas 1% por transação',
    'payments.feature5': 'Recompensas por usar o token VIAZ',
    'payments.quote': '"Seu dinheiro, em suas mãos. Sempre."',
    'payments.highlights.decentralized': 'Descentralizado',
    'payments.highlights.commission': 'Apenas 1% comissão',
    'payments.highlights.qrcrypto': 'QR + Cripto',
    'payments.highlights.tokens': 'Tokens VIAZ',
    
    // Rewards Section
    'rewards.title': 'Sistema de Recompensas',
    'rewards.subtitle': 'Ganhe tokens VZN por cada interação e construa sua riqueza digital',
    'rewards.stats.circulation': 'Tokens em Circulação',
    'rewards.stats.apy': 'APY Médio',
    'rewards.stats.holders': 'Holders Ativos',
    'rewards.stats.marketcap': 'Market Cap',
    'rewards.card1.title': 'Tokens por Uso',
    'rewards.card1.desc': 'Ganhe tokens VZN em cada transação que você fizer na plataforma',
    'rewards.card2.title': 'APY Staking',
    'rewards.card2.desc': 'Retornos anuais por manter seus tokens em staking',
    'rewards.card3.title': 'Indicações',
    'rewards.card3.desc': 'Tokens de bônus para cada novo usuário que você convidar',
    'rewards.card4.title': 'Governança',
    'rewards.card4.desc': 'Participe das decisões sobre o futuro da plataforma',
    'rewards.token.title': 'Viazen Token',
    'rewards.token.subtitle': 'O futuro do transporte descentralizado',
    'rewards.token.description': 'Nosso token nativo VZN é o coração do ecossistema Viazen. Use-o para pagar serviços, ganhar recompensas, participar da governança e acessar benefícios exclusivos.',
    'rewards.token.utility.title': 'Utility Token',
    'rewards.token.utility.desc': 'Pague serviços e reduza taxas',
    'rewards.token.rewards.title': 'Rewards Token',
    'rewards.token.rewards.desc': 'Ganhe tokens por participar',
    'rewards.token.governance.title': 'Governance Token',
    'rewards.token.governance.desc': 'Vote em decisões importantes',
    
    // Tokenomics
    'tokenomics.title': 'TOKENOMICS – VIAZ',
    'tokenomics.subtitle': 'Distribuição, pré-venda e utilidade do token VIAZ',
    'tokenomics.totalSupply': 'Fornecimento Total:',
    'tokenomics.distribution.title': '🧠 Distribuição do Token VIAZ',
    'tokenomics.distribution.subtitle': 'Fornecimento total estrategicamente distribuído para garantir sustentabilidade e crescimento do ecossistema',
    'tokenomics.legend': 'Legenda Detalhada',
    'tokenomics.vesting': 'Informações de Vesting',
    'tokenomics.presale': 'Pré-venda: Sem bloqueio',
    'tokenomics.team': 'Equipe: 24 meses vesting',
    'tokenomics.development': 'Desenvolvimento: Por marcos',
    'tokenomics.community': 'Comunidade: Gradual 36 meses',
    
    // Payment Methods
    'payments.crypto': 'Criptomoedas',
    'payments.traditional': 'Métodos Tradicionais',
    'payments.kycInfo': 'Pagamentos em cripto e dinheiro não requerem KYC obrigatório.',
    
    // Community
    'community.title': '🌍 Somos uma comunidade construindo um novo paradigma',
    'community.subtitle': 'Junte-se aos nossos canais do Telegram, Discord e redes sociais.',
    'community.stats.followers': 'Seguidores iniciais',
    'community.stats.countries': 'Países interessados',
    'community.stats.active': 'Comunidade ativa',
    
    // Whitepaper
    'whitepaper.title': 'WHITEPAPER VIAZEN',
    'whitepaper.subtitle': 'Documento funcional completo do VIAZEN: super app global que integra alojamento, viagens e pagamentos com token VIAZ',
    'whitepaper.download': 'Baixar PDF',
    'whitepaper.preview': 'Visualizar',
    
    // Team
    'team.title': 'NOSSA EQUIPE',
    'team.subtitle': 'Os visionários por trás da revolução VIAZEN',
    
    // Presale Banner
    'presale.title': '🚀 A PRÉ-VENDA DO VIAZ ESTÁ PRESTES A COMEÇAR!',
    'presale.countdown': 'Falta exatamente:',
    'presale.notifyButton': 'Avise-me quando começar',
    'presale.started.title': '🚀 A pré-venda começou!',
    'presale.started.subtitle': 'Junte-se agora e faça parte do futuro.',
    'presale.days': 'DIAS',
    'presale.hours': 'HORAS',
    'presale.minutes': 'MINUTOS',
    'presale.seconds': 'SEGUNDOS',
    
    // Presale Banner
    'presale.comingSoon': 'Em breve você poderá fazer parte da revolução em viagens, hospedagem e pagamentos descentralizados.',
    'presale.getTokens': 'Adquira seus tokens VIAZ',
    'presale.exclusiveRewards': 'antes de qualquer um e ganhe recompensas exclusivas.',
    'presale.finalizing': 'Estamos finalizando os últimos detalhes técnicos e legais para oferecer uma experiência',
    'presale.secure': 'segura',
    'presale.fair': 'justa',
    'presale.global': 'global',
    'presale.launched': 'A pré-venda oficial começou. Junte-se à revolução descentralizada e adquira seus tokens VIAZ com',
    'presale.exclusiveDiscounts': 'descontos exclusivos',
    'presale.immediateRewards': 'recompensas imediatas',
    'presale.priorityAccess': 'acesso prioritário',
    'presale.allFeatures': 'a todas as funcionalidades.',

    // How It Works
    'howItWorks.integrated': 'Tudo integrado em um único app',

    // Roadmap
    'roadmap.subtitle': 'Descubra nosso roteiro rumo a um futuro descentralizado cheio de oportunidades.',
    'roadmap.masterPlan': 'O plano mestre para construir o ecossistema',
    'roadmap.revolutionize': 'e revolucionar o futuro do transporte, hospedagem e pagamentos descentralizados.',
    'roadmap.phase1.title': 'Fundação e Conceito',
    'roadmap.phase1.date': 'Junho 2025',
    'roadmap.phase1.item1': 'Compra do domínio viazen.app',
    'roadmap.phase1.item2': 'Design conceitual do ecossistema: Transporte, Hospedagem e Pagamentos',
    'roadmap.phase1.item3': 'Desenvolvimento de identidade visual e logo',
    'roadmap.phase1.status': 'Concluído',
    'roadmap.phase2.title': 'Lançamento Web e Comunidade',
    'roadmap.phase2.date': 'Julho 2025',
    'roadmap.phase2.item1': 'Publicação do site oficial',
    'roadmap.phase2.item2': 'Criação de contas em redes sociais (X, Instagram, Telegram)',
    'roadmap.phase2.item3': 'Campanhas de captação de interessados',
    'roadmap.phase2.status': 'Em Progresso',
    'roadmap.phase3.title': 'Pré-venda do Token VIAZ',
    'roadmap.phase3.date': '15 de Julho 2025',
    'roadmap.phase3.item1': 'Abertura oficial da pré-venda',
    'roadmap.phase3.item2': 'Venda inicial do token a preço exclusivo',
    'roadmap.phase3.item3': 'Recompensas por indicação e airdrops',
    'roadmap.phase3.status': 'Em Breve',
    'roadmap.phase4.title': 'Desenvolvimento do App',
    'roadmap.phase4.date': 'Outubro 2025',
    'roadmap.phase4.item1': 'Início do desenvolvimento do App de Transporte (como Uber/Didi)',
    'roadmap.phase4.item2': 'Integração de pagamentos tradicionais e cripto',
    'roadmap.phase4.item3': 'App sem limites geográficos e com comissões de 5%',
    'roadmap.phase4.status': 'Em Breve',
    'roadmap.phase5.title': 'Expansão do Ecossistema',
    'roadmap.phase5.date': '2026',
    'roadmap.phase5.item1': 'Lançamento do módulo de Hospedagem (como Airbnb)',
    'roadmap.phase5.item2': 'Desenvolvimento do módulo de Pagamentos (como MercadoPago)',
    'roadmap.phase5.item3': 'Criação da blockchain própria para baixas comissões e controle de inflação',
    'roadmap.phase5.status': 'Em Breve',
    'roadmap.phase6.title': 'Escalonamento Global',
    'roadmap.phase6.date': '2027 em diante',
    'roadmap.phase6.item1': 'Expansão para toda América Latina, depois Europa e Ásia',
    'roadmap.phase6.item2': 'Inclusão de mais serviços dentro do ecossistema VIAZEN',
    'roadmap.phase6.item3': 'Desenvolvimento de alianças estratégicas e DAO comunitária',
    'roadmap.phase6.status': 'Em Breve',
    'roadmap.joinRevolution': 'Junte-se à Revolução VIAZEN',
    'roadmap.commitment': 'Este roteiro representa nosso compromisso com a inovação descentralizada. Cada fase nos aproxima de um futuro onde viagens, hospedagem e pagamentos são livres, justos e globais.',

    // Tokenomics
    'tokenomics.presalePhases': 'FASES DA PRÉ-VENDA',
    'tokenomics.fundraisingGoals': 'OBJETIVOS DA ARRECADAÇÃO',
    'tokenomics.participatePresale': 'PARTICIPAR DA PRÉ-VENDA',
    'tokenomics.paymentMethods': 'MÉTODOS DE PAGAMENTO ACEITOS',
    'tokenomics.kycInfo': 'Pagamentos em cripto e dinheiro não requerem KYC obrigatório.',
    'tokenomics.vestingInfo': 'Informações de Vesting',
    'tokenomics.appDevelopment': 'Desenvolvimento do app',
    'tokenomics.appDevelopmentDesc': 'Financiar o desenvolvimento do app de transporte e expansão inicial',
    'tokenomics.exchangeLiquidity': 'Liquidez em exchanges',
    'tokenomics.exchangeLiquidityDesc': 'Garantir liquidez em exchanges descentralizadas',
    'tokenomics.userRewards': 'Recompensas usuários',
    'tokenomics.userRewardsDesc': 'Recompensar os primeiros usuários do ecossistema',
    'tokenomics.technicalSecurity': 'Segurança técnica',
    'tokenomics.technicalSecurityDesc': 'Cobrir custos técnicos e de segurança (auditorias, servidores, APIs)',

    // Whitepaper
    'whitepaper.highlights.title': 'Destaques do Whitepaper',
    'whitepaper.highlights.subtitle': 'Descubra os aspectos-chave do ecossistema VIAZEN e sua proposta de valor revolucionária',
    'whitepaper.complete.title': 'Documento Funcional Completo',
    'whitepaper.complete.description': 'O whitepaper do VIAZEN apresenta um super app global que integra três serviços essenciais em uma plataforma:',
    'whitepaper.accommodation': 'Hospedagem entre particulares (estilo Airbnb)',
    'whitepaper.transport': 'Viagens e mobilidade (estilo Uber)',
    'whitepaper.payments': 'Pagamentos e cobranças com criptomoedas (estilo MercadoPago)',
    'whitepaper.architecture': 'Arquitetura Descentralizada',
    'whitepaper.architectureDesc': 'Sistema distribuído sem pontos únicos de falha',
    'whitepaper.transactions': 'Transações Instantâneas',
    'whitepaper.transactionsDesc': 'Processamento ultra-rápido com taxas mínimas',
    'whitepaper.expansion': 'Expansão Global',
    'whitepaper.expansionDesc': 'Ecossistema escalável para mercados mundiais',
    'whitepaper.languages': 'Idiomas suportados',
    'whitepaper.commissions': 'Comissões mínimas',
    'whitepaper.launchYear': 'Ano de lançamento',

    // Team
    'team.vision': 'UMA EQUIPE COM VISÃO E UMA COMUNIDADE EM CRESCIMENTO',
    'team.description': 'VIAZEN nasce da união de empreendedores apaixonados pela descentralização, transporte livre, hospedagem sem fronteiras e pagamentos sem intermediários.',
    'team.danilo.name': 'Danilo Ponce',
    'team.danilo.role': 'Fundador e CEO',
    'team.danilo.description': 'Programador e visionário. Criador do ecossistema VIAZEN como alternativa livre, descentralizada e inclusiva.',
    'team.cofounder.name': 'Em Breve',
    'team.cofounder.role': 'Co-fundador/a',
    'team.cofounder.description': 'Buscamos talento excepcional para se juntar à nossa missão de revolucionar o transporte, hospedagem e pagamentos descentralizados.',
    'team.developer.name': 'Junte-se à equipe',
    'team.developer.role': 'Desenvolvedor/a',
    'team.developer.description': 'Você é desenvolvedor blockchain, designer UX/UI ou especialista em fintech? Entre em contato para fazer parte da revolução VIAZEN.',

    // Community
    'community.buildingParadigm': 'Somos uma comunidade construindo um novo paradigma',
    'community.joinChannels': 'Junte-se aos nossos canais do Telegram, Discord e redes sociais.',

    // Footer
    'footer.slogan': '"Liberdade, recompensa e expansão global."',
    'footer.copyright': '© 2025 Viazen. Todos os direitos reservados.',

    // Common
    'common.participate': 'PARTICIPAR',
    'common.learnMore': 'SABER MAIS',
    'common.download': 'BAIXAR',
    'common.preview': 'VISUALIZAR',
    'common.coming': 'EM BREVE',
    'common.live': 'AO VIVO',
  },
  
  fr: {
    // Navigation
    'nav.home': 'ACCUEIL',
    'nav.trips': 'VOYAGES',
    'nav.accommodation': 'HÉBERGEMENT',
    'nav.payments': 'PAIEMENTS',
    'nav.tokenomics': 'TOKENOMICS',
    'nav.roadmap': 'ROADMAP',
    'nav.presale': 'PRÉVENTE',
    'nav.whitepaper': 'WHITEPAPER',
    'nav.team': 'ÉQUIPE',
    'nav.buyViaz': '🔗 CONNECTER PORTEFEUILLE',
    
    // Hero Section
    'hero.welcome': 'Bienvenue à Viazen',
    'hero.subtitle': 'Une révolution dans la façon de Voyager, se Loger et Payer',
    'hero.joinPresale': 'Rejoindre la Prévente',
    
    // Presale Banner
    'presale.launching': 'LANCEMENT',
    'presale.discount': '50% DE RÉDUCTION',
    'presale.participate': 'PARTICIPER MAINTENANT',
    
    // How It Works
    'howItWorks.title': 'Comment ça fonctionne?',
    'howItWorks.subtitle': 'Trois services révolutionnaires sur une seule plateforme décentralisée',
    'howItWorks.step1.title': 'Transport Décentralisé',
    'howItWorks.step1.desc': 'Connectez directement avec des conducteurs proches. Pas d\'intermédiaires, tarifs équitables et paiements crypto instantanés.',
    'howItWorks.step2.title': 'Hébergement Sans Intermédiaires',
    'howItWorks.step2.desc': 'Séjournez dans des propriétés uniques de la communauté. Paiements directs, expériences authentiques et récompenses pour chaque réservation.',
    'howItWorks.step3.title': 'Paiements Crypto Intégrés',
    'howItWorks.step3.desc': 'Portefeuilles décentralisés intégrés. Transactions sécurisées, frais minimaux et tokens de récompense automatiques.',
    
    // Services
    'services.transport.title': '🚗 Transport Décentralisé',
    'services.transport.desc': 'Voyagez en toute liberté. Sans intermédiaires. Commissions minimales.',
    'services.accommodation.title': '🏠 Hébergement P2P',
    'services.accommodation.desc': 'Hébergement direct entre personnes. Plus de gains. Moins de restrictions.',
    'services.payments.title': '💳 Paiements Globaux',
    'services.payments.desc': 'Transferts instantanés. Frais minimaux. Sans frontières.',
    
    // Transport Section
    'transport.title': 'Transport comme Uber, mais en mieux',
    'transport.intro': 'Nous offrirons un service de transport de personnes et de livraison comme Uber, Didi ou Cabify, mais avec ces',
    'transport.advantages': 'avantages uniques',
    'transport.feature1': 'Payez avec des cryptomonnaies, fiat ou carte',
    'transport.feature2': 'Sans limitations géographiques',
    'transport.feature3': 'Commission de seulement 5% (vs 25-35% d\'Uber)',
    'transport.feature4': 'Transactions transparentes sur blockchain',
    'transport.feature5': 'Récompenses en tokens VIAZ pour conducteurs et passagers fréquents',
    'transport.quote': '"Un système juste, rapide et global. Transport libre, sans frontières."',
    'transport.highlights.commission': 'Seulement 5% commission',
    'transport.highlights.blockchain': 'Blockchain',
    'transport.highlights.global': 'Sans frontières',
    'transport.highlights.tokens': 'Tokens VIAZ',
    
    // Accommodation Section
    'accommodation.title': 'Comme Airbnb, mais plus transparent et économique',
    'accommodation.intro': 'Une plateforme pour réserver et offrir des logements entre personnes, comme Airbnb, mais avec',
    'accommodation.improvements': 'améliorations clés',
    'accommodation.feature1': 'Commission de 5% (Airbnb facture jusqu\'à 18%)',
    'accommodation.feature2': 'Paiements avec des cryptomonnaies, fiat, ou notre token',
    'accommodation.feature3': 'Sans rétention ni censure géographique',
    'accommodation.feature4': 'Réputation basée sur blockchain',
    'accommodation.feature5': 'Cashback en VIAZ pour réservations réussies',
    'accommodation.quote': '"Voyagez et gagnez des récompenses. Dormez où vous voulez, en toute liberté."',
    'accommodation.network': 'Réseau Global',
    'accommodation.connecting': 'Connectant les foyers',
    'accommodation.highlights.commission': 'Seulement 5% commission',
    'accommodation.highlights.nocensorship': 'Sans censure',
    'accommodation.highlights.blockchain': 'Blockchain',
    'accommodation.highlights.cashback': 'Cashback VIAZ',
    
    // Payments Section
    'payments.title': 'Paiements comme MercadoPago, mais décentralisés',
    'payments.intro': 'Un portefeuille numérique dans le style de MercadoPago, mais avec ces',
    'payments.improvements': 'améliorations qui changent la donne',
    'payments.feature1': 'Décentralisé et sans intervention gouvernementale',
    'payments.feature2': 'Paiements avec QR, crypto, ou monnaie locale',
    'payments.feature3': 'Envoi d\'argent entre personnes sans limites ni intermédiaires',
    'payments.feature4': 'Frais bas: seulement 1% par transaction',
    'payments.feature5': 'Récompenses pour utiliser le token VIAZ',
    'payments.quote': '"Votre argent, entre vos mains. Toujours."',
    'payments.highlights.decentralized': 'Décentralisé',
    'payments.highlights.commission': 'Seulement 1% commission',
    'payments.highlights.qrcrypto': 'QR + Crypto',
    'payments.highlights.tokens': 'Tokens VIAZ',
    
    // Rewards Section
    'rewards.title': 'Système de Récompenses',
    'rewards.subtitle': 'Gagnez des tokens VZN pour chaque interaction et construisez votre richesse numérique',
    'rewards.stats.circulation': 'Tokens en Circulation',
    'rewards.stats.apy': 'APY Moyen',
    'rewards.stats.holders': 'Détenteurs Actifs',
    'rewards.stats.marketcap': 'Capitalisation',
    'rewards.card1.title': 'Tokens d\'Utilisation',
    'rewards.card1.desc': 'Gagnez des tokens VZN dans chaque transaction que vous effectuez sur la plateforme',
    'rewards.card2.title': 'APY Staking',
    'rewards.card2.desc': 'Rendements annuels pour maintenir vos tokens en staking',
    'rewards.card3.title': 'Parrainages',
    'rewards.card3.desc': 'Tokens de bonus pour chaque nouvel utilisateur que vous invitez',
    'rewards.card4.title': 'Gouvernance',
    'rewards.card4.desc': 'Participez aux décisions sur l\'avenir de la plateforme',
    'rewards.token.title': 'Viazen Token',
    'rewards.token.subtitle': 'L\'avenir du transport décentralisé',
    'rewards.token.description': 'Notre token natif VZN est le cœur de l\'écosystème Viazen. Utilisez-le pour payer des services, gagner des récompenses, participer à la gouvernance et accéder à des avantages exclusifs.',
    'rewards.token.utility.title': 'Utility Token',
    'rewards.token.utility.desc': 'Payez des services et réduisez les frais',
    'rewards.token.rewards.title': 'Rewards Token',
    'rewards.token.rewards.desc': 'Gagnez des tokens en participant',
    'rewards.token.governance.title': 'Governance Token',
    'rewards.token.governance.desc': 'Votez sur des décisions importantes',
    
    // Tokenomics
    'tokenomics.title': 'TOKENOMICS – VIAZ',
    'tokenomics.subtitle': 'Distribution, prévente et utilité du token VIAZ',
    'tokenomics.totalSupply': 'Offre Totale:',
    'tokenomics.distribution.title': '🧠 Distribution du Token VIAZ',
    'tokenomics.distribution.subtitle': 'Offre totale stratégiquement distribuée pour assurer la durabilité et la croissance de l\'écosystème',
    'tokenomics.legend': 'Légende Détaillée',
    'tokenomics.vesting': 'Informations de Vesting',
    'tokenomics.presale': 'Prévente: Sans verrouillage',
    'tokenomics.team': 'Équipe: 24 mois vesting',
    'tokenomics.development': 'Développement: Par jalons',
    'tokenomics.community': 'Communauté: Graduel 36 mois',
    
    // Payment Methods
    'payments.crypto': 'Cryptomonnaies',
    'payments.traditional': 'Méthodes Traditionnelles',
    'payments.kycInfo': 'Les paiements en crypto et espèces ne nécessitent pas de KYC obligatoire.',
    
    // Community
    'community.title': '🌍 Nous sommes une communauté construisant un nouveau paradigme',
    'community.subtitle': 'Rejoignez nos canaux Telegram, Discord et réseaux sociaux.',
    'community.stats.followers': 'Premiers followers',
    'community.stats.countries': 'Pays intéressés',
    'community.stats.active': 'Communauté active',
    
    // Whitepaper
    'whitepaper.title': 'WHITEPAPER VIAZEN',
    'whitepaper.subtitle': 'Document fonctionnel complet de VIAZEN: super app globale intégrant hébergement, voyages et paiements avec token VIAZ',
    'whitepaper.download': 'Télécharger PDF',
    'whitepaper.preview': 'Aperçu',
    
    // Team
    'team.title': 'NOTRE ÉQUIPE',
    'team.subtitle': 'Les visionnaires derrière la révolution VIAZEN',
    
    // Presale Banner
    'presale.title': '🚀 LA PRÉVENTE VIAZ VA COMMENCER !',
    'presale.countdown': 'Il reste exactement :',
    'presale.notifyButton': 'Prévenez-moi quand ça commence',
    'presale.started.title': '🚀 La prévente a commencé !',
    'presale.started.subtitle': 'Rejoignez-nous maintenant et faites partie du futur.',
    'presale.days': 'JOURS',
    'presale.hours': 'HEURES',
    'presale.minutes': 'MINUTES',
    'presale.seconds': 'SECONDES',
    
    // Presale Banner
    'presale.comingSoon': 'Bientôt, vous pourrez faire partie de la révolution des voyages, hébergements et paiements décentralisés.',
    'presale.getTokens': 'Obtenez vos tokens VIAZ',
    'presale.exclusiveRewards': 'avant tout le monde et gagnez des récompenses exclusives.',
    'presale.finalizing': 'Nous finalisons les derniers détails techniques et légaux pour vous offrir une expérience',
    'presale.secure': 'sécurisée',
    'presale.fair': 'équitable',
    'presale.global': 'globale',
    'presale.launched': 'La prévente officielle a commencé. Rejoignez la révolution décentralisée et acquérez vos tokens VIAZ avec',
    'presale.exclusiveDiscounts': 'des remises exclusives',
    'presale.immediateRewards': 'des récompenses immédiates',
    'presale.priorityAccess': 'un accès prioritaire',
    'presale.allFeatures': 'à toutes les fonctionnalités.',

    // How It Works
    'howItWorks.integrated': 'Tout intégré dans une seule app',

    // Roadmap
    'roadmap.subtitle': 'Découvrez notre feuille de route vers un avenir décentralisé plein d\'opportunités.',
    'roadmap.masterPlan': 'Le plan maître pour construire l\'écosystème',
    'roadmap.revolutionize': 'et révolutionner l\'avenir du transport, hébergement et paiements décentralisés.',
    'roadmap.phase1.title': 'Fondation et Concept',
    'roadmap.phase1.date': 'Juin 2025',
    'roadmap.phase1.item1': 'Achat du domaine viazen.app',
    'roadmap.phase1.item2': 'Conception conceptuelle de l\'écosystème : Transport, Hébergement et Paiements',
    'roadmap.phase1.item3': 'Développement de l\'identité visuelle et du logo',
    'roadmap.phase1.status': 'Terminé',
    'roadmap.phase2.title': 'Lancement Web et Communauté',
    'roadmap.phase2.date': 'Juillet 2025',
    'roadmap.phase2.item1': 'Publication du site web officiel',
    'roadmap.phase2.item2': 'Création de comptes sur les réseaux sociaux (X, Instagram, Telegram)',
    'roadmap.phase2.item3': 'Campagnes de captation d\'intéressés',
    'roadmap.phase2.status': 'En Cours',
    'roadmap.phase3.title': 'Prévente du Token VIAZ',
    'roadmap.phase3.date': '15 Juillet 2025',
    'roadmap.phase3.item1': 'Ouverture officielle de la prévente',
    'roadmap.phase3.item2': 'Vente initiale du token à prix exclusif',
    'roadmap.phase3.item3': 'Récompenses pour parrainage et airdrops',
    'roadmap.phase3.status': 'Bientôt',
    'roadmap.phase4.title': 'Développement de l\'App',
    'roadmap.phase4.date': 'Octobre 2025',
    'roadmap.phase4.item1': 'Début du développement de l\'App de Transport (comme Uber/Didi)',
    'roadmap.phase4.item2': 'Intégration de paiements traditionnels et crypto',
    'roadmap.phase4.item3': 'App sans limites géographiques et avec commissions de 5%',
    'roadmap.phase4.status': 'Bientôt',
    'roadmap.phase5.title': 'Expansion de l\'Écosystème',
    'roadmap.phase5.date': '2026',
    'roadmap.phase5.item1': 'Lancement du module d\'Hébergement (comme Airbnb)',
    'roadmap.phase5.item2': 'Développement du module de Paiements (comme MercadoPago)',
    'roadmap.phase5.item3': 'Création de la blockchain propre pour faibles commissions et contrôle d\'inflation',
    'roadmap.phase5.status': 'Bientôt',
    'roadmap.phase6.title': 'Évolutivité Globale',
    'roadmap.phase6.date': '2027 et au-delà',
    'roadmap.phase6.item1': 'Expansion vers toute l\'Amérique Latine, puis Europe et Asie',
    'roadmap.phase6.item2': 'Inclusion de plus de services dans l\'écosystème VIAZEN',
    'roadmap.phase6.item3': 'Développement d\'alliances stratégiques et DAO communautaire',
    'roadmap.phase6.status': 'Bientôt',
    'roadmap.joinRevolution': 'Rejoignez la Révolution VIAZEN',
    'roadmap.commitment': 'Cette feuille de route représente notre engagement envers l\'innovation décentralisée. Chaque phase nous rapproche d\'un avenir où les voyages, l\'hébergement et les paiements sont libres, équitables et globaux.',

    // Tokenomics
    'tokenomics.presalePhases': 'PHASES DE PRÉVENTE',
    'tokenomics.fundraisingGoals': 'OBJECTIFS DE COLLECTE',
    'tokenomics.participatePresale': 'PARTICIPER À LA PRÉVENTE',
    'tokenomics.paymentMethods': 'MÉTHODES DE PAIEMENT ACCEPTÉES',
    'tokenomics.kycInfo': 'Les paiements en crypto et espèces ne nécessitent pas de KYC obligatoire.',
    'tokenomics.vestingInfo': 'Informations de Vesting',
    'tokenomics.appDevelopment': 'Développement de l\'app',
    'tokenomics.appDevelopmentDesc': 'Financer le développement de l\'app de transport et l\'expansion initiale',
    'tokenomics.exchangeLiquidity': 'Liquidité des exchanges',
    'tokenomics.exchangeLiquidityDesc': 'Assurer la liquidité sur les exchanges décentralisés',
    'tokenomics.userRewards': 'Récompenses utilisateurs',
    'tokenomics.userRewardsDesc': 'Récompenser les premiers utilisateurs de l\'écosystème',
    'tokenomics.technicalSecurity': 'Sécurité technique',
    'tokenomics.technicalSecurityDesc': 'Couvrir les coûts techniques et de sécurité (audits, serveurs, APIs)',

    // Whitepaper
    'whitepaper.highlights.title': 'Points Forts du Whitepaper',
    'whitepaper.highlights.subtitle': 'Découvrez les aspects clés de l\'écosystème VIAZEN et sa proposition de valeur révolutionnaire',
    'whitepaper.complete.title': 'Document Fonctionnel Complet',
    'whitepaper.complete.description': 'Le whitepaper de VIAZEN présente une super app globale qui intègre trois services essentiels sur une plateforme :',
    'whitepaper.accommodation': 'Hébergement entre particuliers (style Airbnb)',
    'whitepaper.transport': 'Voyages et mobilité (style Uber)',
    'whitepaper.payments': 'Paiements et collectes avec cryptomonnaies (style MercadoPago)',
    'whitepaper.architecture': 'Architecture Décentralisée',
    'whitepaper.architectureDesc': 'Système distribué sans points de défaillance unique',
    'whitepaper.transactions': 'Transactions Instantanées',
    'whitepaper.transactionsDesc': 'Traitement ultra-rapide avec frais minimaux',
    'whitepaper.expansion': 'Expansion Globale',
    'whitepaper.expansionDesc': 'Écosystème évolutif pour les marchés mondiaux',
    'whitepaper.languages': 'Langues supportées',
    'whitepaper.commissions': 'Commissions minimales',
    'whitepaper.launchYear': 'Année de lancement',

    // Team
    'team.vision': 'UNE ÉQUIPE AVEC UNE VISION ET UNE COMMUNAUTÉ EN CROISSANCE',
    'team.description': 'VIAZEN naît de l\'union d\'entrepreneurs passionnés par la décentralisation, le transport libre, l\'hébergement sans frontières et les paiements sans intermédiaires.',
    'team.danilo.name': 'Danilo Ponce',
    'team.danilo.role': 'Fondateur et PDG',
    'team.danilo.description': 'Programmeur et visionnaire. Créateur de l\'écosystème VIAZEN comme alternative libre, décentralisée et inclusive.',
    'team.cofounder.name': 'Bientôt',
    'team.cofounder.role': 'Co-fondateur/trice',
    'team.cofounder.description': 'Nous recherchons des talents exceptionnels pour rejoindre notre mission de révolutionner le transport, l\'hébergement et les paiements décentralisés.',
    'team.developer.name': 'Rejoignez l\'équipe',
    'team.developer.role': 'Développeur/se',
    'team.developer.description': 'Êtes-vous développeur blockchain, designer UX/UI ou expert en fintech ? Contactez-nous pour faire partie de la révolution VIAZEN.',

    // Community
    'community.buildingParadigm': 'Nous sommes une communauté construisant un nouveau paradigme',
    'community.joinChannels': 'Rejoignez nos canaux Telegram, Discord et réseaux sociaux.',

    // Footer
    'footer.slogan': '"Liberté, récompense et expansion globale."',
    'footer.copyright': '© 2025 Viazen. Tous droits réservés.',

    // Common
    'common.participate': 'PARTICIPER',
    'common.learnMore': 'EN SAVOIR PLUS',
    'common.download': 'TÉLÉCHARGER',
    'common.preview': 'APERÇU',
    'common.coming': 'BIENTÔT',
    'common.live': 'EN DIRECT',
  }
};

// Crear el contexto
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider del contexto
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Intentar obtener el idioma guardado o usar el idioma del navegador
    const savedLanguage = localStorage.getItem('viazen-language') as Language;
    if (savedLanguage && ['es', 'en', 'pt', 'fr'].includes(savedLanguage)) {
      return savedLanguage;
    }
    
    // Detectar idioma del navegador
    const browserLanguage = navigator.language.slice(0, 2);
    if (['es', 'en', 'pt', 'fr'].includes(browserLanguage)) {
      return browserLanguage as Language;
    }
    
    return 'es'; // Idioma por defecto
  });

  useEffect(() => {
    localStorage.setItem('viazen-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
