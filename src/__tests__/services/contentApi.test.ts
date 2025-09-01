// src/__tests__/services/contentApi.test.ts
/**
 * Mocks the Supabase client chain used by contentApi.listServices
 */
jest.mock('@/services/supabase', () => {
  const order = jest.fn().mockResolvedValue({ data: [{ id:'1', name:'A', is_active:true }], error: null });
  const eq = jest.fn(() => ({ order }));
  const select = jest.fn(() => ({ eq, order }));
  return { supabase: { from: jest.fn(() => ({ select, eq, order })) } };
});

import { contentApi } from '@/services/api';

describe('contentApi.listServices', () => {
  it('returns active services', async () => {
    const data = await contentApi.listServices();
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toHaveProperty('name');
  });
});
