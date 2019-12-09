module.exports = app => {
    const {existsOrError, notExistsOrError} = app.api.validator

    const save = (req, res) => {
        const category = {...req.body}
        if(req.params.id) category.id = req.params.id

        try{
            existsOrError(category.name, 'Nome não informado')
        }catch(msg){
            return res.status(400).send(msg)
        }

        if(category.id){
            app.api.db('categories')
                .update(category)
                .where({id: category.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }else{
            app.api.db('categories')
                .insert(category)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try{
            existsOrError(req.params.id, 'Código da Categoria não informado.')

            const subcategory = await app.db('categories')
                .where({parentId: req.params.id})
            notExistsOrError(subcategory, 'Categoria possui subcategorias.')

            const articles = await app.db('articles')
                .where({categoryId: req.params.id})
            notExistsOrError(articles, 'Categoria possui artigos.')

            const rowsDeleted = await app.db('categories')
                .where({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Categoria não foi encontrada')

            res.status(204).send()
        }catch(msg){
            res.status(500).send(msg)
        }
    }
}