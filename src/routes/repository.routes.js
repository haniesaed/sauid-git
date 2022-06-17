const 
{ 
    updaterepo, 
    deleterepo,
    uploadFiles,
    searchCondition,
    getrepo,
    insertrepo
} = require('../controllers/repository.controller');
    const express = require('express');
 
    const router = express.Router()

    router.get('/', searchCondition);

    router.get('/:id',getrepo);

    router.post('/',insertrepo );

   router.put('/:id',updaterepo);

    router.delete('/:id',deleterepo);

    router.post('/uploadFiles/:id',uploadFiles );

module.exports= router;