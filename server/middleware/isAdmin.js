const isAdmin = ( req, res, next )=>{
    if(req.role == 'admin'){
        return next()
    }
    else{
        return res.status(401).json({ error: 'Unauthorized access'  })
    }
    
}

module.exports = isAdmin;