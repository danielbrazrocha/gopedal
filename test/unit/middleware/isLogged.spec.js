/* eslint-disable no-undef */
// const { next, request, response } = require('express')
const isLogged = require('../../../src/middlewares/isLogged.js')

describe('Logged middleware', () => {
  let mockResponse = {}
  const nextFunction = jest.fn()

  beforeEach(() => {
    mockRequest = {}
    mockResponse = {}
  })

  test('should Next with user information', async () => {
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
    isLogged(mockRequest, mockResponse, nextFunction)
    // Assert
    expect(nextFunction).toBeCalledTimes(1)
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
    isLogged(mockRequest, mockResponse, nextFunction)
    // Assert
    expect(mockResponse.redirect).toBeCalledTimes(1)
  })
})
