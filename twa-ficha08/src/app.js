import express from 'express'
import itemsRouter from './items/router.js'

const app = express()

// 1º — logger: corre em todos os pedidos
app.use((req, res, next) => {
  console.log(req.method, req.url)
  next() // passa ao seguinte; sem isto o pedido fica pendurado
})

// 2º — lê corpos JSON (tem de vir antes das rotas)
app.use(express.json())

// 3º — rotas
app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date() })
})
app.use('/api/items', itemsRouter)

// último — só chega aqui o que ninguém respondeu
app.use((req, res) => res.status(404).json({ error: 'not found' }))

app.listen(3000, () => console.log('http://localhost:3000'))