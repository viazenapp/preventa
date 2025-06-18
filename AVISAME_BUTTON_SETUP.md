# Botón "Avisame cuando inicie" - EmailJS Integration

## ✅ Configuración Completa del Botón "Avisame cuando inicie"

El botón "Avisame cuando inicie" en el banner de preventa ahora está completamente integrado con EmailJS y captura tanto nombre como email del usuario.

### 🚀 **Sitio Web Actualizado**
**URL:** https://oqov2hxrvq.space.minimax.io

---

## 🔧 **Configuración EmailJS Implementada**

### **Credenciales Utilizadas:**
- ✅ **Service ID**: `service_rv65dr1`
- ✅ **Template ID**: `template_o6dix4e`  
- ✅ **Public Key**: `BmPNFJR47y-GFlqOD`
- ✅ **Destino**: `info@viazen.app`

### **Fuente del Botón:**
- **Ubicación**: Banner de preventa (parte superior de la página)
- **Texto**: "🔔 Avisame cuando inicie"
- **Funcionalidad**: Abre modal con formulario de nombre y email

---

## 📧 **Formulario del Modal**

### **Campos Capturados:**
1. **Nombre**: Campo de texto requerido
   - Label: "Tu nombre"
   - Placeholder: "Nombre completo"
   - Validation: Campo obligatorio

2. **Email**: Campo email requerido
   - Label: "Tu dirección de email"
   - Placeholder: "tu@email.com"
   - Validation: Formato de email válido

### **Botón de Envío:**
- **Texto**: "🚀 Quiero ser notificado"
- **Estados**: Loading con spinner durante envío
- **Acción**: Envía datos via EmailJS a info@viazen.app

---

## 📨 **Datos Enviados via EmailJS**

**Template Variables que recibe tu EmailJS:**

```javascript
{
  to_email: 'info@viazen.app',
  to_name: 'Equipo Viazen',
  from_email: 'usuario@ejemplo.com',
  from_name: 'Nombre del Usuario',
  user_email: 'usuario@ejemplo.com',
  user_name: 'Nombre del Usuario',
  message: 'Usuario solicitó notificación para el lanzamiento de Viazen',
  timestamp: '19/01/2025, 15:30',
  subject: 'Nueva suscripción a notificaciones de Viazen'
}
```

### **Variables del Template EmailJS:**
- `{{user_name}}` - Nombre del usuario
- `{{user_email}}` - Email del usuario  
- `{{timestamp}}` - Fecha y hora en zona Argentina
- `{{message}}` - Mensaje estándar de suscripción
- `{{to_email}}` - Destino (info@viazen.app)

---

## 🎯 **Flujo de Funcionamiento**

### **1. Usuario hace clic en "Avisame cuando inicie"**
- Se abre modal con título "¡Únete a la Lista VIP!"
- Aparece formulario con campos de nombre y email
- Se muestran beneficios exclusivos

### **2. Usuario completa formulario**
- Ingresa nombre completo
- Ingresa dirección de email
- Hace clic en "🚀 Quiero ser notificado"

### **3. Validación y envío**
- Sistema valida que nombre no esté vacío
- Sistema valida formato de email
- Si todo es válido, procede con envío

### **4. EmailJS envía datos**
- Datos se envían a tu template configurado
- Email llega a info@viazen.app con información del usuario
- Sistema guarda backup en localStorage del navegador

### **5. Confirmación al usuario**
- Modal se cierra automáticamente
- Aparece alert: "¡Perfecto [Nombre]! 🎉 Te has suscrito exitosamente..."
- Usuario queda registrado como suscrito

---

## 🧪 **Cómo Probar el Botón**

### **Pasos para Prueba:**

1. **Visita**: https://oqov2hxrvq.space.minimax.io
2. **Busca el banner de preventa** en la parte superior
3. **Haz clic** en el botón azul "🔔 Avisame cuando inicie"
4. **Completa el modal**:
   - Nombre: Tu nombre de prueba
   - Email: Tu email de prueba
5. **Haz clic** en "🚀 Quiero ser notificado"
6. **Verifica**:
   - Modal se cierra
   - Aparece mensaje de confirmación personalizado
   - Email llega a info@viazen.app

### **Resultados Esperados:**
- ✅ **Modal se abre** correctamente
- ✅ **Validación funciona** (campos obligatorios)
- ✅ **Email se envía** via EmailJS
- ✅ **Confirmación personalizada** con nombre del usuario
- ✅ **Email recibido** en info@viazen.app
- ✅ **Datos guardados** localmente como backup

---

## 🎨 **Diseño del Modal**

### **Características Visuales:**
- **Tema**: Gradiente púrpura a negro con bordes cyan
- **Animaciones**: Backdrop blur y transiciones suaves
- **Responsive**: Se adapta a dispositivos móviles
- **Accesibilidad**: Labels claros y navegación por teclado

### **Beneficios Mostrados:**
- ✓ Acceso prioritario a la preventa
- ✓ Descuentos exclusivos hasta 30%
- ✓ Email de bienvenida con detalles VIP

### **Botones de Cierre:**
- **X en esquina**: Cierra modal y limpia campos
- **Click en fondo**: Cierra modal y limpia campos
- **Escape key**: Funcionalidad estándar del navegador

---

## 🛠️ **Código Implementado**

### **Componente**: `PresaleAnnouncementBanner.tsx`

```javascript
// Estado del modal y formulario
const [showEmailModal, setShowEmailModal] = useState(false);
const [email, setEmail] = useState('');
const [name, setName] = useState('');

// Handler del botón "Avisame cuando inicie"
const handleNotifyMe = () => {
  setShowEmailModal(true);
};

// Handler de envío del formulario
const handleEmailSubmit = async (e: React.FormEvent) => {
  // Validación de campos
  // Envío via EmailJS
  // Confirmación al usuario
};
```

### **Integración con EmailJS**:
```javascript
import { sendNotificationWithName } from '../services/simpleEmailService';

const success = await sendNotificationWithName(email, name, 'emailjs');
```

---

## ✅ **Estado Final**

**El botón "Avisame cuando inicie" ahora:**

- ✅ **Abre modal** con formulario completo (nombre + email)
- ✅ **Valida datos** antes de enviar
- ✅ **Envía via EmailJS** usando tus credenciales
- ✅ **Entrega a info@viazen.app** automáticamente
- ✅ **Confirma al usuario** con mensaje personalizado
- ✅ **Guarda backup local** para redundancia
- ✅ **Maneja errores** gracefully

**¡El botón está completamente funcional y listo para capturar leads de usuarios interesados en Viazen! 🚀📧**
