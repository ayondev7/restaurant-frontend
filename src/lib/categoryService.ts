export interface Category {
  _id: string;
  name: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getAllCategories(): Promise<Category[]> {
  const response = await fetch(`${BACKEND_URL}/api/categories/get-all-categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
}

export async function createCategory(name: string): Promise<Category> {
  const response = await fetch(`${BACKEND_URL}/api/categories/create-category`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create category');
  }
  return response.json();
}
