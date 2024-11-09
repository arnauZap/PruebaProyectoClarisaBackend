const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

// Middleware para parsear JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Hola desde el backend de Node.js!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

const stripe = require('stripe')(process.env.API_KEY_STRIPE);


app.post('/payment', async (req, res) => {
  try {
    const { amount, currency, paymentMethodId } = req.body;

    // Crear un pago con Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirm: true,
    });

    res.status(200).json({ success: true, paymentIntent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});