import {Request, Response} from 'express'
import knex from '../database/connection'

export default class PointsController {
    async index(req: Request, res: Response) {
        //query params = filtros
        const { city, uf} = req.query

        //const parsedItems = String(items).split(',').map(item => item.trim())
        //serve para transformar os items em array

        const points = await knex('points')
          .join('point_items', 'point.id', '=', 'point_item.point_id')
          .where('city', String(city))
          .where('uf', String(uf))
          .distinct()
          .select('points.*')

        console.log(city, uf)
        return res.json(points)
    }
  
    async show(req: Request, res:Response) {
        const { id } = req.params

        const point = await knex('points').where('id', id).first()

        if (!point) {
            return res.status(400).json({ message: 'Point not found.' })
        }

        // const items = await knex('items')
        //   .join('point_items', 'item.id', '=', 'point_items.item_id')
        //   .where('point_items.point_id', id)
        //   .select('items.title')


        return res.json(point)
        // return res.json({ point, items})
    }
    
    async create(req: Request, res: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = req.body
        
        const trx = await knex.transaction()
    
        const point = {
            image:'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        }
        //insert cria um id de cada conjunto de itens que ele coloca na tabela
        const insertedIds = await trx('points').insert(point)
    
        const point_id = insertedIds[0]
    
        const pointItems = items.map((item_id: Number) => {
            return { 
              item_id,
              point_id
            }
        })
    
        await trx('point_items').insert(pointItems)
    
        return res.json({
            id:point_id,
            ...point, 
        })
    }
}
