/* eslint-disable no-undef */
// const { next, request, response } = require('express')
const isAuth = require('../../../src/middlewares/isAuth.js')

describe('Authorization middleware', () => {
  let mockRequest = {}
  let mockResponse = {}
  const nextFunction = jest.fn()

  beforeEach(() => {
    mockRequest = {}
    mockResponse = {
      locals: {
        user: jest.fn()
      }
    }
  })

  test('should Next without session', async () => {
    // Arrange
    mockRequest = {
      session: { }
    }
    // Act
    isAuth(mockRequest, mockResponse, nextFunction)
    // Assert
    expect(nextFunction).toBeCalledTimes(1)
  })

  test.only('should save user info if exists', async () => {
    // Arrange
    const mockRequest = {
      session: {
        user: {
          id: 'fake_id',
          name: 'fake_name',
          kind: 'fake_kind'
        }
      }
    }
    // Act
    isAuth(mockRequest, mockResponse, nextFunction)
    // Assert
    expect(mockResponse.locals.user).toBeDefined()
    expect(mockResponse.locals.user).toBeTruthy()
  })
})
