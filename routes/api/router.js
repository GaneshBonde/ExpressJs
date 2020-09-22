const express = require('express')
const uuid = require('uuid')
const router = express.Router();
const members = require('./members')



// Get All Members
router.get('/', (req,res) =>  res.json(members) )

// Get Single Member
router.get('/:id',(req,res) => {
    //res.send(req.params.id)
    
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    }else{
        res.status(400).json({msg: "Member not found"})
    }
})

// create post 
router.post('/',(req,res) => {
  //  res.send(req.body)
    console.log("hello there");
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email:req.body.email,
    status: 'active'
  }

  if(!newMember.name || !newMember.email){
      return res.status(400).json({msg: "include name and email"})
  }

  members.push(newMember)
  //res.json(members)
  res.redirect('/')
})

// update put request
router.put('/:id',(req,res) => {
    //res.send(req.params.id)
    
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        const updateMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = req.body.email;

                res.json({msg:'Member updated', member})
            }
        })
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    }else{
        res.status(400).json({msg: "Member not found"})
    }
})

// delere member
router.delete('/:id',(req,res) => {
    //res.send(req.params.id)
    
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        res.json({msg : "Member deleted", 
                members:members.filter(member => member.id !== parseInt(req.params.id))})
    }else{
        res.status(400).json({msg: "Member not found"})
    }
})


module.exports = router