import request from 'supertest'
import { testServer } from '../../test-server'
import { prisma } from '../../../src/data/postgres'
describe('Todo route testing', () => {
  beforeAll(async () => {
    await testServer.start()
  })
  afterAll(() => {
    testServer.close()
  })

  beforeEach(async () => {
    await prisma.todo.deleteMany()
  })

  const todo1 = { text: 'Hola Mundo 1' }
  const todo2 = { text: 'Hola Mundo 2' }
  it('should return TODOs api/todos', async () => {
    await prisma.todo.createMany({
      data: [todo1, todo2]
    })
    const { body } = await request(testServer.app)
      .get('/api/todos')
      .expect(200)

    expect(body).toBeInstanceOf(Array)
    expect(body.length).toBe(2)
    expect(body[0].text).toBe(todo1.text)
    expect(body[1].text).toBe(todo2.text)
  })

  it('should return a TODO api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: todo1 })

    const { body } = await request(testServer.app)
      .get(`/api/todos/${todo.id}`)
      .expect(200)

    expect(body).toEqual({
      id: todo.id,
      text: todo.text,
      completedAt: todo.completedAt
    })
  })

  it('should return a 404 NotFound api/todos/:id', async () => {
    const todoId = 9999
    const { body } = await request(testServer.app)
      .get(`/api/todos/${todoId}`)
      .expect(400)

    expect(body).toEqual({ error: `Todo with id ${todoId} not found` })
  })

  it('should return a new Todo api/todos', async () => {
    const { body } = await request(testServer.app)
      .post('/api/todos')
      .send(todo1)
      .expect(201)

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: null
    })
  })

  it('should return an error if text is not valid api/todos', async () => {
    const { body } = await request(testServer.app)
      .post('/api/todos')
      .send({})
      .expect(400)

    expect(body).toEqual({ error: 'Text property is required' })
  })

  it('should return an updated TODO api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: todo1 })

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({ text: 'Hola mundo updated', completedAt: '2024-10-11' })
      .expect(200)

    expect(body).toEqual({
      id: expect.any(Number),
      text: 'Hola mundo updated',
      completedAt: '2024-10-11T00:00:00.000Z'
    })
  })

  it('should return 404 if TODO not found', async () => {
    const todoId = 5
    const { body } = await request(testServer.app)
      .put(`/api/todos/${todoId}`)
      .send({ text: 'Hola mundo UPDATE' })
      .expect(404)

    expect(body).toEqual({ error: `Todo with id ${todoId} not found` })
  })

  it('should return an updated TODO only the date', async () => {
    const todo = await prisma.todo.create({ data: todo1 })
    const updateDate = '2024-10-12T00:00:00.000Z'

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({ completedAt: updateDate })
      .expect(200)

    expect(body).toEqual({
      ...todo,
      completedAt: updateDate
    })
  })
})
