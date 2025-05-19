import { NextResponse } from 'next/server';
import { getAllCategories } from '@/lib/categoryService';

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
  }
}
