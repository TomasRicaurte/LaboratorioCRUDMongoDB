const express = require("express");
const app = express()
const port = 27017;

app.use(express.json())

const validacionMethodsHTTP = (req, res, next) => {
    const validarMethods = ['GET', 'POST', 'PUT', 'DELETE']
  
    if (!validarMethods.includes(req.method)) {
      return res.status(405).json({error: "Metodo HTTP no valido"})
    }
    next()
};

app.use(validacionMethodsHTTP);

let tareas = [
    {
        Indicador: 'prueba 1',
      Descripcion: 'Prueba para tarea completada',
      completed: true
    },
    {
        Indicador: 'prueba 2',
      Descripcion: 'Prueba para tarea no completada',
      completed: false
    },
    {
        Indicador: 'prueba 3',
      Descripcion: 'Prueba para tarea eliminada',
      completed: true
    },
    {
        Indicador: 'prueba 4',
      Descripcion: 'Prueba para tarea marcada como completada',
      completed: false
    },
    {
        Indicador: 'prueba 5',
      Descripcion: 'Prueba para eliminar la tarea',
      completed: true
    },
];

app.get('/tareas', (req, res) => {
    res.json(tareas)
})

app.get('/tarea/:id', (req, res) => {
    const tarea = tareas.find(t => t.id === parseInt(req.params.id));
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(tarea);
})

app.get('/tareas/completas', (req, res) => {
    const tareasCompletas = tareas.filter(t => t.completed);
    res.json(tareasCompletas);
});
  
app.get('/tareas/incompletas', (req, res) => {
    const tareasIncompletas = tareas.filter(t => !t.completed);
    res.json(tareasIncompletas); 
});

app.post('/create', (req, res) => {
const { Indicador, Descripcion } = req.body;

if (!Indicador || !Descripcion) {
    return res.status(404).json({error: 'El Indicador y la Descripcion son obligatorios'})
} else if ( Indicador === "" || Descripcion === "" ) {
    return res.status(401).json({error: 'Los campos no pueden estar vacios o en blanco'})
};

const existingTask = tareas.find(task => task.titulo === titulo);

if (existingTask) {
    return res.status(400).json({ error: 'No se puede repetir el mismo título para distintas tareas.' });
};

const newTarea = {
    Indicador,
    Descripcion,
    completed: false
};

tareas.push(newTarea);

res.status(201).json({mensaje: 'Tarea creada con éxito', tarea: newTarea})
})

app.put('/update/:id', (req, res) => {
    const tarea = tareas.find(t => t.id === parseInt(req.params.id));

    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
  
    if (req.body.titulo) {
      tarea.Indicador = req.body.titulo;
    }
  
    if (req.body.descripcion) {
      tarea.Descripcion = req.body.descripcion;
    }
  
    if (req.body.completed !== undefined) {
      tarea.completed = req.body.completed;
    }
  
    res.status(200).json({ mensaje: 'Tarea actualizada correctamente', tarea });
})

app.delete('/delete/:id', (req, res) => {
    const tareasIndex = tareas.find(t => t.Indicador);

    if (tareasIndex !== Indicador){
        return res.status(404).json({ error: 'Tarea no encontrada' });
    };

    tareas.splice(tareasIndex, 1);
    res.json({ mensaje: 'Tarea eliminada con éxito' });
})

app.listen(port,() => {
    console.log(`Servidor escuchando en el puerto ${port}`);
})