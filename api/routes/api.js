const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const router = express.Router()

const User = require('../models/users')
const Customer = require('../models/customers')
const Product = require('../models/products')
const Order = require('../models/orders')

const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY
const AUTH_SALT_ROUNDS = parseInt(process.env.AUTH_SALT_ROUNDS, 10)

router.post('/auth/register', (req, res, next) => {
  bcrypt.hash(req.body.password, AUTH_SALT_ROUNDS, function(err, hash) {
    if (err) res.status(500).json({ err })
    const newUser = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: hash
    }
    User.findOne({ email: newUser.email })
      .then((user) => {
        if (!user) {
          User.create(newUser)
            .then((user) => {
              jwt.sign(
                { user },
                AUTH_SECRET_KEY,
                { expiresIn: '1h' },
                (err, token) => {
                  if (err) {
                    res.sendStatus(424)
                  } else {
                    res.json({ user, token })
                  }
                }
              )
            })
            .catch((error) => {
              res.status(500).json({ error })
            })
        } else {
          res.status(401).send({ error: 'email exists' })
        }
      })
      .catch((error) => {
        res.json({ error })
      })
  })
})

router.post('/auth/login', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(function(user) {
      if (!user) res.status(401).send({ error: 'Not authorized' })
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if (err) res.status(401).send({ error: err })
        if (!result) res.status(401).send({ error: 'Not Authorized' })
        jwt.sign(
          { user },
          AUTH_SECRET_KEY,
          { expiresIn: '1h' },
          (err, token) => {
            if (err) {
              res.sendStatus(424)
            } else {
              res.json({ user, token })
            }
          }
        )
      })
    })
    .catch((error) => {
      res.json({ error })
    })
})

router.get('/customers', verifyToken, (req, res, next) => {
  jwt.verify(req.token, AUTH_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Customer.find({})
        .sort('name')
        .then((customers) => {
          res.json(customers)
        })
        .catch((error) => {
          res.json({ error })
        })
    }
  })
})

router.get('/customers/:id', verifyToken, (req, res, next) => {
  jwt.verify(req.token, AUTH_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Customer.findById(req.params.id)
        .then((customer) => {
          res.json(customer)
        })
        .catch((error) => {
          res.json({ error })
        })
    }
  })
})

router.post('/customers', verifyToken, (req, res, next) => {
  jwt.verify(req.token, AUTH_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Customer.create(req.body)
        .then((customer) => {
          res.json(customer)
        })
        .catch((error) => {
          res.json({ error })
        })
    }
  })
})

router.put('/customers/:id', verifyToken, (req, res, next) => {
  jwt.verify(req.token, AUTH_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Customer.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(() => {
          Customer.findById(req.params.id)
            .then((customer) => {
              res.json(customer)
            })
            .catch((error) => {
              res.json({ error })
            })
        })
        .catch((error) => {
          res.json({ error })
        })
    }
  })
})

router.delete('/customers/:id', verifyToken, (req, res, next) => {
  jwt.verify(req.token, AUTH_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Customer.findByIdAndDelete(req.params.id)
        .then((customer) => {
          res.json(customer)
        })
        .catch((error) => {
          res.json({ error })
        })
    }
  })
})

router.get('/products', verifyToken, (req, res, next) => {
  jwt.verify(req.token, AUTH_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Product.find({})
        .sort('name')
        .then((products) => {
          res.json(products)
        })
        .catch((error) => {
          res.json({ error })
        })
    }
  })
})

router.get('/products/:id', verifyToken, (req, res, next) => {
  jwt.verify(req.token, AUTH_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Product.findById(req.params.id)
        .then((product) => {
          res.json(product)
        })
        .catch((error) => {
          res.json({ error })
        })
    }
  })
})

router.post('/products', verifyToken, (req, res, next) => {
  jwt.verify(req.token, AUTH_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Product.create(req.body)
        .then((product) => {
          res.json(product)
        })
        .catch((error) => {
          res.json({ error })
        })
    }
  })
})

router.put('/products/:id', verifyToken, (req, res, next) => {
  jwt.verify(req.token, AUTH_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Product.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(() => {
          Product.findById(req.params.id)
            .then((product) => {
              res.json(product)
            })
            .catch((error) => {
              res.json({ error })
            })
        })
        .catch((error) => {
          res.json({ error })
        })
    }
  })
})

router.delete('/products/:id', verifyToken, (req, res, next) => {
  jwt.verify(req.token, AUTH_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Product.findByIdAndDelete(req.params.id)
        .then((product) => {
          res.json(product)
        })
        .catch((error) => {
          res.json({ error })
        })
    }
  })
})

router.get('/orders', verifyToken, (req, res, next) => {
  jwt.verify(req.token, AUTH_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Order.find({})
        .sort('name')
        .then((orders) => {
          res.json(orders)
        })
        .catch((error) => {
          res.json({ error })
        })
    }
  })
})

router.get('/orders/:id', verifyToken, (req, res, next) => {
  jwt.verify(req.token, AUTH_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Order.findById(req.params.id)
        .then((order) => {
          res.json(order)
        })
        .catch((error) => {
          res.json({ error })
        })
    }
  })
})

router.post('/orders', verifyToken, (req, res, next) => {
  jwt.verify(req.token, AUTH_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Order.create(req.body)
        .then((order) => {
          res.json(order)
        })
        .catch((error) => {
          res.json({ error })
        })
    }
  })
})

router.put('/orders/:id', verifyToken, (req, res, next) => {
  jwt.verify(req.token, AUTH_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Order.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(() => {
          Order.findById(req.params.id)
            .then((order) => {
              res.json(order)
            })
            .catch((error) => {
              res.json({ error })
            })
        })
        .catch((error) => {
          res.json({ error })
        })
    }
  })
})

router.delete('/orders/:id', verifyToken, (req, res, next) => {
  jwt.verify(req.token, AUTH_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Order.findByIdAndDelete(req.params.id)
        .then((order) => {
          res.json(order)
        })
        .catch((error) => {
          res.json({ error })
        })
    }
  })
})

function verifyToken(req, res, next) {
  const bearerHeader = req.headers.authorization
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1]
    req.token = bearerToken
    next()
  } else {
    res.sendStatus('403')
  }
}

module.exports = router
