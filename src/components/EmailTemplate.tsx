// Plantilla del email de bienvenida que se envía automáticamente
export const generateWelcomeEmail = (userEmail: string) => {
  const userName = userEmail.split('@')[0];
  
  return {
    subject: "🚀 ¡Bienvenido a VIAZEN! Tu acceso VIP está confirmado",
    htmlContent: `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido a VIAZEN</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
            color: #ffffff;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, #1a1a2e 0%, #0f0f23 100%);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 255, 255, 0.1);
        }
        .header {
            background: linear-gradient(90deg, #00ffff 0%, #8b5cf6 50%, #ffd700 100%);
            padding: 30px;
            text-align: center;
        }
        .logo {
            font-size: 36px;
            font-weight: bold;
            color: #000;
            letter-spacing: 2px;
        }
        .content {
            padding: 40px 30px;
        }
        .title {
            font-size: 28px;
            font-weight: bold;
            color: #00ffff;
            text-align: center;
            margin-bottom: 20px;
        }
        .subtitle {
            font-size: 18px;
            color: #a0a0a0;
            text-align: center;
            margin-bottom: 30px;
        }
        .benefits {
            background: rgba(0, 255, 255, 0.1);
            border: 2px solid rgba(0, 255, 255, 0.3);
            border-radius: 15px;
            padding: 25px;
            margin: 30px 0;
        }
        .benefit-item {
            display: flex;
            align-items: center;
            margin: 15px 0;
            font-size: 16px;
        }
        .checkmark {
            color: #00ff7f;
            margin-right: 15px;
            font-size: 20px;
        }
        .highlight {
            color: #ffd700;
            font-weight: bold;
        }
        .coming-next {
            background: rgba(139, 92, 246, 0.1);
            border: 2px solid rgba(139, 92, 246, 0.3);
            border-radius: 15px;
            padding: 20px;
            margin: 30px 0;
        }
        .services {
            background: rgba(255, 215, 0, 0.1);
            border-radius: 15px;
            padding: 20px;
            margin: 30px 0;
        }
        .service-item {
            margin: 10px 0;
            padding-left: 20px;
            color: #e0e0e0;
        }
        .footer {
            background: rgba(0, 0, 0, 0.3);
            padding: 30px;
            text-align: center;
            border-top: 1px solid rgba(0, 255, 255, 0.2);
        }
        .social-links {
            margin: 20px 0;
        }
        .btn {
            display: inline-block;
            background: linear-gradient(90deg, #00ffff, #8b5cf6);
            color: #000;
            padding: 15px 30px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: bold;
            margin: 20px 10px;
            transition: all 0.3s;
        }
        .pulse {
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo pulse">VIAZEN</div>
            <div style="color: #000; font-size: 14px; margin-top: 10px;">
                La Revolución Descentralizada
            </div>
        </div>

        <!-- Content -->
        <div class="content">
            <div class="title">
                🚀 ¡Bienvenido a VIAZEN!
            </div>
            
            <div class="subtitle">
                Hola <strong>${userName}</strong>,<br>
                ¡Gracias por unirte a la revolución descentralizada!
            </div>

            <!-- Benefits Section -->
            <div class="benefits">
                <h3 style="color: #00ffff; text-align: center; margin-top: 0;">
                    🌟 Eres parte exclusiva de nuestra comunidad VIP
                </h3>
                
                <div class="benefit-item">
                    <span class="checkmark">✅</span>
                    <span>Acceso prioritario a la preventa del token VIAZ</span>
                </div>
                
                <div class="benefit-item">
                    <span class="checkmark">✅</span>
                    <span>Descuentos exclusivos hasta del <span class="highlight">30%</span></span>
                </div>
                
                <div class="benefit-item">
                    <span class="checkmark">✅</span>
                    <span>Recompensas especiales por referidos</span>
                </div>
                
                <div class="benefit-item">
                    <span class="checkmark">✅</span>
                    <span>Actualizaciones en tiempo real del desarrollo</span>
                </div>
                
                <div class="benefit-item">
                    <span class="checkmark">✅</span>
                    <span>Acceso VIP a nuestra comunidad de Telegram</span>
                </div>
            </div>

            <!-- Coming Next -->
            <div class="coming-next">
                <h3 style="color: #8b5cf6; margin-top: 0;">🎯 ¿Qué viene ahora?</h3>
                
                <div style="margin: 15px 0;">
                    <strong>📅 Preventa estimada:</strong> <span class="highlight">Agosto 2025</span>
                </div>
                
                <div style="margin: 15px 0;">
                    <strong>💰 Precio especial</strong> para early birds como tú
                </div>
                
                <div style="margin: 15px 0;">
                    <strong>🔗 Invitación</strong> a canal privado de Telegram
                </div>
                
                <div style="margin: 15px 0;">
                    <strong>📱 Beta testing</strong> de la app (próximamente)
                </div>
            </div>

            <!-- Services -->
            <div class="services">
                <h3 style="color: #ffd700; margin-top: 0;">🌍 VIAZEN está creando el futuro de:</h3>
                
                <div class="service-item">
                    • <strong>Transporte descentralizado</strong> (como Uber, pero mejor)
                </div>
                
                <div class="service-item">
                    • <strong>Alojamiento sin fronteras</strong> (como Airbnb, pero libre)
                </div>
                
                <div class="service-item">
                    • <strong>Pagos globales</strong> (como MercadoPago, pero descentralizado)
                </div>
            </div>

            <div style="text-align: center; margin: 30px 0; padding: 20px; background: rgba(0, 255, 127, 0.1); border-radius: 15px;">
                <p style="margin: 0; font-size: 18px;">
                    <strong>Mantente atento a tu email.</strong><br>
                    Muy pronto recibirás más detalles sobre la preventa.
                </p>
            </div>

            <div style="text-align: center; font-size: 20px; color: #00ffff; margin: 30px 0;">
                ¡El futuro es descentralizado, y tú ya estás dentro! 🌟
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 20px;">
                Equipo VIAZEN
            </div>
            
            <div style="margin: 20px 0;">
                🌐 <a href="https://viazen.app" style="color: #00ffff; text-decoration: none;">viazen.app</a><br>
                📧 <a href="mailto:info@viazen.io" style="color: #00ffff; text-decoration: none;">info@viazen.io</a>
            </div>
            
            <div style="font-size: 12px; color: #888; margin-top: 20px;">
                Recibiste este email porque te suscribiste a nuestras actualizaciones.<br>
                Si no deseas recibir más emails, puedes <a href="#" style="color: #888;">darte de baja aquí</a>.
            </div>
        </div>
    </div>
</body>
</html>
    `,
    textContent: `
🚀 ¡Bienvenido a VIAZEN! 🚀

Hola ${userName},

¡Gracias por unirte a la revolución descentralizada!

🌟 Eres parte exclusiva de nuestra comunidad de early adopters y tendrás:

✅ Acceso prioritario a la preventa del token VIAZ
✅ Descuentos exclusivos hasta del 30%
✅ Recompensas especiales por referidos
✅ Actualizaciones en tiempo real del desarrollo
✅ Acceso VIP a nuestra comunidad de Telegram

🎯 ¿Qué viene ahora?

📅 Preventa estimada: Agosto 2025
💰 Precio especial para early birds
🔗 Invitación a canal privado de Telegram
📱 Beta testing de la app (próximamente)

🌍 VIAZEN está creando el futuro de:
• Transporte descentralizado (como Uber, pero mejor)
• Alojamiento sin fronteras (como Airbnb, pero libre)
• Pagos globales (como MercadoPago, pero descentralizado)

Mantente atento a tu email. Muy pronto recibirás más detalles sobre la preventa.

¡El futuro es descentralizado, y tú ya estás dentro!

—
Equipo VIAZEN
🌐 viazen.app
📧 info@viazen.io
    `
  };
};
