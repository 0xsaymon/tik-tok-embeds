import * as z from 'zod';

export const backgroundGeneratorValidationSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
});
