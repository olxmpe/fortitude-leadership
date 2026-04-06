import { Resend } from "resend";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { lastName, firstName, email, phone, message } = body;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!lastName || !firstName || !email || !message) {
    throw createError({ statusCode: 400, message: "Champs requis manquants." });
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
      ``,
      `Message :`,
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  return { success: true };
});
