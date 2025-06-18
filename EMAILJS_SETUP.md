# EmailJS Configuration Guide for Viazen

## ✅ EmailJS Integration Complete

The email form now sends real emails via EmailJS to **info@viazen.app** using your configured credentials.

### 🔧 Configuration Details:

- **Service ID**: `service_rv65dr1`
- **Template ID**: `template_o6dix4e`  
- **Public Key**: `BmPNFJR47y-GFlqOD`
- **Destination Email**: `info@viazen.app`

### 📧 Template Variables Used:

Your EmailJS template should include these variables:

```
{{to_email}} - info@viazen.app
{{to_name}} - Equipo Viazen
{{from_email}} - User's email address
{{from_name}} - User's name
{{user_email}} - User's email (duplicate for clarity)
{{user_name}} - User's name (duplicate for clarity)
{{message}} - "Usuario solicitó notificación para el lanzamiento de Viazen"
{{timestamp}} - Argentina timezone timestamp
{{subject}} - "Nueva suscripción a notificaciones de Viazen"
```

### 📝 Example EmailJS Template:

```html
Nuevo registro para notificaciones de Viazen

Nombre: {{user_name}}
Email: {{user_email}}
Fecha: {{timestamp}}

Mensaje: {{message}}

---
Este email fue enviado desde el formulario de Viazen.
```

### 🧪 Testing the Form:

1. **Visit**: https://izg8l6edom.space.minimax.io
2. **Find the form** in hero section or notification sections
3. **Fill in**:
   - Name: Your test name
   - Email: Your test email
4. **Click**: "Avisame cuando inicie"
5. **Expect**: Success message and email sent to info@viazen.app

### 📱 Form Features:

- **Name Field**: Required input with user icon
- **Email Field**: Required input with mail icon  
- **Validation**: Checks name and email format
- **Loading State**: Shows "Enviando..." during submission
- **Success State**: Shows green checkmark with "¡Email registrado exitosamente!"
- **Error Handling**: Spanish error messages

### 🔍 What Happens on Submit:

1. **Form Validation**: Checks name and email are filled
2. **EmailJS Call**: Sends data to your template
3. **Local Backup**: Saves to browser localStorage
4. **Success Feedback**: Shows confirmation message
5. **Form Reset**: Clears fields after success

### 🛠️ Technical Implementation:

```javascript
// EmailJS configuration
const templateParams = {
  to_email: 'info@viazen.app',
  to_name: 'Equipo Viazen',
  from_email: emailData.email,
  from_name: emailData.name,
  user_email: emailData.email,
  user_name: emailData.name,
  message: 'Usuario solicitó notificación para el lanzamiento de Viazen',
  timestamp: new Date().toLocaleString('es-ES', { 
    timeZone: 'America/Argentina/Buenos_Aires'
  }),
  subject: 'Nueva suscripción a notificaciones de Viazen',
};

// Send via EmailJS
await emailjs.send(
  'service_rv65dr1',
  'template_o6dix4e', 
  templateParams,
  'BmPNFJR47y-GFlqOD'
);
```

### ✅ Expected Results:

- **Form submits successfully**
- **Email received at info@viazen.app**
- **Console shows**: "EmailJS response: {status: 200}"
- **User sees**: "¡Email registrado exitosamente!"

The EmailJS integration is now fully functional and ready for production use!
