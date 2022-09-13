/* eslint-disable no-undef */
// const { next, request, response } = require('express')
const isAdmin = require('../../../src/middlewares/isAdmin.js')

describe('Admin check middleware', () => {
  let mockRequest = {}
  let mockResponse = {}
  const nextFunction = jest.fn()

  beforeEach(() => {
    mockRequest = {}
    mockResponse = {
      redirect: jest.fn()
    }
  })

  test('should Next without admin privileges', async () => {
    // Arrange
    mockRequest = {
      session: { }
    }
    // Act
    isAdmin(mockRequest, mockResponse, nextFunction)
    // Assert
    expect(mockResponse.redirect).toBeCalledTimes(1)
    // expect(nextFunction).toBeCalledTimes(1)
  })

  test('should redirect if admin priv exists', async () => {
    // Arrange
    const mockRequest = {
      session: {
        user: {
          id: 'fake_id',
          name: 'fake_name',
          kind: 'admin'
        }
      }
    }
    // Act
    isAdmin(mockRequest, mockResponse, nextFunction)
    // Assert
    expect(nextFunction).toBeCalledTimes(1)
  })
})
