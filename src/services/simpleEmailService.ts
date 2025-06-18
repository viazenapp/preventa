// Simple email service that simulates email sending
// In production, you would integrate with EmailJS, Formspree, or your own backend

export interface EmailData {
  email: string;
  name: string;
  message?: string;
}

// Demo function that simulates email sending (for testing)
export const sendDemoNotification = async (email: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Demo: Email notification sent to ${email}`);
      console.log(`Email data stored: ${JSON.stringify({ 
        email, 
        timestamp: new Date().toISOString(),
        type: 'presale_notification' 
      })}`);
      resolve(true);
    }, 1000);
  });
};

// Real Formspree integration
export const sendFormspreeNotification = async (emailData: EmailData): Promise<boolean> => {
  try {
    // Using a real Formspree endpoint for Viazen notifications
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mjkvbqao';
    
    console.log('Enviando email via Formspree:', emailData);
    
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: emailData.email,
        name: emailData.name || 'Usuario Viazen',
        message: emailData.message || 'Usuario solicitó notificación para el lanzamiento de Viazen',
        timestamp: new Date().toLocaleString('es-ES', { 
          timeZone: 'America/Argentina/Buenos_Aires',
          day: '2-digit',
          month: '2-digit', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        subject: 'Nueva suscripción a notificaciones de Viazen',
        _replyto: emailData.email,
        _subject: 'Nueva suscripción a notificaciones de Viazen'
      }),
    });

    if (response.ok) {
      console.log('Email enviado exitosamente via Formspree');
      return true;
    } else {
      const errorData = await response.json();
      console.error('Error de Formspree:', errorData);
      return false;
    }
  } catch (error) {
    console.error('Error enviando notificación via Formspree:', error);
    return false;
  }
};

// Real EmailJS integration with Viazen credentials
export const sendEmailJSNotification = async (emailData: EmailData): Promise<boolean> => {
  try {
    // Import EmailJS dynamically
    const emailjs = await import('emailjs-com');
    
    const templateParams = {
      to_email: 'info@viazen.app',
      to_name: 'Equipo Viazen',
      from_email: emailData.email,
      from_name: emailData.name || 'Usuario Interesado',
      user_email: emailData.email,
      user_name: emailData.name || 'Usuario Interesado',
      message: emailData.message || 'Usuario solicitó notificación para el lanzamiento de Viazen',
      timestamp: new Date().toLocaleString('es-ES', { 
        timeZone: 'America/Argentina/Buenos_Aires',
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      subject: 'Nueva suscripción a notificaciones de Viazen',
    };

    console.log('Enviando email via EmailJS:', templateParams);

    const response = await emailjs.default.send(
      'service_rv65dr1', // Tu Service ID
      'template_o6dix4e', // Tu Template ID  
      templateParams,
      'BmPNFJR47y-GFlqOD' // Tu Public Key
    );

    console.log('EmailJS response:', response);
    return response.status === 200;
  } catch (error) {
    console.error('Error enviando email via EmailJS:', error);
    return false;
  }
};

// Local storage for demo purposes
export const saveEmailLocally = (email: string, name?: string): void => {
  try {
    const existingEmails = JSON.parse(localStorage.getItem('viazen_emails') || '[]');
    const newEntry = {
      email,
      name: name || 'Usuario Interesado',
      timestamp: new Date().toISOString(),
      id: Math.random().toString(36).substr(2, 9),
    };
    
    // Avoid duplicates
    if (!existingEmails.find((entry: any) => entry.email === email)) {
      existingEmails.push(newEntry);
      localStorage.setItem('viazen_emails', JSON.stringify(existingEmails));
      console.log('Email y nombre guardados localmente:', newEntry);
    }
  } catch (error) {
    console.error('Error saving email locally:', error);
  }
};

// Get all saved emails (for admin purposes)
export const getSavedEmails = (): any[] => {
  try {
    return JSON.parse(localStorage.getItem('viazen_emails') || '[]');
  } catch (error) {
    console.error('Error retrieving saved emails:', error);
    return [];
  }
};

// Main email service function with name support
export const sendNotificationWithName = async (email: string, name: string, method: 'demo' | 'formspree' | 'emailjs' = 'emailjs'): Promise<boolean> => {
  const emailData: EmailData = {
    email,
    name,
    message: 'Usuario solicitó notificación para el lanzamiento de Viazen',
  };

  // Save locally for backup
  saveEmailLocally(email, name);

  // Send via selected method
  switch (method) {
    case 'formspree':
      return await sendFormspreeNotification(emailData);
    case 'emailjs':
      return await sendEmailJSNotification(emailData);
    case 'demo':
    default:
      return await sendDemoNotification(email);
  }
};

// Backward compatibility function  
export const sendNotification = async (email: string, method: 'demo' | 'formspree' | 'emailjs' = 'emailjs'): Promise<boolean> => {
  // Save locally for backup
  saveEmailLocally(email, 'Usuario Interesado');
  
  return await sendNotificationWithName(email, 'Usuario Interesado', method);
};