/**
 * @jest-environment node
 */

// Mock the db/index.js to prevent actual MongoDB connections
jest.mock('../../db/index.js', () => ({
  on: jest.fn(),
  once: jest.fn(),
}));

// Mock the Park model
jest.mock('../../db/models/park.js', () => ({
  Park: {
    create: jest.fn(),
    find: jest.fn(),
  },
}));

// Mock express-validator
jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}));

const { validationResult } = require('express-validator');
const { Park } = require('../../db/models/park.js');
const controller = require('../../db/controllers/dbcontrol.js');

describe('dbcontrol - save', () => {
  let req, res;

  beforeEach(() => {
    req = { body: { carSize: 'medium', make: 'Toyota', driverStatus: 'solo', timeOfday: 'morning', difficulty: 3, comments: 'easy' } };
    res = { sendStatus: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };
    jest.clearAllMocks();
  });

  test('returns 400 when validation fails', () => {
    validationResult.mockReturnValue({ isEmpty: () => false, array: () => [{ msg: 'Invalid' }] });

    controller.save(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errors: [{ msg: 'Invalid' }] });
    expect(Park.create).not.toHaveBeenCalled();
  });

  test('calls Park.create and responds 201 on success', () => {
    validationResult.mockReturnValue({ isEmpty: () => true });
    Park.create.mockImplementation((_data, cb) => cb(null, {}));

    controller.save(req, res);

    expect(Park.create).toHaveBeenCalledWith(req.body, expect.any(Function));
    expect(res.sendStatus).toHaveBeenCalledWith(201);
  });

  test('responds 500 when Park.create fails', () => {
    validationResult.mockReturnValue({ isEmpty: () => true });
    Park.create.mockImplementation((_data, cb) => cb(new Error('DB error')));

    controller.save(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});

describe('dbcontrol - getAll', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = { status: jest.fn().mockReturnThis(), json: jest.fn(), sendStatus: jest.fn() };
    jest.clearAllMocks();
  });

  test('responds with spots array on success', async () => {
    const spots = [{ make: 'Honda' }];
    Park.find.mockReturnValue(Promise.resolve(spots));

    await controller.getAll(req, res);

    expect(Park.find).toHaveBeenCalledWith({});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(spots);
  });

  test('responds 500 when find fails', async () => {
    Park.find.mockReturnValue(Promise.reject(new Error('DB error')));

    await controller.getAll(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});
