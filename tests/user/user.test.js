import { test, vi, expect, describe, beforeEach } from 'vitest'
import { UserHandler } from '../../src/api/modules/user/handler/user-handler'
import { user, users } from '../mocks/user-mocks.js'
import { Exception } from '../../src/util/exception'

// import User from '../../src/data/mongooseModels.js'

describe('User handler', () => {
  let req = {}
  let res = {}

  beforeEach(() => {
    req = {}
    res = {}
    // vi.clearAllMocks()
  })

  describe('findMany', () => {
    test('should be return all users', async () => {
      res = {
        status: vi.fn().mockReturnThis(200),
        json: vi.fn().mockReturnThis(users),
      }

      const userModelMock = {
        find: vi.fn().mockResolvedValue(users),
      }

      const userHandler = new UserHandler(userModelMock)

      await userHandler.findMany(req, res)

      expect(res.status).toHaveBeenCalled(200)
      expect(res.status).toHaveReturned(200)

      expect(res.json).toHaveBeenCalled(users)
      expect(res.json).toHaveReturned(users)
    })

    test('should be throw error if not exists users', async () => {
      res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      }

      const userModelMock = {
        find: vi.fn().mockResolvedValue([]),
      }

      const userHandler = new UserHandler(userModelMock)

      userHandler.findMany(req, res).catch((err) => {
        expect(err).toBeInstanceOf(Exception)
        expect(err.statusCode).toBe(404)
        expect(err.message).toBe('No users found')
      })
    })
  })

  describe('findById', () => {
    test('should be to return one user', async () => {
      const userModelMock = {
        findById: vi.fn().mockResolvedValue(user),
      }

      req = {
        params: {
          id: '6521f0c2aa897407d73a877b',
        },
      }
      res = {
        status: vi.fn().mockReturnThis(200),
        json: vi.fn().mockReturnThis(user),
      }

      const userHandler = new UserHandler(userModelMock)

      await userHandler.findById(req, res)

      expect(res.status).toHaveBeenCalled(200)
      expect(res.status).toHaveReturned(200)

      expect(res.json).toHaveBeenCalled(user)
      expect(res.json).toHaveReturned(user)
    })

    test('should be throw error wen id is undefined', async () => {
      const userModelMock = {
        findById: vi.fn().mockResolvedValue({}),
      }

      req = {
        params: {},
      }

      res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      }

      const userHandler = new UserHandler(userModelMock)

      userHandler.findById(req, res).catch((err) => {
        expect(err).instanceOf(Exception)
        expect(err.statusCode).toBe(400)
        expect(err.message).toBe('is missing id')
      })
    })

    test('should be throw error wen user does not exists', async () => {
      const userModelMock = {
        findById: vi.fn().mockResolvedValue(),
      }

      req = {
        params: {
          id: '6521f0c2aa897407d73a877b',
        },
      }

      res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      }

      const userHandler = new UserHandler(userModelMock)

      userHandler.findById(req, res).catch((err) => {
        expect(err).instanceOf(Exception)
        expect(err.statusCode).toBe(404)
        expect(err.message).toBe('user not found')
      })
    })
  })

  describe('create', () => {
    test.todo('should be possible to create') //, async () => {
    //   // vi.mock('../../src/data/mongooseModels.js')
    //   req = {
    //     body: {
    //       email: 'test@example.com',
    //     },
    //   }

    //   res = {
    //     status: vi.fn().mockReturnThis(201),
    //     json: vi.fn().mockReturnThis(user),
    //   }

    //   // const userHandler = new UserHandler(MockedDatabase)
    //   // const userHandler = new UserHandler(User)

    //   // await userHandler.create(req, res)

    //   // expect(res.status).toHaveBeenCalled(201)
    //   // expect(res.status).toHaveReturned(201)

    //   // expect(res.json).toHaveBeenCalled(user)
    //   // expect(res.json).toHaveReturned(user)
    //   expect(true).toBe(true)
    // })

    test('should be to throw error wen user already exists', async () => {
      const userModelMock = {
        findOne: vi.fn().mockResolvedValue({ email: 'email@email.com' }),
      }

      req = {
        body: {
          email: 'email@email.com',
        },
      }

      res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      }

      const userHandler = new UserHandler(userModelMock)

      userHandler.create(req, res).catch((err) => {
        expect(err).instanceOf(Exception)
        expect(err.statusCode).toBe(400)
        expect(err.message).toBe('user already exists')
      })
    })

    test('should be to throw error wen email is undefined', async () => {
      const userModelMock = {
        findOne: vi.fn().mockResolvedValue(),
      }

      req = {
        body: {},
      }

      res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      }

      const userHandler = new UserHandler(userModelMock)

      userHandler.create(req, res).catch((err) => {
        expect(err).instanceOf(Exception)
        expect(err.statusCode).toBe(400)
        expect(err.message).toBe('email is required')
      })
    })
  })

  describe('update', () => {
    test('should be possible to update user', async () => {
      const userModelMock = {
        findOneAndUpdate: vi.fn().mockResolvedValue(),
      }

      req = {
        params: {
          id: '6521f0c2aa897407d73a877b',
        },
      }
      res = {
        status: vi.fn().mockReturnThis(200),
        end: vi.fn().mockReturnThis(),
      }

      const userHandler = new UserHandler(userModelMock)

      await userHandler.update(req, res)

      expect(res.status).toHaveBeenCalled(204)
      expect(res.status).toHaveReturned(204)

      expect(res.end).toHaveBeenCalled()
      expect(res.end).toHaveReturned()
      expect(true).toBe(true)
    })

    test('should be throw error wen id is undefined', async () => {
      const userModelMock = {
        findOneAndUpdate: vi.fn().mockResolvedValue(),
      }

      req = {
        params: {},
      }
      res = {
        status: vi.fn().mockReturnThis(200),
        end: vi.fn().mockReturnThis(),
      }

      const userHandler = new UserHandler(userModelMock)

      await userHandler.update(req, res).catch((err) => {
        expect(err).instanceOf(Exception)
        expect(err.statusCode).toBe(400)
        expect(err.message).toBe('id is required')
      })
    })
  })

  describe('delete', () => {
    test('should be possible to delete us', async () => {
      const userModelMock = {
        deleteOne: vi.fn().mockResolvedValue(),
      }

      req = {
        params: {
          id: '6521f0c2aa897407d73a877b',
        },
      }
      res = {
        status: vi.fn().mockReturnThis(200),
        end: vi.fn().mockReturnThis(),
      }

      const userHandler = new UserHandler(userModelMock)

      await userHandler.delete(req, res)

      expect(res.status).toHaveBeenCalled(204)
      expect(res.status).toHaveReturned(204)

      expect(res.end).toHaveBeenCalled()
      expect(res.end).toHaveReturned()
      expect(true).toBe(true)
      expect(true).toBe(true)
    })

    test('should be throw error wen id is undefined', async () => {
      const userModelMock = {
        deleteOne: vi.fn().mockResolvedValue(),
      }

      req = {
        params: {},
      }
      res = {
        status: vi.fn().mockReturnThis(200),
        end: vi.fn().mockReturnThis(),
      }

      const userHandler = new UserHandler(userModelMock)

      await userHandler.delete(req, res).catch((err) => {
        expect(err).instanceOf(Exception)
        expect(err.statusCode).toBe(400)
        expect(err.message).toBe('id is required')
      })
    })
  })
})
