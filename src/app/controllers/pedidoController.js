const Pedido = require('../../domain/model/pedidoModel');
const { validationResult } = require('express-validator');

exports.createPedido = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const pedido = new Pedido(req.body);
        await pedido.save();
        res.status(201).json(pedido);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el pedido' });
    }
};

exports.getAllPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find();
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
};

exports.getPedidoById = async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id);
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el pedido' });
    }
};

exports.getPedidosByEstado = async (req, res) => {
    try {
        const pedidos = await Pedido.find({ estado: req.params.estado });
        res.json(pedidos);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los pedidos por estado' });
    }
};

exports.updatePedido = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, {  returnDocument: 'after', runValidators: true });
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el pedido' });
    }
};

exports.deletePedido = async (req, res) => {
    try {
        const pedido = await Pedido.findByIdAndDelete(req.params.id);
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        res.json({ message: 'Pedido eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el pedido' });
    }
};