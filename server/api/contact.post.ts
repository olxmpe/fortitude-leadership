import { Resend } from "resend";

async function verifyRecaptcha(token: string, secretKey: string): Promise<boolean> {
  if (!token || !secretKey) return true; // skip verification if not configured

  const response = await $fetch<{ success: boolean; score: number }>(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      body: new URLSearchParams({ secret: secretKey, response: token }).toString(),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    },
  );

  return response.success && response.score >= 0.5;
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { lastName, firstName, email, phone, subject, message, website, recaptchaToken } = body;
  const contactEmail = process.env.CONTACT_EMAIL;
  const config = useRuntimeConfig(event);

  // Honeypot: bots fill hidden fields, humans don't
  if (website) {
    return { success: true };
  }

  if (!lastName || !firstName || !email || !message) {
    throw createError({ statusCode: 400, message: "Champs requis manquants." });
  }

  const isHuman = await verifyRecaptcha(recaptchaToken ?? "", config.recaptchaSecretKey ?? "");
  if (!isHuman) {
    throw createError({ statusCode: 400, message: "Vérification anti-spam échouée." });
  }

  if (!contactEmail) {
    throw createError({
      statusCode: 400,
      message:
        "Votre message n'a pas pu être envoyé. Veuillez actualiser la page et réessayer.",
    });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "fortitude-leadership.com - Formulaire de contact",
    to: contactEmail,
    replyTo: email,
    subject: `Nouveau message de ${firstName} ${lastName}`,
    text: [
      `Nom : ${lastName}`,
      `Prénom : ${firstName}`,
      `Email : ${email}`,
      phone ? `Téléphone : ${phone}` : null,
      subject ? `Objet : ${subject}` : null,
      ``,
      `Message :`,
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  return { success: true };
});
