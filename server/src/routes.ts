import express from 'express'

import PointsController from './controlles/PointsController'
import ItemsController from './controlles/ItemsController'

//index, show(listar 1), create, update, delete(ou destroy)
const routes = express.Router() //serve para mudar as rotas para outro arquivo
const pointsController = new PointsController()
const itemsController = new ItemsController()

routes.get('/items', itemsController.index)
routes.post('/points', pointsController.create)


export default routes