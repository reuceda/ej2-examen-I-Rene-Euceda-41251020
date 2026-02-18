const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    clienteNombre: { 
        type: String, 
        required: true 
    },
    total: {
        type: Number,
        required: true,
        min: 0.01
    },
    estado: {
        type: String,
        enum: ['pendiente', 'enviado', 'entregado'],
        default: 'pendiente'
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    productos:
    [
        {
            nombre: { type: String, required: false },
            cantidad: { type: Number, required: false, min: 1 },
            precio: { type: Number, required: false, min: 0.01 }
        }
    ]

});

module.exports = mongoose.model('Pedido', pedidoSchema);