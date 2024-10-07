// Fixing errorHandler function
export const errorHandler = (statusCode: number, message: string) => {
    const error = new Error(message);
    // Set a custom statusCode property on the error object
    (error as any).statusCode = statusCode;
    return error;
  };
  