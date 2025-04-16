type LogLevel = "log" | "warn" | "error" | "info";

interface LogOptions {
  context?: string;
  trace?: boolean;
}

const formatMessage = (message: string, context?: string): string => {
  return context ? `[${context}] ${message}` : message;
};

export const Logger = {
  log: (message: string, options: LogOptions = {}) => {
    console.log(formatMessage(message, options.context));
    if (options.trace) console.trace();
  },

  info: (message: string, options: LogOptions = {}) => {
    console.info(formatMessage(message, options.context));
    if (options.trace) console.trace();
  },

  warn: (message: string, options: LogOptions = {}) => {
    console.warn(formatMessage(message, options.context));
    if (options.trace) console.trace();
  },

  error: (message: string, error?: unknown, options: LogOptions = {}) => {
    console.error(formatMessage(message, options.context));
    if (error) console.error(error);
    if (options.trace) console.trace();
  },
};
