export async function getCourseById(courseId: string) {
  try {
    const response = await fetch(`/api/courses/${courseId}`, {
      method: 'GET', // Ensure you're using the correct method
    });
    if (!response.ok) {
      throw new Error('Failed to fetch course data');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
