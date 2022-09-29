/* eslint-disable no-undef */
// const { next, request, response } = require('express')
const isAuth = require('../../../src/middlewares/isAuth.js')

describe('Authorization middleware', () => {
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

  test('should Next if user has a session', async () => {
    // Arrange
    const mockRequest = {
      session: {
        user: {
          id: 'fake_id',
          name: 'fake_name',
          kind: 'fake_kind',
          shopping_session: 1
        }
      }
    }
    // Act
    isAuth(mockRequest, mockResponse, nextFunction)
    // Assert
    expect(nextFunction).toBeCalledTimes(1)
    expect(mockResponse.locals.user).toBeDefined()
    expect(mockResponse.locals.user).toBeTruthy()
  })

  test('should redirect if user info dont exists', async () => {
    // Arrange
    const mockRequest = {
      session: { }
    }
    mockResponse = {
      redirect: jest.fn()
    }
    // Act
    isAuth(mockRequest, mockResponse, nextFunction)
    // Assert
    expect(mockResponse.redirect).toBeCalledTimes(1)
  })
})
