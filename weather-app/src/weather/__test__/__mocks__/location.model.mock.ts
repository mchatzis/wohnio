const mockSave = jest.fn();
const mockLocationModel = jest.fn().mockImplementation(() => ({
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    save: mockSave,
    exec: jest.fn(),
}));

export {
    mockSave
};
export default mockLocationModel;