import { vi } from "vitest";

const mockSave = vi.fn();
const mockLocationModel = vi.fn().mockImplementation(() => ({
    find: vi.fn(),
    findById: vi.fn(),
    findByIdAndUpdate: vi.fn(),
    findByIdAndDelete: vi.fn(),
    save: mockSave,
    exec: vi.fn(),
}));

export {
    mockSave
};
export default mockLocationModel;