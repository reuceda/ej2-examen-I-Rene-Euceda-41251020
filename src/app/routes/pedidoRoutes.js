const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const { body } = require('express-validator');

//rutas CRUD
router.post('/', [
    body('clienteNombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('total').isFloat({ min: 0.01 }).withMessage('El total debe ser un número positivo'),
    body('productos').isArray().withMessage('Los productos deben ser un array')
], pedidoController.createPedido);

router.get('/', pedidoController.getAllPedidos);
router.get('/:id', pedidoController.getPedidoById);

//filtrar pedidos por estado (ej. /pedidos/estado/pendiente).

router.get('/estado/:estado', pedidoController.getPedidosByEstado);

router.put('/:id', [
    body('id').notEmpty().withMessage('El ID es obligatorio'),
    body('clienteNombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('total').optional().isFloat({ min: 0.01 }).withMessage('El total debe ser un número positivo'),
    body('estado').optional().isIn(['pendiente', 'enviado', 'entregado']).withMessage('El estado debe ser uno de los valores válidos')
], pedidoController.updatePedido);

router.delete('/:id', pedidoController.deletePedido);

module.exports = router;